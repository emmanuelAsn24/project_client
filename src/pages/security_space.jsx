import React from 'react'
import { Outlet } from 'react-router-dom'
import { p } from '../components/theme'

export const SecuritySpace = () => {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      fontFamily: p.font,
      background: p.bg,
      position: "relative",
    }}>

      {/* ── Blobs décoratifs fond ───────────────────── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${p.primary}18, transparent 70%)`,
          animation: "blob 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", right: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${p.amber}18, transparent 70%)`,
          animation: "blob 25s ease-in-out infinite 3s",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "50%",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${p.secondary}12, transparent 70%)`,
          animation: "blobPulse 8s ease-in-out infinite",
        }} />
      </div>

      {/* ── Panel gauche — Hero ─────────────────────── */}
      <div style={{
        flex: 1,
        display: "none",
        position: "relative",
        overflow: "hidden",
      }}
        ref={el => { if (el) el.style.display = window.innerWidth >= 1024 ? "flex" : "none"; }}
        className="lg-panel"
      >
        {/* Gradient warm */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${p.primary} 0%, ${p.secondary} 50%, ${p.amber} 100%)`,
          opacity: 0.97,
        }} />

        {/* Pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.15) 35px, rgba(255,255,255,.15) 70px),
            repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,.15) 35px, rgba(255,255,255,.15) 70px)
          `,
        }} />

        {/* Cartes flottantes décoratives */}
        {[
          { top: "15%", left: "10%",  size: 120, rotate: "12deg",  delay: "0s",   duration: "15s" },
          { top: "60%", left: "15%",  size: 90,  rotate: "-6deg",  delay: "2s",   duration: "18s" },
          { top: "35%", right: "12%", size: 110, rotate: "6deg",   delay: "1s",   duration: "20s" },
          { bottom: "20%", right: "18%", size: 75, rotate: "-12deg", delay: "3s", duration: "16s" },
        ].map((card, i) => (
          <div key={i} style={{
            position: "absolute",
            top: card.top, left: card.left, right: card.right, bottom: card.bottom,
            width: card.size, height: card.size,
            borderRadius: "1.25rem",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            transform: `rotate(${card.rotate})`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            animation: `floatCard ${card.duration} ease-in-out infinite ${card.delay}`,
          }} />
        ))}

        {/* Contenu hero */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", height: "100%",
          padding: "2rem",
        }}>
          <div style={{ maxWidth: 480, textAlign: "center", color: "#fff" }}>

            {/* Icône principale */}
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 96, height: 96, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              border: "2px solid rgba(255,255,255,0.35)",
              fontSize: "2.5rem",
              marginBottom: "2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              transition: "transform 0.4s ease",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) rotate(12deg)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>

            {/* Titre */}
            <h1 style={{
              fontSize: "2.75rem", fontWeight: 900,
              margin: "0 0 1rem", lineHeight: 1.1,
              letterSpacing: "-0.03em",
              textShadow: "0 2px 16px rgba(0,0,0,0.15)",
              animation: "fadeInUp 0.8s ease both",
            }}>
              Gestion des<br />
              <span style={{ opacity: 0.9 }}>Tâches</span>
            </h1>

            {/* Séparateur */}
            <div style={{
              width: 48, height: 3, borderRadius: 99,
              background: "rgba(255,255,255,0.5)",
              margin: "0 auto 1rem",
            }} />

            <p style={{
              fontSize: "0.95rem", opacity: 0.85, lineHeight: 1.7,
              marginBottom: "2.5rem",
              animation: "fadeInUp 0.8s ease 0.2s both",
            }}>
              Organisez, priorisez et accomplissez<br />vos objectifs avec efficacité
            </p>

            {/* Features */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.875rem",
              animation: "fadeInUp 0.8s ease 0.4s both",
            }}>
              {[
                { icon: "✓", label: "Organisé"  },
                { icon: "⚡", label: "Rapide"    },
                { icon: "🎯", label: "Efficace"  },
              ].map(({ icon, label }) => (
                <div key={label}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "1rem",
                    padding: "1rem 0.5rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.25s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.35rem" }}>{icon}</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, opacity: 0.9 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Panel droit — Formulaire ────────────────── */}
      <div style={{
        flex: 1, position: "relative", zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem 1.5rem",
        overflowY: "auto",
        background: "rgba(255,253,249,0.7)",
        backdropFilter: "blur(12px)",
      }}>
        {/* Halo décoratif derrière le form */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${p.primary}08, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 420,
        }}>
          <Outlet />
        </div>
      </div>

      {/* ── Animations ─────────────────────────────── */}
      <style>{`
        .lg-panel {
          display: none !important;
        }
        @media (min-width: 1024px) {
          .lg-panel {
            display: flex !important;
          }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(30px,-30px) scale(1.08); }
          66%       { transform: translate(-20px,20px) scale(0.94); }
        }
        @keyframes blobPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50%       { transform: scale(1.12); opacity: 0.25; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(var(--r, 6deg)); }
          50%       { transform: translateY(-18px) rotate(calc(var(--r, 6deg) + 6deg)); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}