import React, { useState, useEffect } from 'react';
import { X, Users, Ruler } from 'lucide-react';

export default function CustomerModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    status: 'VIP',
    measurements: {
      chest: '36',
      bust: '37',
      waist: '30',
      hip: '39',
      shoulder: '15',
      armhole: '16.5',
      sleeveLength: '19',
      shirtLength: '44',
      neckFront: '7.0',
      neckBack: '8.5',
      pantWaist: '31',
      pantLength: '39',
      notes: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: 'Mumbai',
        status: 'VIP',
        measurements: {
          chest: '36',
          bust: '37',
          waist: '30',
          hip: '39',
          shoulder: '15',
          armhole: '16.5',
          sleeveLength: '19',
          shirtLength: '44',
          neckFront: '7.0',
          neckBack: '8.5',
          pantWaist: '31',
          pantLength: '39',
          notes: ''
        }
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleMeasChange = (key, val) => {
    setFormData({
      ...formData,
      measurements: {
        ...formData.measurements,
        [key]: val
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-400/40 overflow-hidden animate-in zoom-in-95 duration-200 my-6">
        {/* Top Shimmer Accent Ray */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#1C050B] via-[#3B0716] to-[#2A0713] text-white border-b border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg border border-amber-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight drop-shadow-xs">
                {initialData ? 'Edit Customer Profile' : 'Register New Customer'}
              </h2>
              <p className="text-[11px] text-amber-200/80">Log client contact records & custom fitting measurements.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-amber-200/80 hover:text-white hover:bg-amber-400/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-semibold text-stone-700">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Meera Singhania"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="meera@example.com"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Mumbai"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Category Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                <option value="VIP">VIP Customer</option>
                <option value="Regular">Regular Customer</option>
                <option value="New">New Client</option>
              </select>
            </div>
          </div>

          {/* Body Measurements Section */}
          <div className="p-4 rounded-xl bg-stone-50/80 border border-amber-400/25 space-y-3">
            <h3 className="font-extrabold text-stone-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
              <Ruler className="w-4 h-4 text-amber-600" />
              Body Measurements (Inches ″)
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-[11px]">
              {['chest', 'bust', 'waist', 'hip', 'shoulder', 'armhole', 'sleeveLength', 'shirtLength', 'neckFront', 'neckBack', 'pantWaist', 'pantLength'].map(m => (
                <div key={m}>
                  <label className="block capitalize text-stone-600 mb-0.5 font-bold">{m.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    value={formData.measurements[m] || ''}
                    onChange={(e) => handleMeasChange(m, e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-white border border-stone-300 text-center font-mono font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Tailoring Notes & Fitting Preferences</label>
              <textarea
                rows={2}
                value={formData.measurements.notes || ''}
                onChange={(e) => handleMeasChange('notes', e.target.value)}
                placeholder="e.g. Needs padded lining, 2-inch extra margin inside"
                className="w-full p-2.5 rounded-xl bg-white border border-stone-200/80 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 font-medium"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl btn-glossy-gold font-bold text-xs shadow-md transition-all"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


