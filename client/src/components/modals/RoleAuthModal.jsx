import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, KeyRound, Eye, EyeOff, X, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

export default function RoleAuthModal({ isOpen, onClose, targetRole, onAuthenticateSuccess }) {
  const [selectedRole, setSelectedRole] = useState(targetRole || 'Administrator (Owner)');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const users = [
    {
      id: 'Administrator (Owner)',
      name: 'Velavan Soundararajan',
      title: 'Boutique Owner / SuperAdmin',
      pass: 'admin123',
      badge: 'SuperAdmin',
      avatar: 'VS'
    },
    {
      id: 'Boutique Store Manager',
      name: 'Rajesh Kumar',
      title: 'Store Operations Manager',
      pass: 'manager123',
      badge: 'Manager',
      avatar: 'RK'
    },
    {
      id: 'Master Tailor Staff',
      name: 'Master Ramesh',
      title: 'Head Workshop Master Tailor',
      pass: 'tailor123',
      badge: 'Master Tailor',
      avatar: 'MR'
    }
  ];

  useEffect(() => {
    if (targetRole) {
      setSelectedRole(targetRole);
    }
    setPassword('');
    setError('');
  }, [targetRole, isOpen]);

  if (!isOpen) return null;

  const activeUser = users.find(u => u.id === selectedRole) || users[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const isValid = password.trim() === activeUser.pass;

    if (isValid) {
      onAuthenticateSuccess(activeUser.id);
      onClose();
    } else {
      setError(`Invalid security password for ${activeUser.name}.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] text-stone-900 rounded-2xl shadow-2xl border-2 border-amber-400/50 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Shimmer Accent Ray */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#1C050B] via-[#3B0716] to-[#2A0713] text-white border-b border-amber-400/30 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg border border-amber-200">
              <Lock className="w-5 h-5 text-rose-950" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight drop-shadow-xs">Staff Authentication Login</h2>
              <p className="text-xs text-amber-200/90 font-medium">Enter security password to authorize login.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-amber-200/80 hover:text-white hover:bg-amber-400/20 border border-amber-400/30 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body with Clean Light Background */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs font-semibold">
          {/* User Selection Pills */}
          <div>
            <label className="block mb-2 text-rose-950 font-extrabold text-xs tracking-wider uppercase">
              Select User Profile to Authenticate
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {users.map((u) => {
                const isSelected = selectedRole === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(u.id);
                      setPassword('');
                      setError('');
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-rose-50/90 text-rose-950 border-2 border-rose-900 ring-2 ring-rose-900/30 shadow-md scale-[1.02]'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`w-8 h-8 rounded-lg text-xs font-black flex items-center justify-center border shadow-xs ${
                        isSelected ? 'bg-rose-950 text-amber-300 border-amber-400' : 'bg-stone-900 text-amber-200 border-stone-700'
                      }`}>
                        {u.avatar}
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-rose-900" />}
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-black text-stone-900 truncate">{u.name}</div>
                      <div className={`text-[10px] font-bold ${isSelected ? 'text-rose-900' : 'text-stone-500'}`}>{u.badge}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Target Banner */}
          <div className="p-4 rounded-xl bg-amber-50/80 border-2 border-amber-200/90 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-widest block">Target Identity</span>
              <span className="font-black text-rose-950 text-base tracking-tight">{activeUser.name}</span>
              <span className="text-xs text-stone-600 font-medium block mt-0.5">Role: {activeUser.title}</span>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-rose-950 text-amber-300 font-black text-xs border border-amber-400/40 shadow-xs">
              {activeUser.badge}
            </span>
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-1.5 text-rose-950 font-extrabold text-xs tracking-wider uppercase">
              Security Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter security password"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-white border-2 border-stone-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-stone-900 font-bold text-sm tracking-wider placeholder:text-stone-400 shadow-xs transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                title="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-100/90 text-rose-950 border-2 border-rose-300 text-xs font-bold flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <AlertCircle className="w-4.5 h-4.5 text-rose-700 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs border border-stone-300 hover:border-stone-400 shadow-xs transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-glossy-gold px-6 py-2.5 rounded-xl font-black text-xs shadow-md border border-amber-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-white" />
              <span>Authenticate & Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
