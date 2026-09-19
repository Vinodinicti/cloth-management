import React from 'react';

export default function FloatingFabricBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Self-contained 3D Motion Keyframe Animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-28px) rotate(8deg) scale(1.04); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-38px) rotate(-12deg) scale(1.06); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(32px) rotate(-9deg) scale(0.97); }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseBeam {
          0%, 100% { opacity: 0.35; transform: scaleY(1) translateY(0); }
          50% { opacity: 0.65; transform: scaleY(1.1) translateY(-15px); }
        }
        .anim-float-slow { animation: floatSlow 12s ease-in-out infinite; }
        .anim-float-medium { animation: floatMedium 9s ease-in-out infinite; }
        .anim-float-reverse { animation: floatReverse 14s ease-in-out infinite; }
        .anim-spin-slow { animation: spinSlow 35s linear infinite; }
        .anim-pulse-beam { animation: pulseBeam 8s ease-in-out infinite; }
      `}</style>

      {/* Reusable SVG Gradients */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Gold Metallic Face Gradient */}
          <linearGradient id="bgGoldTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.8" />
          </linearGradient>

          {/* Burgundy Right Face Gradient */}
          <linearGradient id="bgBurgundyRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9F1239" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#701A31" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4C0519" stopOpacity="0.9" />
          </linearGradient>

          {/* Deep Burgundy Left Face Gradient */}
          <linearGradient id="bgBurgundyLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C0519" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#2B0613" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1C050B" stopOpacity="0.95" />
          </linearGradient>

          {/* Cylinder Body Gradient */}
          <linearGradient id="bgCylinderBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#881337" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4C0519" stopOpacity="0.9" />
          </linearGradient>

          {/* Cylinder Top Cap */}
          <linearGradient id="bgCylinderTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
          </linearGradient>

          {/* Wireframe Gold Gradient */}
          <linearGradient id="bgWireGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Deep Burgundy & Gold Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#120307] via-[#240610] to-[#180309] -z-20" />

      {/* Ambient Radial Glowing Flares */}
      <div className="absolute -top-32 -left-32 w-[44rem] h-[44rem] bg-gradient-to-br from-rose-900/40 via-amber-600/20 to-transparent rounded-full blur-3xl opacity-75 anim-pulse-beam" />
      <div className="absolute top-1/3 -right-32 w-[40rem] h-[40rem] bg-gradient-to-bl from-amber-500/35 via-rose-900/25 to-transparent rounded-full blur-3xl opacity-70 anim-pulse-beam" style={{ animationDelay: '-4s' }} />
      <div className="absolute -bottom-32 left-1/3 w-[48rem] h-[48rem] bg-gradient-to-t from-rose-950/70 via-amber-700/20 to-transparent rounded-full blur-3xl opacity-75 anim-pulse-beam" style={{ animationDelay: '-2s' }} />

      {/* Illuminated Diagonal Light Beams (Matching Purple Reference Rays) */}
      <div className="absolute -top-1/4 left-1/4 w-[140%] h-[600px] -rotate-45 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent blur-2xl opacity-60 anim-pulse-beam" />
      <div className="absolute top-1/2 -left-1/4 w-[140%] h-[450px] -rotate-45 bg-gradient-to-r from-transparent via-rose-700/15 to-transparent blur-2xl opacity-50 anim-pulse-beam" style={{ animationDelay: '-3s' }} />

      {/* ========================================================
          3D GEOMETRIC FLOATING OBJECTS (REFERENCE DESIGN)
         ======================================================== */}

      {/* 1. TOP-LEFT: Floating 3D Isometric Cube */}
      <div className="absolute top-12 left-10 anim-float-slow opacity-85">
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
          <polygon points="50,12 90,32 50,52 10,32" fill="url(#bgGoldTop)" />
          <polygon points="50,52 90,32 90,72 50,92" fill="url(#bgBurgundyRight)" />
          <polygon points="50,52 10,32 10,72 50,92" fill="url(#bgBurgundyLeft)" />
          <polyline points="10,32 50,52 90,32" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="50" y1="52" x2="50" y2="92" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* 2. TOP-LEFT CORNER: 6x6 Dot Grid Matrix */}
      <div className="absolute top-20 left-48 anim-float-reverse opacity-30 hidden sm:block">
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-xs" />
          ))}
        </div>
      </div>

      {/* 3. TOP CENTER-RIGHT: Floating 3D Pyramid / Cone */}
      <div className="absolute top-8 right-1/3 anim-float-medium opacity-80" style={{ animationDelay: '-1.5s' }}>
        <svg width="100" height="110" viewBox="0 0 100 110" fill="none">
          <polygon points="50,10 10,85 50,95" fill="url(#bgBurgundyLeft)" />
          <polygon points="50,10 90,85 50,95" fill="url(#bgGoldTop)" opacity="0.9" />
          <path d="M10 85 C10 100, 90 100, 90 85" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
          <line x1="50" y1="10" x2="50" y2="95" stroke="#FDE047" strokeWidth="1.5" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* 4. TOP-RIGHT: 3D Cylinder */}
      <div className="absolute top-16 right-12 anim-float-reverse opacity-85" style={{ animationDelay: '-3s' }}>
        <svg width="95" height="120" viewBox="0 0 100 130" fill="none">
          <path d="M15 35 V95 C15 110, 85 110, 85 95 V35 Z" fill="url(#bgCylinderBody)" />
          <ellipse cx="50" cy="35" rx="35" ry="18" fill="url(#bgCylinderTop)" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* 5. MIDDLE-LEFT: Floating Wireframe Triangle */}
      <div className="absolute top-1/3 left-8 anim-spin-slow opacity-60">
        <svg width="75" height="75" viewBox="0 0 70 70" fill="none">
          <polygon points="35,8 62,58 8,58" stroke="url(#bgWireGold)" strokeWidth="2.5" fill="none" />
          <polygon points="35,20 50,50 20,50" stroke="#BE123C" strokeWidth="1.5" fill="none" opacity="0.7" />
        </svg>
      </div>

      {/* 6. CENTER-LEFT: Floating 3D Cylinder */}
      <div className="absolute top-2/5 left-1/5 anim-float-medium opacity-75 hidden md:block" style={{ animationDelay: '-2s' }}>
        <svg width="85" height="110" viewBox="0 0 100 130" fill="none">
          <path d="M15 35 V95 C15 110, 85 110, 85 95 V35 Z" fill="url(#bgCylinderBody)" />
          <ellipse cx="50" cy="35" rx="35" ry="18" fill="url(#bgCylinderTop)" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* 7. CENTER-RIGHT: Floating Large 3D Isometric Cube */}
      <div className="absolute top-1/2 right-16 anim-float-slow opacity-90" style={{ animationDelay: '-4s' }}>
        <svg width="130" height="130" viewBox="0 0 100 100" fill="none">
          <polygon points="50,12 90,32 50,52 10,32" fill="url(#bgGoldTop)" />
          <polygon points="50,52 90,32 90,72 50,92" fill="url(#bgBurgundyRight)" />
          <polygon points="50,52 10,32 10,72 50,92" fill="url(#bgBurgundyLeft)" />
          <polyline points="10,32 50,52 90,32" stroke="#FDE047" strokeWidth="1.2" strokeOpacity="0.8" />
          <line x1="50" y1="52" x2="50" y2="92" stroke="#FDE047" strokeWidth="1.2" strokeOpacity="0.7" />
        </svg>
      </div>

      {/* 8. BOTTOM-RIGHT CORNER: 6x6 Dot Grid Matrix */}
      <div className="absolute bottom-24 right-28 anim-float-slow opacity-30 hidden sm:block" style={{ animationDelay: '-3.5s' }}>
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-xs" />
          ))}
        </div>
      </div>

      {/* 9. BOTTOM-LEFT: Floating 3D Cone / Pyramid */}
      <div className="absolute bottom-16 left-1/4 anim-float-reverse opacity-85" style={{ animationDelay: '-1s' }}>
        <svg width="115" height="125" viewBox="0 0 100 110" fill="none">
          <polygon points="50,10 10,85 50,95" fill="url(#bgBurgundyLeft)" />
          <polygon points="50,10 90,85 50,95" fill="url(#bgGoldTop)" opacity="0.95" />
          <path d="M10 85 C10 100, 90 100, 90 85" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
          <line x1="50" y1="10" x2="50" y2="95" stroke="#FDE047" strokeWidth="1.5" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* 10. BOTTOM-RIGHT: Floating Wireframe Triangle & Ring */}
      <div className="absolute bottom-12 right-1/3 anim-spin-slow opacity-65" style={{ animationDelay: '-5s' }}>
        <svg width="80" height="80" viewBox="0 0 70 70" fill="none">
          <polygon points="35,8 62,58 8,58" stroke="url(#bgWireGold)" strokeWidth="2" fill="none" />
          <circle cx="35" cy="38" r="12" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.8" />
        </svg>
      </div>

      {/* 11. FLOATING AMBIENT GOLD HOLLOW CIRCLES & DOTS */}
      <div className="absolute top-1/4 left-1/3 w-8 h-8 rounded-full border-2 border-amber-400/50 anim-float-slow opacity-60" />
      <div className="absolute top-2/3 left-12 w-6 h-6 rounded-full border-2 border-rose-500/50 anim-float-reverse opacity-50" />
      <div className="absolute top-1/6 right-1/4 w-4 h-4 rounded-full bg-amber-300/60 shadow-xs anim-float-medium opacity-70" />
      <div className="absolute bottom-1/3 right-12 w-5 h-5 rounded-full border-2 border-amber-300/60 anim-float-slow opacity-65" />
    </div>
  );
}
