import React from 'react';

export default function PageHeader({ title, subtitle, icon: Icon, badgeText, actionButton }) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-white/95 via-[#FFFDF9]/90 to-white/95 backdrop-blur-xl p-5 lg:p-6 text-stone-900 border-2 border-amber-400/80 shadow-[0_10px_30px_-5px_rgba(217,119,6,0.25),0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden animate-in fade-in duration-300">
      {/* Top Shimmering Metallic Gold Ray */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-sm" />

      {/* Left Golden Accent Ribbon */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

      {/* Background Ambient Glow */}
      <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-gradient-to-br from-amber-200/40 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
        <div className="flex items-start sm:items-center gap-4">
          {/* 3D Embossed Icon Container */}
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-rose-950 via-[#3B0716] to-black text-amber-300 flex items-center justify-center shadow-lg border-2 border-amber-400/60 shrink-0 transform hover:scale-105 transition-all duration-300">
            {Icon && <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-amber-300 drop-shadow-xs" />}
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl lg:text-2.5xl font-black tracking-tight text-stone-900 drop-shadow-2xs">
                {title}
              </h1>
              {badgeText && (
                <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-950 to-rose-900 text-amber-300 font-extrabold text-[10px] uppercase tracking-widest shadow-xs border border-amber-400/40">
                  {badgeText}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-stone-600 font-semibold mt-1 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Action Container */}
        {actionButton && (
          <div className="shrink-0 flex items-center gap-3">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
}
