import React, { useState } from 'react';
import { X, ClipboardList } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, onSave, customers = [], products = [] }) {
  const [formData, setFormData] = useState({
    customerName: customers[0]?.name || 'Ananya Sharma',
    customerId: customers[0]?.id || 'CUST-501',
    deliveryDate: '2026-09-22',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI (GooglePay)',
    items: [
      { name: products[0]?.name || 'Pure Kanjivaram Silk Saree', qty: 1, price: products[0]?.price || 18500 }
    ],
    totalAmount: products[0]?.price || 18500
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
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight drop-shadow-xs">Create Sales Order & Invoice</h2>
              <p className="text-[11px] text-amber-200/80">Generate new invoice, select customer & payment status.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-amber-200/80 hover:text-white hover:bg-amber-400/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-semibold text-stone-700">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Select Customer</label>
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
              <label className="block mb-1 text-stone-700 font-bold">Target Delivery Date</label>
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-stone-700 font-bold">Primary Product Purchased</label>
            <select
              onChange={(e) => {
                const prod = products.find(p => p.name === e.target.value);
                if (prod) {
                  setFormData({
                    ...formData,
                    items: [{ name: prod.name, qty: 1, price: prod.price }],
                    totalAmount: prod.price
                  });
                }
              }}
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
            >
              {products.map(p => <option key={p.id} value={p.name}>{p.name} - ₹{p.price}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-stone-700 font-bold">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                <option value="Paid">Paid (Full)</option>
                <option value="Partially Paid">Partially Paid (Advance Deposit)</option>
                <option value="Pending">Pending Payment</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-stone-700 font-bold">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-500 text-stone-900 font-medium transition-all"
              >
                <option value="UPI (GooglePay)">UPI (GooglePay / PhonePe)</option>
                <option value="Card (Visa/Mastercard)">Credit / Debit Card</option>
                <option value="Cash">Cash at Counter</option>
                <option value="NetBanking">NetBanking Transfer</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-center justify-between shadow-xs">
            <span className="font-bold text-rose-950 text-xs">Total Invoice Amount:</span>
            <span className="text-lg font-black text-rose-950 tabular-nums">₹{formData.totalAmount?.toLocaleString()}</span>
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
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

