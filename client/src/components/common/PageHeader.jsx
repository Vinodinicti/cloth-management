import React from 'react';

export default function PageHeader({ title, subtitle, icon: Icon, badgeText, actionButton }) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-[#1C050B] via-[#3B0716] to-[#2D0714] p-5 lg:p-6 text-white border-2 border-amber-400/40 shadow-xl overflow-hidden animate-in fade-in duration-300">
      {/* Top Shimmering Metallic Gold Ray */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />

      {/* Background Ambient Flare */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 lg:w-13 lg:h-13 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg border-2 border-amber-200 shrink-0 transform hover:scale-105 transition-transform duration-300">
            {Icon && <Icon className="w-6 h-6 lg:w-6.5 lg:h-6.5 text-rose-950" />}
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl lg:text-2.5xl font-black tracking-tight text-white drop-shadow-md">
                {title}
              </h1>
              {badgeText && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold uppercase tracking-widest shadow-2xs">
                  {badgeText}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-amber-100/80 font-medium mt-1 leading-relaxed max-w-2xl">
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
