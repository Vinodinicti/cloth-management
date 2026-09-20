import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  PlusCircle,
  Scissors,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

export default function Header({
  setMobileOpen,
  onOpenQuickAction,
  searchQuery,
  setSearchQuery,
  activeRole = "Administrator (Owner)",
  onOpenRoleAuth,
  notifications = []
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const roleUserMap = {
    'Administrator (Owner)': { name: 'Velavan Soundararajan', email: 'owner@threadcraft.com', initials: 'VS' },
    'Boutique Store Manager': { name: 'Rajesh Kumar', email: 'manager@threadcraft.com', initials: 'RK' },
    'Master Tailor Staff': { name: 'Master Ramesh', email: 'tailor@threadcraft.com', initials: 'MR' }
  };

  const currentUser = roleUserMap[activeRole] || roleUserMap['Administrator (Owner)'];

  const defaultNotifications = notifications.length > 0 ? notifications : [
    { id: 1, title: 'Low Stock Alert', msg: 'Banarasi Silk Fabric is below 25m threshold', time: '10m ago', type: 'warning' },
    { id: 2, title: 'Stitching Ready', msg: 'Suit #STITCH-1003 reached Quality Check', time: '1h ago', type: 'info' },
    { id: 3, title: 'Payment Received', msg: 'Ananya Sharma paid INR 8,600 via NetBanking', time: '2h ago', type: 'success' }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#180A0E]/85 backdrop-blur-md border-b border-amber-400/20 px-4 lg:px-8 flex items-center justify-between shadow-md text-stone-100">
      {/* Left Mobile Toggle & Boutique Atelier Telemetry Badge */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 hover:bg-amber-400/30 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-3 bg-black/40 backdrop-blur-md border border-amber-400/35 px-4 py-1.5 rounded-full shadow-inner text-xs font-bold">
          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="font-extrabold tracking-wide uppercase text-[11px] text-amber-300 font-mono">Boutique Studio Live</span>
          </div>
          <span className="text-amber-400/40">|</span>
          <div className="flex items-center gap-2 text-stone-200 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-amber-200"><Scissors className="w-3.5 h-3.5 text-amber-400" /> Master Tailors Workshop</span>
            <span className="text-amber-400/40">•</span>
            <span className="text-stone-300">Fabric Vault Active</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Action Button */}
        <button
          onClick={onOpenQuickAction}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl btn-glossy-burgundy font-semibold text-xs tracking-wide shadow-md transition-all"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Quick Actions</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-sm text-stone-900">Notifications</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-900 border border-rose-200">
                  {defaultNotifications.length} New
                </span>
              </div>
              <div className="space-y-2 mt-3 max-h-80 overflow-y-auto">
                {defaultNotifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${n.type === 'warning' ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'}`}>
                      {n.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-stone-900">{n.title}</h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{n.msg}</p>
                      <span className="text-[11px] text-stone-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-950 text-amber-300 font-black flex items-center justify-center text-xs shadow-xs border border-amber-400/30">
              {currentUser.initials}
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-extrabold text-stone-900 leading-tight">{currentUser.name}</h4>
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">{activeRole.split(' ')[0]}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-3.5 z-50 space-y-2">
              <div className="pb-2 border-b border-stone-100">
                <p className="text-xs font-extrabold text-stone-900">{currentUser.name}</p>
                <p className="text-[11px] text-stone-500 font-medium">{currentUser.email}</p>
                <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-950 border border-rose-200">
                  {activeRole}
                </span>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenRoleAuth();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-extrabold text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 flex items-center justify-between transition-colors"
                >
                  <span>Switch User / Password Login</span>
                  <UserCheck className="w-4 h-4 text-rose-900" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

