import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

export default function ProductModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sarees',
    price: 3500,
    availableQty: 10,
    size: 'Free Size',
    color: 'Turquoise & Gold Zari',
    description: '',
    image: '/kanjivaram-saree.png',
    sku: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        category: 'Sarees',
        price: 3500,
        availableQty: 10,
        size: 'Free Size',
        color: 'Turquoise & Gold Zari',
        description: '',
        image: '/kanjivaram-saree.png',
        sku: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const imagePresets = [
    { label: 'Turquoise Kanjivaram Saree', url: '/kanjivaram-saree.png' },
    { label: 'Egyptian Cotton Formal Shirt', url: '/egyptian-shirt.png' },
    { label: 'Handcrafted Anarkali Kurti', url: '/anarkali-kurti.jpg' },
    { label: 'Formal Trousers', url: '/formal-trousers.jpg' },
    { label: 'Floral Georgette Dress', url: '/floral-dress.jpg' },
    { label: 'Royal Velvet Sherwani', url: '/velvet-sherwani.png' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-400/40 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Shimmer Accent Ray */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#1C050B] via-[#3B0716] to-[#2A0713] text-white border-b border-amber-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg border border-amber-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight drop-shadow-xs">
                {initialData ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-[11px] text-amber-200/80">Publish boutique apparel designs to catalog.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-amber-200/80 hover:text-white hover:bg-amber-400/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-semibold text-stone-700">
          <div>
            <label className="block mb-1 text-stone-700 font-bold">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Pure Kanjivaram Silk Saree"
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
                <option value="Sarees">Sarees</option>
                <option value="Shirts">Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Kurtis">Kurtis</option>
                <option value="Dresses">Dresses</option>
                <option value="Kids Wear">Kids Wear</option>
                <option value="Formal Wear">Formal Wear</option>
                <option value="Casual Wear">Casual Wear</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Retail Price (₹)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Quantity Available</label>
              <input
                type="number"
                value={formData.availableQty}
                onChange={(e) => setFormData({ ...formData, availableQty: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium tabular-nums transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Size Spec</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="e.g. Free Size (6.3m)"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Color</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g. Turquoise & Gold"
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-stone-700 font-bold">Product Image Preset</label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {imagePresets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: p.url })}
                  className={`px-3 py-1 rounded-lg border text-[11px] font-bold whitespace-nowrap transition-all ${
                    formData.image === p.url
                      ? 'bg-rose-900 text-amber-200 border-amber-400/40 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-stone-700 font-bold">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


