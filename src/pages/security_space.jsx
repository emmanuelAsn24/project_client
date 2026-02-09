import React from 'react'
import { Outlet } from 'react-router-dom'

export const SecuritySpace = () => {
  return(
    <div className="flex h-screen w-screen overflow-hidden relative bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-gradient-to-br from-amber-300/15 to-yellow-300/15 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Left panel - Hero section */}
      <div className="hidden flex-1 items-center justify-center relative lg:flex overflow-hidden">
        {/* Gradient overlay with pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500 opacity-95"></div>
        
        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)
            `
          }}></div>
        </div>

        {/* Floating task cards decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl transform rotate-12 animate-float-card-1 shadow-2xl"></div>
          <div className="absolute top-[60%] left-[15%] w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl transform -rotate-6 animate-float-card-2 shadow-2xl"></div>
          <div className="absolute top-[35%] right-[12%] w-28 h-28 bg-white/10 backdrop-blur-sm rounded-2xl transform rotate-6 animate-float-card-3 shadow-2xl"></div>
          <div className="absolute bottom-[20%] right-[18%] w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl transform -rotate-12 animate-float-card-4 shadow-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-2xl space-y-6 p-8 text-center text-white z-10">
          {/* Animated icon container */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/20 backdrop-blur-md p-6 rounded-full border-2 border-white/40 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold leading-tight animate-fade-in-up drop-shadow-lg">
            Gestion des Tâches
          </h1>
          
          <div className="space-y-3 animate-fade-in-up-delayed">
            <p className="text-xl font-light text-white/90">
              Espace de Sécurité
            </p>
            <div className="h-1 w-24 bg-white/40 mx-auto rounded-full"></div>
            <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
              Organisez, priorisez et accomplissez vos objectifs avec efficacité
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 mt-12 animate-fade-in-up-delayed-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <div className="text-3xl font-bold mb-1">✓</div>
              <div className="text-xs text-white/90">Organisé</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <div className="text-3xl font-bold mb-1">⚡</div>
              <div className="text-xs text-white/90">Rapide</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <div className="text-3xl font-bold mb-1">🎯</div>
              <div className="text-xs text-white/90">Efficace</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Form section */}
      <div className="flex flex-1 items-center justify-center relative z-10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-white/50 via-transparent to-white/30"></div>
        
        <div className="relative max-w-md w-full overflow-y-auto px-4 sm:px-6 py-8">
          <Outlet/>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-40px, 30px) rotate(-8deg);
          }
          66% {
            transform: translate(30px, -25px) rotate(8deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.25;
          }
        }

        @keyframes float-card-1 {
          0%, 100% { transform: translate(0, 0) rotate(12deg); }
          50% { transform: translate(10px, -20px) rotate(18deg); }
        }

        @keyframes float-card-2 {
          0%, 100% { transform: translate(0, 0) rotate(-6deg); }
          50% { transform: translate(-15px, 15px) rotate(-12deg); }
        }

        @keyframes float-card-3 {
          0%, 100% { transform: translate(0, 0) rotate(6deg); }
          50% { transform: translate(15px, 20px) rotate(12deg); }
        }

        @keyframes float-card-4 {
          0%, 100% { transform: translate(0, 0) rotate(-12deg); }
          50% { transform: translate(-10px, -15px) rotate(-18deg); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-float-card-1 {
          animation: float-card-1 15s ease-in-out infinite;
        }

        .animate-float-card-2 {
          animation: float-card-2 18s ease-in-out infinite;
        }

        .animate-float-card-3 {
          animation: float-card-3 20s ease-in-out infinite;
        }

        .animate-float-card-4 {
          animation: float-card-4 16s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-up-delayed {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up-delayed-2 {
          animation: fade-in-up 0.8s ease-out 0.4s both;
        }
      `}</style>
    </div>
  )
}