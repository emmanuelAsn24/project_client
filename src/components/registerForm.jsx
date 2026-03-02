import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getState, register as createAccount, setStatusToIdle } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "./spinner";
import { p } from "./theme";

const RHFInput = ({ label, type = "text", registration, error, showToggle, onToggle, showPwd }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <div style={{
        position: "relative", borderRadius: p.radius,
        border: `2px solid ${error ? "#E53E3E" : focused ? p.primary : p.border}`,
        background: focused ? "#FFFBF8" : p.inputBg,
        transition: "all 0.2s ease",
        boxShadow: focused ? `0 0 0 4px ${error ? "#E53E3E" : p.primary}15` : "none",
      }}>
        <input
          type={showToggle ? (showPwd ? "text" : "password") : type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=""
          style={{
            width: "100%", border: "none", outline: "none", background: "transparent",
            padding: "1rem 3rem 0.5rem 1rem",
            fontSize: "0.9rem", color: p.text, fontFamily: p.font,
            boxSizing: "border-box",
          }}
          {...registration}
        />
        <label style={{
          position: "absolute", left: "1rem",
          top: focused ? "0.35rem" : "0.85rem",
          fontSize: focused ? "0.68rem" : "0.88rem",
          color: error ? "#E53E3E" : focused ? p.primary : p.mutedLight,
          fontWeight: focused ? 600 : 400,
          transition: "all 0.2s ease", pointerEvents: "none",
        }}>{label}</label>
        {showToggle && (
          <button type="button" onClick={onToggle} style={{
            position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
            border: "none", background: "transparent", cursor: "pointer", color: p.muted, fontSize: "1rem",
          }}>
            {showPwd ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {error && (
        <p style={{ fontSize: "0.72rem", color: "#E53E3E", margin: "0.3rem 0 0 0.25rem" }}>⚠ {error}</p>
      )}
    </div>
  );
};

function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const { status, message } = useSelector(getState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (["success", "failed"].includes(status)) {
      setTimeout(() => dispatch(setStatusToIdle()), 6000);
    }
  }, [status]);

  const onSubmit = (data) => dispatch(createAccount(data));

  return (
    <div style={{ width: "100%" }}>
      {/* Messages status */}
      {status === "failed" && message && (
        <div style={{
          padding: "0.875rem 1rem", borderRadius: p.radius, marginBottom: "1rem",
          background: "#FEF2F2", border: "1px solid #FECACA",
          fontSize: "0.82rem", color: "#B91C1C",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span>⚠️</span> {message}
        </div>
      )}
      {status === "success" && message && (
        <div style={{
          padding: "0.875rem 1rem", borderRadius: p.radius, marginBottom: "1rem",
          background: "#F0FBF5", border: "1px solid #86EFAC",
          fontSize: "0.82rem", color: "#166534",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span>✅</span> {message}
        </div>
      )}
      {status === "loading" && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <Spinner />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <RHFInput
          label="Adresse email"
          type="text"
          registration={register("email", {
            required: "Email obligatoire",
            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email invalide" },
          })}
          error={errors.email?.message}
        />
        <RHFInput
          label="Nom d'utilisateur"
          type="text"
          registration={register("name", {
            required: "Le nom est obligatoire",
            maxLength: { value: 15, message: "15 caractères maximum" },
          })}
          error={errors.name?.message}
        />
        <RHFInput
          label="Mot de passe"
          showToggle showPwd={showPwd} onToggle={() => setShowPwd(v => !v)}
          registration={register("password", {
            required: "Mot de passe obligatoire",
            minLength: { value: 6, message: "6 caractères minimum" },
            maxLength: { value: 15, message: "15 caractères maximum" },
          })}
          error={errors.password?.message}
        />
        <RHFInput
          label="Confirmer le mot de passe"
          showToggle showPwd={showPwd} onToggle={() => setShowPwd(v => !v)}
          registration={register("cpassword", {
            required: "Confirmation obligatoire",
            validate: (v) => v === getValues("password") || "Les mots de passe ne correspondent pas",
          })}
          error={errors.cpassword?.message}
        />

        <button type="submit" style={{
          width: "100%", padding: "0.875rem",
          borderRadius: p.radius, border: "none",
          background: `linear-gradient(135deg, ${p.primary}, ${p.amber})`,
          color: "#fff", fontSize: "0.95rem", fontWeight: 700,
          cursor: "pointer", fontFamily: p.font,
          boxShadow: `0 6px 20px ${p.primary}45`,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          marginTop: "0.25rem",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${p.primary}55`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 20px ${p.primary}45`; }}
        >
          {status === "loading" ? "Création..." : "Créer mon compte"}
        </button>

        <p style={{ textAlign: "center", fontSize: "0.82rem", color: p.muted, margin: 0 }}>
          Déjà un compte ?{" "}
          <Link to="/security/login" style={{ color: p.primary, fontWeight: 700, textDecoration: "none" }}>
            Se connecter →
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;