import React from 'react';
import {
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Users,
  Scissors,
  ClipboardList,
  ShieldCheck,
  X,
  Store,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  activeRole = 'Administrator (Owner)',
  onOpenRoleAuth
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, restricted: false },
    { id: 'stock', label: 'Stock Management', icon: Layers, restricted: false },
    { id: 'products', label: 'Product Catalog', icon: ShoppingBag, restricted: activeRole === 'Master Tailor Staff' },
    { id: 'customers', label: 'Customer CRM', icon: Users, restricted: false },
    { id: 'stitching', label: 'Stitching Workflow', icon: Scissors, restricted: false },
    { id: 'orders', label: 'Order Management', icon: ClipboardList, restricted: activeRole === 'Master Tailor Staff' },
    { id: 'admin', label: 'Admin Control', icon: ShieldCheck, restricted: activeRole !== 'Administrator (Owner)' }
  ];

  const handleNavClick = (tabId, isRestricted) => {
    if (isRestricted) {
      if (onOpenRoleAuth) {
        onOpenRoleAuth(tabId === 'admin' ? 'Administrator (Owner)' : 'Boutique Store Manager');
      }
      return;
    }
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-rose-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Drawer Container with Burgundy & Gold Styling */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 max-h-dvh bg-gradient-to-b from-[#1C050B] via-[#2D0714] to-[#16060A] text-amber-100/90 z-50 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden border-r border-amber-400/20 shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {/* Brand Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-amber-400/20 bg-rose-950/30">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard', activeRole === 'Master Tailor Staff')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg shrink-0 border border-amber-200">
                <Scissors className="w-5 h-5 text-rose-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-base tracking-tight text-white drop-shadow-xs">
                    ThreadCraft
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-amber-200/70 font-medium">Boutique & Tailoring</p>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-amber-300/80 hover:text-white hover:bg-amber-400/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* System Telemetry Status Card */}
          <div className="mx-3 my-3 px-3 py-2.5 rounded-xl bg-rose-950/60 border border-amber-400/25 flex items-center justify-between text-xs shadow-inner">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <div className="truncate">
                <span className="font-extrabold text-amber-100 block text-[11px] truncate">{activeRole.split(' ')[0]} Mode</span>
                <span className="text-[10px] text-amber-200/60 font-mono">Authenticated</span>
              </div>
            </div>
            <button
              onClick={() => onOpenRoleAuth()}
              className="font-extrabold text-amber-300 bg-amber-400/20 hover:bg-amber-400/40 border border-amber-400/40 px-2.5 py-1 rounded-lg text-[10px] shadow-xs transition-colors shrink-0"
              title="Switch User / Login"
            >
              Login
            </button>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1.5">
            <p className="px-2 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-400/70">
              Workspace Navigation
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isLocked = item.restricted;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, isLocked)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-glossy-burgundy-gold text-white shadow-lg border border-amber-400/50 scale-[1.02]'
                      : isLocked
                      ? 'text-amber-100/40 hover:text-amber-200 hover:bg-rose-950/40 border border-transparent cursor-pointer'
                      : 'text-amber-100/80 hover:text-white hover:bg-rose-900/40 hover:border-amber-400/30 border border-transparent hover:translate-x-1.5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform duration-200 ${
                      isActive 
                        ? 'text-amber-300 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)] scale-110' 
                        : isLocked
                        ? 'text-amber-200/40'
                        : 'text-amber-200/60 group-hover:text-amber-300 group-hover:scale-110'
                    }`} />
                    <span className={isActive ? 'drop-shadow-xs font-bold' : ''}>{item.label}</span>
                  </div>

                  {isActive ? (
                    <ChevronRight className="w-4 h-4 text-amber-300 animate-pulse" />
                  ) : isLocked ? (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400/60 border border-amber-400/20">
                      PIN
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Store Card */}
        <div className="shrink-0 p-3 border-t border-amber-400/20 bg-rose-950/40">
          <div className="p-2.5 rounded-xl bg-rose-950/60 border border-amber-400/25 flex items-center gap-3 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-200 shadow-xs">
              <Store className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-amber-100 truncate">Royal Fabric Boutique</h4>
              <p className="text-[11px] text-amber-200/60 truncate">Flagship Store</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


