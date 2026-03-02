import { useSelector, useDispatch } from "react-redux";
import { changeFilter, getFilter, getCompleted, selectAllTasks } from "../redux/slices/taskSlice";
import { p } from "./theme";

const FILTERS = [
  { key: "all",       label: "Toutes",    emoji: "📋" },
  { key: "active",    label: "Actives",   emoji: "⚡" },
  { key: "completed", label: "Terminées", emoji: "✅" },
];

const TodoFilter = () => {
  const dispatch  = useDispatch();
  const filter    = useSelector(getFilter);
  const tasks     = useSelector(selectAllTasks);

  const counts = {
    all:       tasks.length,
    active:    tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t =>  t.completed).length,
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.5rem",
      padding: "0.5rem",
      background: p.inputBg,
      borderRadius: p.radius,
      border: `1px solid ${p.border}`,
    }}>
      {FILTERS.map(({ key, label, emoji }) => {
        const isActive = filter === key;
        return (
          <button
            key={key}
            onClick={() => dispatch(changeFilter(key))}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              padding: "0.5rem 0.75rem",
              borderRadius: p.radiusSm,
              border: "none",
              background: isActive
                ? `linear-gradient(135deg, ${p.primary}, ${p.secondary})`
                : "transparent",
              color: isActive ? "#fff" : p.muted,
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.82rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: isActive ? `0 4px 12px ${p.primary}40` : "none",
              fontFamily: p.font,
            }}
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = `${p.primary}10`; e.currentTarget.style.color = p.primary; }}}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.muted; }}}
          >
            <span>{emoji}</span>
            {label}
            <span style={{
              padding: "0.1rem 0.45rem",
              borderRadius: 99,
              fontSize: "0.7rem",
              fontWeight: 700,
              background: isActive ? "rgba(255,255,255,0.25)" : `${p.primary}15`,
              color: isActive ? "#fff" : p.primary,
            }}>
              {counts[key]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TodoFilter;