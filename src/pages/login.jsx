import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getState, setStatusToIdle } from "../redux/slices/authSlice";
import LoginForm from "../components/LoginForm";
import Spinner from "../components/spinner";
import login from "../assets/images/login.png";
import { p } from "../components/theme";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, message } = useSelector(getState);

  useEffect(() => {
    if (["success", "failed"].includes(status)) {
      setTimeout(() => dispatch(setStatusToIdle()), 4000);
    }
  }, [status]);

  return (
    <div style={{ width: "100%", fontFamily: p.font }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 72, height: 72, borderRadius: "1.25rem",
            background: `linear-gradient(135deg, ${p.primary}15, ${p.amber}15)`,
            border: `2px solid ${p.primary}25`,
            marginBottom: "1rem",
            transition: "transform 0.3s ease",
            cursor: "default",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) rotate(6deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
        >
          <img
            src={login}
            alt="Logo"
            width={40} height={40}
            style={{ filter: "drop-shadow(0 4px 8px rgba(232,101,42,0.3))" }}
          />
        </div>

        <h1 style={{
          fontSize: "1.6rem", fontWeight: 800, margin: "0 0 0.4rem",
          background: `linear-gradient(135deg, ${p.primary}, ${p.amber})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}>
          Bienvenue
        </h1>
        <p style={{ fontSize: "0.85rem", color: p.muted, margin: 0 }}>
          Connectez-vous à votre espace ✨
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        borderRadius: "1.5rem",
        border: `1px solid ${p.border}`,
        padding: "2rem",
        boxShadow: `0 16px 48px rgba(232,101,42,0.10), 0 2px 8px rgba(0,0,0,0.04)`,
      }}>

        {/* Erreur */}
        {status === "failed" && message && (
          <div style={{
            marginBottom: "1.25rem",
            padding: "0.875rem 1rem",
            borderRadius: p.radius,
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            display: "flex", alignItems: "center", gap: "0.5rem",
            animation: "shake 0.4s ease",
          }}>
            <span>⚠️</span>
            <span style={{ fontSize: "0.82rem", color: "#B91C1C", fontWeight: 500 }}>
              {message}
            </span>
          </div>
        )}

        {/* Spinner */}
        {status === "loading" && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <Spinner />
          </div>
        )}

        <LoginForm />
      </div>

      {/* Footer */}
      <p style={{ textAlign: "center", fontSize: "0.75rem", color: p.mutedLight, marginTop: "1.5rem" }}>
        Votre productivité commence ici ✨
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

export default Login;