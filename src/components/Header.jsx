import { useState } from "react";
import { useDispatch } from "react-redux";
import { initState } from "../redux/slices/authSlice";
import { p } from "./theme";

const Header = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
      {/* Titre section */}
      <div>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: p.text, margin: 0, letterSpacing: "-0.02em" }}>
          📋 Mes Tâches
        </h2>
        <p style={{ fontSize: "0.75rem", color: p.muted, margin: "0.2rem 0 0" }}>
          Gérez votre journée efficacement
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        {/* Toggle thème */}
        <button
          onClick={toggleTheme}
          title={darkMode ? "Mode clair" : "Mode sombre"}
          style={{
            width: 38, height: 38, borderRadius: "50%",
            border: `1px solid ${p.border}`,
            background: p.card,
            cursor: "pointer", fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
            color: p.muted,
            boxShadow: p.shadow,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${p.primary}10`; e.currentTarget.style.borderColor = p.primary; }}
          onMouseLeave={e => { e.currentTarget.style.background = p.card; e.currentTarget.style.borderColor = p.border; }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Déconnexion */}
        <button
          onClick={() => dispatch(initState())}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "2rem",
            border: `1.5px solid ${p.border}`,
            background: p.card,
            color: p.muted,
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: p.shadow,
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#FEE8E8";
            e.currentTarget.style.color = "#C0392B";
            e.currentTarget.style.borderColor = "#F5B5B5";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = p.card;
            e.currentTarget.style.color = p.muted;
            e.currentTarget.style.borderColor = p.border;
          }}
        >
          <span>⎋</span> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Header;