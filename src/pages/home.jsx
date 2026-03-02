import { useDispatch, useSelector } from "react-redux";
import { selectAllTasks, getFilter, getTask } from "../redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { getState } from "../redux/slices/authSlice";
import { Header, TodoCreate, TodoFilter, TodoList } from "../components";
import { p } from "../components/theme";

// ═══════════════════════════════════════════════════════
//  SIDEBAR
// ═══════════════════════════════════════════════════════
const NAV_ITEMS = [
  { icon: "🏠", label: "Accueil",    key: "home"     },
  { icon: "📋", label: "Mes tâches", key: "tasks"    },
  { icon: "⭐", label: "Priorités",  key: "priority" },
  { icon: "✅", label: "Terminées",  key: "done"     },
  { icon: "📊", label: "Tableau",    key: "board"    },
];

const Sidebar = ({ active, onNavigate }) => (
  <aside style={{
    width: 260, minWidth: 220, height: "100vh",
    background: p.sidebarBg,
    borderRight: `1px solid ${p.border}`,
    display: "flex", flexDirection: "column",
    padding: "2rem 1.25rem",
    boxShadow: "2px 0 16px rgba(232,101,42,0.06)",
    position: "relative", flexShrink: 0,
  }}>

    {/* Logo */}
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
      <div style={{
        width: 42, height: 42, borderRadius: "0.875rem",
        background: `linear-gradient(135deg, ${p.primary}, ${p.amber})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 4px 12px ${p.primary}50`, fontSize: "1.2rem",
      }}>✦</div>
      <div>
        <div style={{ fontWeight: 800, fontSize: "1rem", color: p.text, letterSpacing: "-0.02em" }}>
          TaskFlow
        </div>
        <div style={{ fontSize: "0.7rem", color: p.muted }}>Workspace</div>
      </div>
    </div>

    {/* Nav items */}
    <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
      {NAV_ITEMS.map(({ icon, label, key }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            style={{
              display: "flex", alignItems: "center", gap: "0.875rem",
              padding: "0.75rem 1rem", borderRadius: p.radius,
              border: "none", cursor: "pointer", textAlign: "left", width: "100%",
              background: isActive
                ? `linear-gradient(135deg, ${p.primary}18, ${p.amber}18)`
                : "transparent",
              color: isActive ? p.primary : p.muted,
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.88rem",
              outline: isActive ? `2px solid ${p.primary}25` : "none",
              transition: "all 0.2s ease",
              fontFamily: p.font,
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.background = `${p.primary}0D`;
                e.currentTarget.style.color = p.secondary;
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = p.muted;
              }
            }}
          >
            <span style={{
              width: 34, height: 34, borderRadius: p.radiusSm, flexShrink: 0,
              background: isActive
                ? `linear-gradient(135deg, ${p.primary}, ${p.secondary})`
                : `${p.primary}12`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem",
              boxShadow: isActive ? `0 4px 10px ${p.primary}40` : "none",
              transition: "all 0.2s ease",
            }}>
              {icon}
            </span>
            {label}
            {isActive && (
              <div style={{
                marginLeft: "auto", width: 6, height: 6,
                borderRadius: "50%", background: p.primary,
              }} />
            )}
          </button>
        );
      })}
    </nav>

    {/* User card */}
    <div style={{
      borderRadius: p.radius,
      background: `linear-gradient(135deg, ${p.primary}12, ${p.amber}08)`,
      border: `1px solid ${p.primary}20`,
      padding: "0.875rem",
      display: "flex", alignItems: "center", gap: "0.75rem",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
        background: `linear-gradient(135deg, ${p.primary}, ${p.amber})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, color: "#fff", fontSize: "0.9rem",
        boxShadow: `0 4px 10px ${p.primary}40`,
      }}>U</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: "0.82rem", color: p.text }}>Mon Espace</div>
        <div style={{ fontSize: "0.68rem", color: p.muted }}>Plan Free</div>
      </div>
    </div>
  </aside>
);

// ═══════════════════════════════════════════════════════
//  STATS BAR — Stat déclaré ici au niveau MODULE ✅
// ═══════════════════════════════════════════════════════
const Stat = ({ label, value, color }) => (
  <div
    style={{
      background: p.card, borderRadius: p.radius, padding: "0.875rem 1rem",
      boxShadow: p.shadow, flex: 1, minWidth: 0, border: `1px solid ${p.border}`,
      transition: "box-shadow 0.2s ease, transform 0.2s ease",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = p.shadowHover;
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = p.shadow;
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <div style={{
      fontSize: "0.68rem", color: p.muted,
      textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600,
    }}>
      {label}
    </div>
    <div style={{ fontSize: "1.6rem", fontWeight: 800, color, marginTop: "0.15rem", lineHeight: 1 }}>
      {value}
    </div>
  </div>
);

const StatsBar = ({ tasks }) => {
  const total = tasks.length;
  const done  = tasks.filter(t => t.completed).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ display: "flex", gap: "0.875rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
      <Stat label="Total"     value={total}        color={p.text}    />
      <Stat label="Actives"   value={total - done} color={p.primary} />
      <Stat label="Terminées" value={done}         color={p.green}   />

      {/* Progression */}
      <div style={{
        background: p.card, borderRadius: p.radius, padding: "0.875rem 1rem",
        boxShadow: p.shadow, flex: 1, minWidth: 120, border: `1px solid ${p.border}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{
            fontSize: "0.68rem", color: p.muted,
            textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600,
          }}>
            Progression
          </span>
          <span style={{ fontSize: "0.78rem", fontWeight: 800, color: p.primary }}>
            {pct}%
          </span>
        </div>
        <div style={{ height: 7, borderRadius: 99, background: p.border, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: `linear-gradient(90deg, ${p.primary}, ${p.amber})`,
            borderRadius: 99, transition: "width 0.7s ease",
          }} />
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
//  RIGHT PANEL
// ═══════════════════════════════════════════════════════
const RightPanel = ({ tasks }) => {
  const priorities = [
    { label: "Haute",   color: p.primary, count: tasks.filter(t => t.priority === "high").length   },
    { label: "Moyenne", color: p.amber,   count: tasks.filter(t => t.priority === "medium").length },
    { label: "Basse",   color: p.green,   count: tasks.filter(t => t.priority === "low").length    },
  ];

  return (
    <aside style={{
      width: 220, minWidth: 180, height: "100vh",
      padding: "2rem 1.25rem 2rem 0",
      display: "flex", flexDirection: "column", gap: "1rem",
      flexShrink: 0, overflowY: "auto",
    }}>

      {/* Priorités */}
      <div style={{
        background: p.card, borderRadius: p.radiusLg,
        padding: "1.125rem", boxShadow: p.shadow, border: `1px solid ${p.border}`,
      }}>
        <div style={{ fontWeight: 700, fontSize: "0.82rem", color: p.text, marginBottom: "0.875rem" }}>
          🎯 Par priorité
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {priorities.map(({ label, color, count }) => (
            <div key={label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                  <span style={{ fontSize: "0.77rem", color: p.muted }}>{label}</span>
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color }}>{count}</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: p.border, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: tasks.length > 0 ? `${(count / tasks.length) * 100}%` : "0%",
                  background: color, borderRadius: 99,
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conseil */}
      <div style={{
        background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
        borderRadius: p.radiusLg, padding: "1.125rem",
        color: "#fff", boxShadow: `0 8px 24px ${p.primary}35`,
      }}>
        <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.5rem" }}>💡 Conseil</div>
        <div style={{ fontSize: "0.74rem", opacity: 0.92, lineHeight: 1.6 }}>
          Traitez d'abord vos 3 tâches prioritaires pour une journée productive.
        </div>
      </div>

      {/* Astuce FAB */}
      <div style={{
        background: `${p.amber}12`, borderRadius: p.radiusLg, padding: "1rem",
        border: `1px solid ${p.amber}25`,
      }}>
        <div style={{ fontWeight: 700, fontSize: "0.8rem", color: p.text, marginBottom: "0.35rem" }}>
          ⏰ Astuce
        </div>
        <div style={{ fontSize: "0.73rem", color: p.muted, lineHeight: 1.6 }}>
          Cliquez sur <strong style={{ color: p.primary }}>+</strong> en bas à droite pour ajouter une tâche rapidement.
        </div>
      </div>
    </aside>
  );
};

// ═══════════════════════════════════════════════════════
//  FAB
// ═══════════════════════════════════════════════════════
const FAB = () => (
  <button
    title="Ajouter une tâche"
    onClick={() => document.querySelector("[data-todo-input]")?.focus()}
    style={{
      position: "fixed", bottom: "2rem", right: "2rem",
      width: 54, height: 54, borderRadius: "50%", zIndex: 100,
      background: `linear-gradient(135deg, ${p.primary}, ${p.amber})`,
      border: "none", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "1.6rem", color: "#fff",
      boxShadow: `0 8px 28px ${p.primary}55`,
      transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "scale(1.15) rotate(12deg)";
      e.currentTarget.style.boxShadow = `0 12px 36px ${p.primary}70`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "scale(1) rotate(0deg)";
      e.currentTarget.style.boxShadow = `0 8px 28px ${p.primary}55`;
    }}
  >
    +
  </button>
);

// ═══════════════════════════════════════════════════════
//  HOME — export principal
// ═══════════════════════════════════════════════════════
const Home = () => {
  const dispatch  = useDispatch();
  const [activeNav, setActiveNav] = useState("tasks");

  const tasks     = useSelector(selectAllTasks);
  const filter    = useSelector(getFilter);
  const { connectedUser: { _id } } = useSelector(getState);
  const itemsLeft = tasks.filter(t => !t.completed).length;

  useEffect(() => {
    dispatch(getTask(_id));
  }, []);

  const filteredTasks = () => {
    switch (filter) {
      case "active":    return tasks.filter(t => !t.completed);
      case "completed": return tasks.filter(t =>  t.completed);
      default:          return tasks;
    }
  };

  return (
    <div style={{
      height: "100vh", width: "100%", overflow: "hidden",
      background: p.bg,
      display: "flex", flexDirection: "row",
      fontFamily: p.font,
    }}>
      <Sidebar active={activeNav} onNavigate={setActiveNav} />

      {/* Zone centrale scrollable */}
      <main style={{
        flex: 1, minWidth: 0,
        padding: "2rem 1.75rem 4rem",
        overflowY: "auto", height: "100vh",
      }}>
        {/* Greeting */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{
            fontSize: "1.5rem", fontWeight: 800,
            color: p.text, letterSpacing: "-0.03em", margin: 0,
          }}>
            Bonjour 👋
          </h1>
          <p style={{ color: p.muted, fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long", day: "numeric", month: "long",
            })}
          </p>
        </div>

        {/* Stats */}
        <StatsBar tasks={tasks} />

        {/* Card : Header + TodoCreate */}
        <div style={{
          background: p.card, borderRadius: p.radiusLg,
          padding: "1.25rem 1.5rem", boxShadow: p.shadow,
          marginBottom: "1rem", border: `1px solid ${p.border}`,
        }}>
          <Header />
          <TodoCreate />
        </div>

        {/* Filtres */}
        {itemsLeft > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <TodoFilter />
          </div>
        )}

        {/* Liste de tâches */}
        <div style={{
          background: p.card, borderRadius: p.radiusLg,
          padding: "1.25rem 1.5rem", boxShadow: p.shadow,
          border: `1px solid ${p.border}`,
        }}>
          <TodoList tasks={filteredTasks()} />
        </div>
      </main>

      <RightPanel tasks={tasks} />
      <FAB />
    </div>
  );
};

export default Home;