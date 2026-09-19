import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Search,
  X
} from 'lucide-react';
import AISmartSummary from '../components/common/AISmartSummary';
import PageHeader from '../components/common/PageHeader';

export default function OrdersPage({ orders = [], activeRole = 'Administrator (Owner)', onCreateOrder, onUpdateOrderStatus }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [selectedOrderForTimeline, setSelectedOrderForTimeline] = useState(null);

  const canEditOrders = activeRole === 'Administrator (Owner)' || activeRole === 'Boutique Store Manager';

  const statuses = ['All', 'New', 'Processing', 'Ready', 'Delivered'];
  const payments = ['All', 'Paid', 'Partially Paid', 'Pending'];

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
                          o.id?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'All' || o.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Processing': return 'bg-rose-50 text-rose-900 border-rose-200';
      case 'Ready': return 'bg-purple-50 text-purple-900 border-purple-200';
      case 'Delivered': return 'bg-rose-100 text-rose-950 border-rose-300';
      default: return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getPaymentBadge = (pay) => {
    switch (pay) {
      case 'Paid': return 'bg-rose-50 text-rose-900 border border-rose-200';
      case 'Partially Paid': return 'bg-amber-50 text-amber-900 border border-amber-200';
      default: return 'bg-rose-100 text-rose-950 border border-rose-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Glossy Hero Page Header */}
      <PageHeader
        title="Order & Sales Invoice Management"
        subtitle="Track customer invoices, payment statuses, and delivery timeline progress."
        icon={ClipboardList}
        badgeText="Sales Invoices"
        actionButton={
          <button
            onClick={canEditOrders ? onCreateOrder : undefined}
            disabled={!canEditOrders}
            title={canEditOrders ? "Create new sales order" : "Restricted: Master Tailor Staff cannot create orders"}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
              canEditOrders ? 'btn-glossy-gold shadow-lg cursor-pointer' : 'bg-stone-800 text-stone-400 border border-stone-700 cursor-not-allowed opacity-70'
            }`}
          >
            <Plus className={`w-4 h-4 ${canEditOrders ? 'text-white' : 'text-stone-400'}`} />
            <span>Create New Order</span>
          </button>
        }
      />

      {/* AI Smart Summary Card */}
      <AISmartSummary
        pageType="orders"
        data={{ orders }}
        onAction={(actionKey) => {
          if (actionKey === 'add_order' && canEditOrders) onCreateOrder();
        }}
      />

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search order ID, customer name, payment status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-900 text-xs text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-900"
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-600">Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-900"
            >
              {payments.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="neat-table-container overflow-hidden">
        <div className="overflow-x-auto p-1">
          <table className="neat-table neat-table-orders">
            <thead>
              <tr>
                <th className="text-left">Invoice # & Date</th>
                <th className="text-left">Customer Profile</th>
                <th className="text-left">Purchased Products</th>
                <th className="text-right">Total Amount (₹)</th>
                <th className="text-center">Payment Method & Status</th>
                <th className="text-center">Fulfillment State</th>
                <th className="text-right">Order Audit</th>
              </tr>
            </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="table-row-popup cursor-pointer">
                    <td>
                      <div className="font-extrabold text-stone-900 text-sm tracking-tight">{order.id}</div>
                      <div className="text-[11px] font-mono text-stone-500 mt-1 whitespace-nowrap">Placed: {order.orderDate}</div>
                    </td>
                    <td>
                      <span className="font-extrabold text-stone-900 text-xs whitespace-nowrap">{order.customerName}</span>
                    </td>
                    <td className="cell-wrap">
                      <div className="space-y-0.5">
                        {order.items?.map((it, i) => (
                          <div key={i} className="text-xs font-semibold text-stone-800 truncate max-w-xs">
                            • {it.name} <span className="text-stone-400 font-medium">(x{it.qty})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="text-right tabular-nums whitespace-nowrap">
                      <span className="font-black text-rose-950 text-sm">₹{order.totalAmount?.toLocaleString()}</span>
                    </td>
                    <td className="text-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap inline-flex items-center justify-center border shadow-2xs ${getPaymentBadge(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="text-center">
                      <select
                        value={order.orderStatus}
                        disabled={!canEditOrders}
                        onChange={(e) => canEditOrders && onUpdateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-xl border text-xs font-extrabold focus:outline-none whitespace-nowrap shadow-2xs ${
                          canEditOrders ? 'cursor-pointer ' + getStatusBadge(order.orderStatus) : 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => setSelectedOrderForTimeline(order)}
                        className="px-3.5 py-1.5 rounded-xl border border-stone-200/80 bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs transition-all shadow-2xs whitespace-nowrap"
                      >
                        View Timeline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>

      {/* Animated Order Progress Timeline Modal */}
      {selectedOrderForTimeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h2 className="text-lg font-bold text-stone-900">Order Progress Timeline</h2>
                <p className="text-xs text-stone-500 font-mono mt-0.5">Order #{selectedOrderForTimeline.id} • {selectedOrderForTimeline.customerName}</p>
              </div>
              <button onClick={() => setSelectedOrderForTimeline(null)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 py-2 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {[
                { title: 'Order Received', desc: `Placed on ${selectedOrderForTimeline.orderDate}`, done: true },
                { title: 'Processing & Stitching', desc: 'Fabric allocated, assigned to tailor', done: selectedOrderForTimeline.orderStatus !== 'New' },
                { title: 'Ready for Pickup / Dispatch', desc: 'Quality inspection passed', done: selectedOrderForTimeline.orderStatus === 'Ready' || selectedOrderForTimeline.orderStatus === 'Delivered' },
                { title: 'Delivered to Customer', desc: `Target: ${selectedOrderForTimeline.deliveryDate || 'Completed'}`, done: selectedOrderForTimeline.orderStatus === 'Delivered' }
              ].map((step, idx) => (
                <div key={idx} className="relative pl-10 flex items-start gap-3">
                  <div className={`absolute left-1.5 top-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${step.done ? 'bg-rose-900 text-white shadow-xs' : 'bg-stone-100 text-stone-400 border border-stone-200'}`}>
                    {step.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm ${step.done ? 'text-stone-900' : 'text-stone-400'}`}>{step.title}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

