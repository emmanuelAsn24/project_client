import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getState, setStatusToIdle } from "../redux/slices/authSlice";
import RegisterForm from "../components/registerForm";
import { p } from "../components/theme";

function Register() {
  const dispatch = useDispatch();
  const { status } = useSelector(getState);

  useEffect(() => {
    if (["success", "failed"].includes(status)) {
      setTimeout(() => dispatch(setStatusToIdle()), 6000);
    }
  }, [status]);

  return (
    <div style={{ width: "100%", fontFamily: p.font }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 64, height: 64, borderRadius: "1.25rem",
          background: `linear-gradient(135deg, ${p.primary}, ${p.amber})`,
          boxShadow: `0 8px 24px ${p.primary}40`,
          fontSize: "1.5rem",
          marginBottom: "1rem",
          transition: "transform 0.3s ease",
          cursor: "default",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) rotate(6deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
        >
          ✦
        </div>

        <h1 style={{
          fontSize: "1.6rem", fontWeight: 800, margin: "0 0 0.4rem",
          background: `linear-gradient(135deg, ${p.primary}, ${p.amber})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}>
          Créer un compte
        </h1>
        <p style={{ fontSize: "0.85rem", color: p.muted, margin: 0 }}>
          Rejoignez TaskFlow et boostez votre productivité 🚀
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
        <RegisterForm />
      </div>

      <p style={{ textAlign: "center", fontSize: "0.75rem", color: p.mutedLight, marginTop: "1.5rem" }}>
        Votre productivité commence ici ✨
      </p>
    </div>
  );
}

export default Register;