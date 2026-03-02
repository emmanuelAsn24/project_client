import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, setSatusToIdle } from "../redux/slices/taskSlice";
import { getState } from "../redux/slices/authSlice";
import { p } from "./theme";

const PRIORITIES = [
  { key: "low",    label: "Basse",   color: "#4CAF82", emoji: "🟢" },
  { key: "medium", label: "Moyenne", color: "#F5A623", emoji: "🟡" },
  { key: "high",   label: "Haute",   color: "#E8652A", emoji: "🔴" },
];

const TodoCreate = () => {
  const [desc, setDesc]         = useState("");
  const [priority, setPriority] = useState("medium");
  const [focused, setFocused]   = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { connectedUser: { _id } } = useSelector(getState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const titre = desc.trim();
    if (!titre) { setErrorMsg("La description ne peut pas être vide."); return; }
    if (!_id)   { setErrorMsg("Utilisateur non authentifié."); return; }

    dispatch(createTask({ description: titre, owner: _id, priority }));
    setDesc("");
    setPriority("medium");
    setTimeout(() => dispatch(setSatusToIdle()), 5000);
  };

  const selectedPriority = PRIORITIES.find(pr => pr.key === priority);

  return (
    <div style={{ marginTop: "1.25rem" }}>
      <form onSubmit={handleSubmit}>
        {/* Input row */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "0.875rem 1rem",
          borderRadius: p.radius,
          border: `2px solid ${focused ? p.primary : p.border}`,
          background: p.inputBg,
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? `0 0 0 4px ${p.primary}15` : p.shadowCard,
        }}>
          {/* Indicateur priorité */}
          <div style={{
            width: 12, height: 12, borderRadius: "50%", flexShrink: 0,
            background: selectedPriority.color,
            boxShadow: `0 0 0 3px ${selectedPriority.color}30`,
            transition: "all 0.2s ease",
          }} />

          <input
            type="text"
            data-todo-input
            placeholder="Ajouter une nouvelle tâche..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              flex: 1, border: "none", outline: "none",
              background: "transparent",
              color: p.text, fontSize: "0.9rem",
              fontFamily: p.font,
            }}
          />

          {/* Bouton submit */}
          <button type="submit" style={{
            padding: "0.4rem 1rem",
            borderRadius: "2rem",
            border: "none",
            background: desc.trim()
              ? `linear-gradient(135deg, ${p.primary}, ${p.amber})`
              : p.border,
            color: desc.trim() ? "#fff" : p.mutedLight,
            fontSize: "0.8rem", fontWeight: 700,
            cursor: desc.trim() ? "pointer" : "default",
            transition: "all 0.2s ease",
            flexShrink: 0,
            boxShadow: desc.trim() ? `0 4px 12px ${p.primary}40` : "none",
          }}>
            Ajouter
          </button>
        </div>

        {/* Sélecteur de priorité */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          marginTop: "0.75rem", paddingLeft: "0.25rem",
        }}>
          <span style={{ fontSize: "0.72rem", color: p.muted, fontWeight: 600, marginRight: "0.25rem" }}>
            Priorité :
          </span>
          {PRIORITIES.map(pr => (
            <button
              key={pr.key}
              type="button"
              onClick={() => setPriority(pr.key)}
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "2rem",
                border: `1.5px solid ${priority === pr.key ? pr.color : p.border}`,
                background: priority === pr.key ? `${pr.color}15` : "transparent",
                color: priority === pr.key ? pr.color : p.mutedLight,
                fontSize: "0.75rem", fontWeight: priority === pr.key ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { if (priority !== pr.key) { e.currentTarget.style.borderColor = pr.color; e.currentTarget.style.color = pr.color; }}}
              onMouseLeave={e => { if (priority !== pr.key) { e.currentTarget.style.borderColor = p.border; e.currentTarget.style.color = p.mutedLight; }}}
            >
              <span style={{ fontSize: "0.6rem" }}>●</span>
              {pr.label}
            </button>
          ))}
        </div>
      </form>

      {/* Erreur */}
      {errorMsg && (
        <div style={{
          marginTop: "0.75rem", padding: "0.75rem 1rem",
          borderRadius: p.radiusSm,
          background: "#FEE8E8", color: "#C0392B",
          fontSize: "0.82rem", fontWeight: 500,
          border: "1px solid #F5B5B5",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span>⚠️</span> {errorMsg}
        </div>
      )}
    </div>
  );
};

export default TodoCreate;