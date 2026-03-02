import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { p } from "./theme";

const InputField = ({ label, type = "text", error, children, ...props }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = props.value && props.value.length > 0;

  return (
    <div style={{ width: "100%", position: "relative", marginBottom: "0.25rem" }}>
      <div style={{
        position: "relative",
        borderRadius: p.radius,
        border: `2px solid ${error ? "#E53E3E" : focused ? p.primary : p.border}`,
        background: focused ? "#FFFBF8" : p.inputBg,
        transition: "all 0.2s ease",
        boxShadow: focused ? `0 0 0 4px ${error ? "#E53E3E" : p.primary}15` : "none",
      }}>
        <input
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", border: "none", outline: "none",
            background: "transparent",
            padding: "1rem 3rem 0.5rem 1rem",
            fontSize: "0.9rem", color: p.text, fontFamily: p.font,
            boxSizing: "border-box",
          }}
          placeholder=""
          {...props}
        />
        <label style={{
          position: "absolute", left: "1rem",
          top: focused || hasValue ? "0.35rem" : "0.85rem",
          fontSize: focused || hasValue ? "0.68rem" : "0.88rem",
          color: error ? "#E53E3E" : focused ? p.primary : p.mutedLight,
          fontWeight: focused || hasValue ? 600 : 400,
          transition: "all 0.2s ease",
          pointerEvents: "none", userSelect: "none",
        }}>{label}</label>
        {children && (
          <div style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)" }}>
            {children}
          </div>
        )}
      </div>
      {error && (
        <p style={{ fontSize: "0.72rem", color: "#E53E3E", margin: "0.3rem 0 0 0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

// Wrapper pour react-hook-form (controlled via register)
const RHFInput = ({ label, type = "text", registration, error, showToggle, onToggle, showPwd }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ width: "100%", position: "relative", marginBottom: "0.25rem" }}>
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
            width: "100%", border: "none", outline: "none",
            background: "transparent",
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
          transition: "all 0.2s ease",
          pointerEvents: "none",
        }}>{label}</label>
        {showToggle && (
          <button type="button" onClick={onToggle} style={{
            position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
            border: "none", background: "transparent", cursor: "pointer",
            color: p.muted, fontSize: "1rem", padding: 0,
          }}>
            {showPwd ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {error && (
        <p style={{ fontSize: "0.72rem", color: "#E53E3E", margin: "0.3rem 0 0 0.25rem" }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
};

function LoginForm() {
  const [showPwd, setShowPwd] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const { status, isAuthenticated } = useSelector(s => s.authReducer);

  const onSubmit = (data) => dispatch(authenticate(data));

  useEffect(() => {
    if (status === "success" && isAuthenticated) navigate("/home");
  }, [status, isAuthenticated]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <RHFInput
        label="Adresse email"
        type="text"
        registration={register("email", {
          required: "L'email est obligatoire",
          pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email invalide" },
        })}
        error={errors.email?.message}
      />
      <RHFInput
        label="Mot de passe"
        showToggle
        showPwd={showPwd}
        onToggle={() => setShowPwd(v => !v)}
        registration={register("password", {
          required: "Le mot de passe est obligatoire",
          minLength: { value: 6, message: "6 caractères minimum" },
        })}
        error={errors.password?.message}
      />

      {/* Submit */}
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
        {status === "loading" ? "Connexion..." : "Se connecter"}
      </button>

      <p style={{ textAlign: "center", fontSize: "0.82rem", color: p.muted, margin: 0 }}>
        Pas encore de compte ?{" "}
        <Link to="/security/register" style={{ color: p.primary, fontWeight: 700, textDecoration: "none" }}>
          Créer un compte →
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;