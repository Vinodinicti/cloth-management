import React from 'react';
import {
  X,
  ShoppingBag,
  Layers,
  UserPlus,
  Scissors,
  ClipboardPlus,
  Sparkles,
  Lock
} from 'lucide-react';

export default function QuickActionModal({ isOpen, onClose, onSelectAction, activeRole = 'Administrator (Owner)' }) {
  if (!isOpen) return null;

  const isTailor = activeRole === 'Master Tailor Staff';

  const actions = [
    {
      id: 'product',
      title: 'Add New Product',
      desc: 'Catalog sarees, shirts, kurtis & ready-made apparel',
      icon: ShoppingBag,
      badge: '+ Product',
      restricted: isTailor
    },
    {
      id: 'stock',
      title: 'Add Fabric / Stock',
      desc: 'Ingest raw rolls, lining, zari thread & materials',
      icon: Layers,
      badge: '+ Inventory',
      restricted: isTailor
    },
    {
      id: 'customer',
      title: 'New Customer Profile',
      desc: 'Register customer with custom body measurements',
      icon: UserPlus,
      badge: '+ Customer',
      restricted: isTailor
    },
    {
      id: 'stitching',
      title: 'New Stitching Order',
      desc: 'Assign custom tailoring job to master tailor',
      icon: Scissors,
      badge: '+ Custom Stitch',
      restricted: false
    },
    {
      id: 'order',
      title: 'Create Sales Invoice',
      desc: 'Process sale with instant receipt & payment options',
      icon: ClipboardPlus,
      badge: '+ Invoice',
      restricted: isTailor
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-400/40 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Shimmer Accent Ray */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#1C050B] via-[#3B0716] to-[#2A0713] text-white border-b border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg border border-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight drop-shadow-xs">Quick Actions Hub</h2>
              <p className="text-[11px] text-amber-200/80">Select an action to launch a quick workflow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200/80 hover:text-white hover:bg-amber-400/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {actions.map((act) => {
            const Icon = act.icon;
            const isDisabled = act.restricted;
            return (
              <button
                key={act.id}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    onSelectAction(act.id);
                    onClose();
                  }
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 relative overflow-hidden ${
                  isDisabled
                    ? 'bg-stone-100/70 border-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                    : 'bg-stone-50/80 hover:bg-amber-50/60 border-stone-200 hover:border-amber-400/80 shadow-xs hover:shadow-md group cursor-pointer'
                }`}
                title={isDisabled ? 'Restricted: Tailor mode can only create Stitching Orders' : act.title}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border transition-transform ${
                    isDisabled
                      ? 'bg-stone-200 text-stone-400 border-stone-300'
                      : 'bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 border-amber-200 group-hover:scale-110'
                  }`}>
                    {isDisabled ? <Lock className="w-5 h-5 text-stone-400" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                    isDisabled
                      ? 'bg-stone-200 text-stone-500 border-stone-300'
                      : 'bg-rose-950/10 text-rose-950 border-rose-900/20 group-hover:bg-rose-950 group-hover:text-amber-200'
                  }`}>
                    {isDisabled ? 'Restricted' : act.badge}
                  </span>
                </div>
                <div>
                  <h3 className={`font-extrabold text-xs transition-colors ${isDisabled ? 'text-stone-400' : 'text-stone-900 group-hover:text-rose-950'}`}>
                    {act.title}
                  </h3>
                  <p className={`text-[11px] mt-0.5 leading-normal font-medium ${isDisabled ? 'text-stone-400' : 'text-stone-600'}`}>
                    {isDisabled ? 'Restricted to Store Manager / Owner' : act.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

