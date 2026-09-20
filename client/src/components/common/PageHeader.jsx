import React from 'react';

export default function PageHeader({ title, subtitle, icon: Icon, badgeText, actionButton }) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-[#22040C]/95 via-[#3D0717]/90 to-[#280511]/95 backdrop-blur-xl p-5 lg:p-6 text-white border-t-2 border-b-2 border-amber-400/60 border-x border-amber-400/30 shadow-[0_10px_35px_-5px_rgba(136,19,55,0.4),0_0_20px_rgba(245,158,11,0.2)] overflow-hidden animate-in fade-in duration-300">
      {/* Top Shimmering Metallic Gold Ray */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 shadow-md" />

      {/* Left Golden Accent Ribbon */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />

      {/* Background Ambient Flare */}
      <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-gradient-to-br from-amber-400/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pl-1">
        <div className="flex items-start sm:items-center gap-4">
          {/* 3D Embossed Icon Container with Double Metallic Ring Glow */}
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] border-2 border-amber-100 shrink-0 transform hover:scale-105 transition-all duration-300">
            {Icon && <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-rose-950 drop-shadow-xs" />}
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl lg:text-2.5xl font-black tracking-tight text-white drop-shadow-md">
                {title}
              </h1>
              {badgeText && (
                <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-rose-950 font-black text-[10px] uppercase tracking-widest shadow-md border border-amber-200">
                  {badgeText}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-amber-100/90 font-medium mt-1 leading-relaxed max-w-2xl drop-shadow-xs">
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
