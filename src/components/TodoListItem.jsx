import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../redux/slices/taskSlice";
import { p } from "./theme";

const PRIORITY_CONFIG = {
  high:   { color: "#E8652A", label: "Haute",   bg: "#FFF0EB" },
  medium: { color: "#F5A623", label: "Moyenne", bg: "#FFFBF0" },
  low:    { color: "#4CAF82", label: "Basse",   bg: "#F0FBF5" },
};

const TodoListItem = ({ todo }) => {
  const dispatch    = useDispatch();
  const [hovered, setHovered]   = useState(false);
  const [editing, setEditing]   = useState(false);
  const [editVal, setEditVal]   = useState(todo.description);
  const [deleting, setDeleting] = useState(false);

  const priority = PRIORITY_CONFIG[todo.priority] || PRIORITY_CONFIG.medium;

  const handleToggle = () => {
    dispatch(updateTask({ ...todo, completed: !todo.completed }));
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => dispatch(deleteTask(todo._id)), 300);
  };

  const handleEdit = () => {
    if (editing) {
      if (editVal.trim() && editVal.trim() !== todo.description) {
        dispatch(updateTask({ ...todo, description: editVal.trim() }));
      }
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter")  handleEdit();
    if (e.key === "Escape") { setEditing(false); setEditVal(todo.description); }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: "0.875rem",
        padding: "1rem 1.125rem",
        borderRadius: p.radius,
        border: `1.5px solid ${hovered ? priority.color + "40" : p.border}`,
        background: todo.completed ? `${p.inputBg}` : p.card,
        boxShadow: hovered ? p.shadowHover : p.shadowCard,
        transition: "all 0.2s ease",
        opacity: deleting ? 0 : 1,
        transform: deleting ? "translateX(20px)" : "translateX(0)",
        borderLeft: `4px solid ${priority.color}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Indicateur priorité (bande gauche via borderLeft) */}

      {/* Checkbox */}
      <button
        onClick={handleToggle}
        style={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
          border: `2px solid ${todo.completed ? priority.color : p.border}`,
          background: todo.completed
            ? `linear-gradient(135deg, ${priority.color}, ${priority.color}AA)`
            : "transparent",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s ease",
          marginTop: "0.1rem",
          boxShadow: todo.completed ? `0 2px 8px ${priority.color}40` : "none",
        }}
        onMouseEnter={e => { if (!todo.completed) { e.currentTarget.style.borderColor = priority.color; e.currentTarget.style.background = `${priority.color}15`; }}}
        onMouseLeave={e => { if (!todo.completed) { e.currentTarget.style.borderColor = p.border; e.currentTarget.style.background = "transparent"; }}}
      >
        {todo.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Contenu */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {editing ? (
          <input
            autoFocus
            value={editVal}
            onChange={e => setEditVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            style={{
              width: "100%", border: "none", outline: "none",
              background: "transparent",
              fontSize: "0.9rem", color: p.text, fontFamily: p.font,
              borderBottom: `2px solid ${p.primary}`,
              paddingBottom: "0.2rem",
            }}
          />
        ) : (
          <p style={{
            margin: 0, fontSize: "0.9rem",
            color: todo.completed ? p.mutedLight : p.text,
            textDecoration: todo.completed ? "line-through" : "none",
            transition: "all 0.2s ease",
            wordBreak: "break-word",
            lineHeight: 1.5,
          }}>
            {todo.description}
          </p>
        )}

        {/* Badge priorité */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          marginTop: "0.4rem",
          padding: "0.15rem 0.6rem",
          borderRadius: 99,
          background: priority.bg,
          border: `1px solid ${priority.color}30`,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: priority.color }} />
          <span style={{ fontSize: "0.68rem", fontWeight: 600, color: priority.color }}>
            {priority.label}
          </span>
        </div>
      </div>

      {/* Actions (visibles au hover) */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.2s ease",
        flexShrink: 0,
      }}>
        {/* Edit */}
        <button
          onClick={handleEdit}
          title={editing ? "Valider" : "Modifier"}
          style={{
            width: 32, height: 32, borderRadius: p.radiusSm,
            border: `1px solid ${p.border}`,
            background: editing ? `${p.primary}15` : p.card,
            color: editing ? p.primary : p.muted,
            cursor: "pointer", fontSize: "0.85rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${p.primary}15`; e.currentTarget.style.borderColor = p.primary; e.currentTarget.style.color = p.primary; }}
          onMouseLeave={e => { if (!editing) { e.currentTarget.style.background = p.card; e.currentTarget.style.borderColor = p.border; e.currentTarget.style.color = p.muted; }}}
        >
          {editing ? "✓" : "✏️"}
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          title="Supprimer"
          style={{
            width: 32, height: 32, borderRadius: p.radiusSm,
            border: `1px solid ${p.border}`,
            background: p.card,
            color: p.muted,
            cursor: "pointer", fontSize: "0.85rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FEE8E8"; e.currentTarget.style.borderColor = "#F5B5B5"; e.currentTarget.style.color = "#C0392B"; }}
          onMouseLeave={e => { e.currentTarget.style.background = p.card; e.currentTarget.style.borderColor = p.border; e.currentTarget.style.color = p.muted; }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;