import React, { useState } from 'react';
import {
  Scissors,
  Plus,
  Search,
  UserCheck,
  Calendar,
  Printer,
  X,
  ArrowRight,
  ArrowLeft,
  Clock,
  List,
  LayoutGrid
} from 'lucide-react';
import confetti from 'canvas-confetti';
import AISmartSummary from '../components/common/AISmartSummary';
import PageHeader from '../components/common/PageHeader';

export default function StitchingPage({
  stitchingOrders = [],
  tailors = [],
  onCreateStitchingOrder,
  onUpdateStatus
}) {
  const [search, setSearch] = useState('');
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);
  const [viewMode, setViewMode] = useState('kanban');

  const columns = [
    {
      id: 'PENDING',
      title: 'Pending Assignment',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
      dotColor: 'bg-amber-600'
    },
    {
      id: 'IN PROGRESS',
      title: 'In Production',
      badgeClass: 'bg-rose-50 text-rose-900 border-rose-200',
      dotColor: 'bg-rose-800'
    },
    {
      id: 'QUALITY CHECK',
      title: 'Quality Check / Fitting',
      badgeClass: 'bg-amber-100/70 text-amber-950 border-amber-300',
      dotColor: 'bg-amber-700'
    },
    {
      id: 'COMPLETED',
      title: 'Ready for Pickup',
      badgeClass: 'bg-rose-100/80 text-rose-950 border-rose-300',
      dotColor: 'bg-rose-900'
    }
  ];

  const filteredOrders = stitchingOrders.filter(o => {
    return o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
           o.clothingType?.toLowerCase().includes(search.toLowerCase()) ||
           o.assignedTailor?.toLowerCase().includes(search.toLowerCase()) ||
           o.id?.toLowerCase().includes(search.toLowerCase());
  });

  const handleStatusMove = (orderId, newStatus) => {
    onUpdateStatus(orderId, newStatus);
    if (newStatus === 'COMPLETED') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handlePrintSheet = (order) => {
    setSelectedOrderForPrint(order);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Glossy Hero Page Header */}
      <PageHeader
        title="Bespoke Stitching & Workshop Kanban"
        subtitle="Track custom tailoring jobs, master tailor assignments, measurement fitting, and production line stages."
        icon={Scissors}
        badgeText="Stitching Studio"
        actionButton={
          <button
            onClick={onCreateStitchingOrder}
            className="btn-glossy-gold px-4 py-2.5 rounded-xl font-extrabold text-xs inline-flex items-center gap-2 shadow-lg cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>New Stitching Order</span>
          </button>
        }
      />

      {/* AI Smart Summary Card */}
      <AISmartSummary
        pageType="stitching"
        data={{ stitchingOrders, tailors }}
        onAction={(actionKey) => {
          if (actionKey === 'add_stitching') onCreateStitchingOrder();
        }}
      />

      {/* Search & View Mode Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search customer, garment, tailor, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 text-sm text-stone-800 placeholder-stone-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>Use status buttons to move items across workflow stages</span>
          </div>

          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="Kanban Board"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Workshop Views: Table View or Kanban Board */}
      {viewMode === 'table' ? (
        <div className="neat-table-container overflow-hidden">
          <div className="overflow-x-auto p-1">
            <table className="neat-table neat-table-stitching">
              <thead>
                <tr>
                  <th className="text-left w-1/5">Job Ticket # & Date</th>
                  <th className="text-left">Customer Profile</th>
                  <th className="text-left">Garment & Material Spec</th>
                  <th className="text-left">Assigned Master Tailor</th>
                  <th className="text-center">Priority Level</th>
                  <th className="text-center">Stitching Stage</th>
                  <th className="text-right">Tailoring Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="table-row-popup cursor-pointer">
                    <td className="whitespace-nowrap">
                      <div className="font-extrabold text-stone-900 text-sm tracking-tight">{order.id}</div>
                      <div className="text-[11px] font-mono text-stone-500 mt-1">Due: {order.targetDelivery || order.expectedDelivery || 'Standard'}</div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="font-extrabold text-stone-900 text-xs">{order.customerName}</div>
                      <div className="text-[11px] font-mono text-stone-500">ID: {order.customerId || 'CUST-301'}</div>
                    </td>
                    <td className="cell-wrap">
                      <div className="font-extrabold text-rose-950 text-xs">{order.clothingType}</div>
                      <div className="text-[11px] text-stone-500 font-medium truncate max-w-xs">{order.requirements || 'Custom fit'}</div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100/80 border border-stone-200/80 text-xs font-extrabold text-stone-900 shadow-2xs">
                        <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                        {order.assignedTailor || 'Unassigned'}
                      </div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider whitespace-nowrap inline-flex items-center justify-center shadow-2xs ${
                        order.priority?.includes('Rush') ? 'bg-rose-100 text-rose-950 border-rose-300' : 'bg-stone-100 text-stone-700 border-stone-200'
                      }`}>
                        {order.priority || 'Standard'}
                      </span>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusMove(order.id, e.target.value)}
                        className="px-3 py-1 rounded-xl border border-amber-400/50 bg-white text-xs font-extrabold text-stone-900 cursor-pointer focus:outline-none whitespace-nowrap shadow-2xs"
                      >
                        <option value="PENDING">PENDING ASSIGNMENT</option>
                        <option value="IN PRODUCTION">IN PRODUCTION</option>
                        <option value="QUALITY CHECK">QUALITY CHECK</option>
                        <option value="COMPLETED">READY FOR PICKUP</option>
                      </select>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end">
                        <button
                          onClick={() => setSelectedOrderForPrint(order)}
                          className="px-3.5 py-1.5 rounded-xl border border-stone-200/80 bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs transition-all shadow-2xs inline-flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5 text-rose-900" /> Ticket
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 items-start">
          {columns.map((col) => {
            const colOrders = filteredOrders.filter(o => o.status === col.id);
            return (
              <div key={col.id} className="rounded-2xl bg-stone-100/70 border border-stone-200/80 p-3.5 space-y-3 min-h-[520px]">
                {/* Column Header */}
                <div className={`px-3 py-2 rounded-xl border ${col.badgeClass} flex items-center justify-between shadow-xs`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <h3 className="font-semibold text-xs uppercase tracking-wider">{col.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/90 text-stone-800 font-semibold text-xs border border-stone-200/60 tabular-nums">
                    {colOrders.length}
                  </span>
                </div>

                {/* Order Cards */}
                <div className="space-y-3">
                  {colOrders.length === 0 ? (
                    <div className="p-6 text-center rounded-xl border border-dashed border-stone-300/80 bg-white/50 text-xs text-stone-400">
                      No orders in this stage
                    </div>
                  ) : (
                    colOrders.map((order) => (
                      <div
                        key={order.id}
                        className="stitching-card-workshop space-y-3 group"
                      >
                        {/* Top Info */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-medium text-stone-400 block font-mono">{order.id}</span>
                            <h4 className="font-semibold text-stone-900 text-sm group-hover:text-rose-900 transition-colors">
                              {order.customerName}
                            </h4>
                          </div>

                          {order.priority?.includes('Rush') && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-[10px] tracking-wide">
                              RUSH
                            </span>
                          )}
                        </div>

                        {/* Clothing Type */}
                        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 space-y-0.5">
                          <p className="text-xs font-semibold text-stone-800">{order.clothingType}</p>
                          <p className="text-xs text-stone-500 truncate">{order.requirements || 'Standard tailoring requirements'}</p>
                        </div>

                        {/* Tailor & Delivery Info */}
                        <div className="space-y-1 text-xs text-stone-600">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-stone-500">
                              <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                              Tailor:
                            </span>
                            <strong className="text-stone-800 font-medium">{order.assignedTailor || 'Unassigned'}</strong>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-stone-500">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              Delivery:
                            </span>
                            <strong className="text-stone-800 font-medium">{order.targetDelivery || order.expectedDelivery || 'Standard'}</strong>
                          </div>
                        </div>

                        {/* Action Controls & Status Advance */}
                        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedOrderForPrint(order)}
                            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-stone-900 text-xs font-medium flex items-center gap-1 transition-colors"
                            title="Print Tailor Sheet"
                          >
                            <Printer className="w-3.5 h-3.5 text-stone-500" />
                            <span>Sheet</span>
                          </button>

                          <div className="flex items-center gap-1">
                            {col.id !== 'PENDING' && (
                              <button
                                onClick={() => {
                                  const prev = col.id === 'COMPLETED' ? 'QUALITY CHECK' : col.id === 'QUALITY CHECK' ? 'IN PROGRESS' : 'PENDING';
                                  handleStatusMove(order.id, prev);
                                }}
                                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs font-medium text-stone-700 transition-colors flex items-center"
                                title="Move Previous Stage"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {col.id !== 'COMPLETED' && (
                              <button
                                onClick={() => {
                                  const next = col.id === 'PENDING' ? 'IN PROGRESS' : col.id === 'IN PROGRESS' ? 'QUALITY CHECK' : 'COMPLETED';
                                  handleStatusMove(order.id, next);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-rose-900 hover:bg-rose-950 text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-1"
                              >
                                <span>Next</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Tailor Sheet Modal */}
      {selectedOrderForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl space-y-5 border border-stone-200" id="printable-sheet">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Tailoring Worksheet</h2>
                <p className="text-xs text-stone-500 font-mono mt-0.5">Worksheet Order #{selectedOrderForPrint.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrderForPrint(null)}
                className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-stone-800">
              <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div>
                  <span className="text-stone-500 block">Customer</span>
                  <strong className="text-stone-900 text-sm">{selectedOrderForPrint.customerName}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Assigned Tailor</span>
                  <strong className="text-stone-900 text-sm">{selectedOrderForPrint.assignedTailor}</strong>
                </div>
                <div className="pt-2">
                  <span className="text-stone-500 block">Garment Type</span>
                  <strong className="text-stone-900 text-sm">{selectedOrderForPrint.clothingType}</strong>
                </div>
                <div className="pt-2">
                  <span className="text-stone-500 block">Target Delivery</span>
                  <strong className="text-stone-900 text-sm">{selectedOrderForPrint.expectedDelivery}</strong>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs">
                <span className="text-stone-500 font-semibold uppercase tracking-wider block mb-1">Stitching & Cut Specifications:</span>
                <p className="text-stone-800 text-sm leading-relaxed">{selectedOrderForPrint.requirements || 'Standard tailoring requirements'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrderForPrint(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-medium text-sm transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-medium text-sm transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Print Worksheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

