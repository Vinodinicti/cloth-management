import React, { useState } from 'react';
import { X, Scissors } from 'lucide-react';

export default function StitchingModal({ isOpen, onClose, onSave, customers = [], tailors = [] }) {
  const [formData, setFormData] = useState({
    customerName: customers[0]?.name || 'Ananya Sharma',
    customerId: customers[0]?.id || 'CUST-501',
    clothingType: 'Designer Silk Blouse with Dori',
    assignedTailor: tailors[0]?.name || 'Sunita Devi',
    expectedDelivery: '2026-09-25',
    priority: 'Normal',
    estimatedCost: 2200,
    fabricProvidedBy: 'Shop Store (Banarasi Raw Silk)',
    requirements: 'Deep back neck with handcrafted tassel dori, heavy zari work on sleeve borders.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-400/40 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Shimmer Accent Ray */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#1C050B] via-[#3B0716] to-[#2A0713] text-white border-b border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg border border-amber-200">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight drop-shadow-xs">Create New Stitching Order</h2>
              <p className="text-[11px] text-amber-200/80">Assign tailoring ticket to workshop master.</p>
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
              <label className="block mb-1 text-stone-700 font-bold">Customer</label>
              <select
                value={formData.customerName}
                onChange={(e) => {
                  const cust = customers.find(c => c.name === e.target.value);
                  setFormData({ ...formData, customerName: e.target.value, customerId: cust?.id || 'CUST-501' });
                }}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                {customers.map(c => <option key={c.id} value={c.name}>{c.name} ({c.id})</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Assigned Tailor</label>
              <select
                value={formData.assignedTailor}
                onChange={(e) => setFormData({ ...formData, assignedTailor: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                {tailors.map(t => <option key={t.id} value={t.name}>{t.name} ({t.specialty})</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-stone-700 font-bold">Clothing / Garment Type</label>
            <input
              type="text"
              required
              value={formData.clothingType}
              onChange={(e) => setFormData({ ...formData, clothingType: e.target.value })}
              placeholder="e.g. 3-Piece Tuxedo Suit / Designer Lehenga"
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Expected Delivery</label>
              <input
                type="date"
                required
                value={formData.expectedDelivery}
                onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Priority Speed</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                <option value="Normal">Normal (3-5 Days)</option>
                <option value="Express (Rush)">Express (Rush 24h)</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Stitching Charge (₹)</label>
              <input
                type="number"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-stone-700 font-bold">Special Instructions & Requirements</label>
            <textarea
              rows={2}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
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
              Assign Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


