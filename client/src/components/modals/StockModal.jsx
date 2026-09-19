import React, { useState, useEffect } from 'react';
import { X, Layers } from 'lucide-react';

export default function StockModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    fabricName: '',
    category: 'Fabrics',
    size: '100 Meters Roll',
    color: 'Ivory White',
    quantity: 50,
    unit: 'Meters',
    reorderLevel: 20,
    supplier: 'Surat Textiles',
    unitCost: 200,
    retailPrice: 400
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        fabricName: '',
        category: 'Fabrics',
        size: '100 Meters Roll',
        color: 'Ivory White',
        quantity: 50,
        unit: 'Meters',
        reorderLevel: 20,
        supplier: 'Surat Textiles',
        unitCost: 200,
        retailPrice: 400
      });
    }
  }, [initialData, isOpen]);

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
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight drop-shadow-xs">
                {initialData ? 'Edit Stock Item' : 'Add New Stock / Fabric'}
              </h2>
              <p className="text-[11px] text-amber-200/80">Manage fabric rolls, thread spools, and raw materials.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-amber-200/80 hover:text-white hover:bg-amber-400/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-semibold text-stone-700">
          <div>
            <label className="block mb-1 text-stone-700 font-bold">Fabric / Material Name</label>
            <input
              type="text"
              required
              value={formData.fabricName}
              onChange={(e) => setFormData({ ...formData, fabricName: e.target.value })}
              placeholder="e.g. Banarasi Raw Silk Roll"
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                <option value="Fabrics">Fabrics</option>
                <option value="Lining">Lining</option>
                <option value="Suiting">Suiting</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Color & Shade</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g. Crimson Red"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Quantity</label>
              <input
                type="number"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                <option value="Meters">Meters</option>
                <option value="Pcs">Pcs</option>
                <option value="Rolls">Rolls</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Reorder Limit</label>
              <input
                type="number"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Supplier Name</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Unit Cost (₹)</label>
              <input
                type="number"
                value={formData.unitCost}
                onChange={(e) => setFormData({ ...formData, unitCost: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Retail Price (₹)</label>
              <input
                type="number"
                value={formData.retailPrice}
                onChange={(e) => setFormData({ ...formData, retailPrice: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>
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
              Save Stock Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


