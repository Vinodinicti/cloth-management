import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Ruler,
  Phone,
  Mail,
  Edit2,
  Trash2,
  Scissors,
  X,
  List,
  LayoutGrid
} from 'lucide-react';
import AISmartSummary from '../components/common/AISmartSummary';
import PageHeader from '../components/common/PageHeader';

export default function CustomersPage({
  customers = [],
  activeRole = 'Administrator (Owner)',
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer,
  stitchingOrders = [],
  orders = []
}) {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const canEditCustomers = activeRole === 'Administrator (Owner)' || activeRole === 'Boutique Store Manager';

  const filteredCustomers = customers.filter(c => {
    return c.name?.toLowerCase().includes(search.toLowerCase()) ||
           c.phone?.includes(search) ||
           c.email?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Glossy Hero Page Header */}
      <PageHeader
        title="Customer Profiles & Body Measurements"
        subtitle="Bespoke client database with custom tailoring measurements, fitting notes, and order histories."
        icon={Users}
        badgeText="Client Directory"
        actionButton={
          <button
            onClick={canEditCustomers ? onAddCustomer : undefined}
            disabled={!canEditCustomers}
            title={canEditCustomers ? "Add new customer profile" : "Restricted: Master Tailor Staff cannot add customers"}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all ${
              canEditCustomers ? 'btn-glossy-gold shadow-lg cursor-pointer' : 'bg-stone-800 text-stone-400 border border-stone-700 cursor-not-allowed opacity-70'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>New Customer Profile</span>
          </button>
        }
      />

      {/* AI Smart Summary Card */}
      <AISmartSummary
        pageType="customers"
        data={{ customers, stitchingOrders, orders }}
        onAction={(actionKey) => {
          if (actionKey === 'add_customer' && canEditCustomers) onAddCustomer();
        }}
      />

      {/* Search & View Mode Bar */}
      <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search customer name, phone number, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-900 text-xs text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
            title="Grid View"
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

      {/* Customer Content: Table View or Cards Grid */}
      {viewMode === 'table' ? (
        <div className="neat-table-container overflow-hidden">
          <div className="overflow-x-auto p-1">
            <table className="neat-table neat-table-customers">
              <thead>
                <tr>
                  <th className="text-left w-1/4">Client Reference & ID</th>
                  <th className="text-left">Contact Phone & Email</th>
                  <th className="text-center">Measurement Profile</th>
                  <th className="text-center">Client Status</th>
                  <th className="text-right">Lifetime Revenue (₹)</th>
                  <th className="text-center">Active Jobs</th>
                  <th className="text-right">Client Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((cust) => {
                  const activeJobs = stitchingOrders.filter(s => s.customerName === cust.name || s.customerId === cust.id).length;
                  return (
                    <tr
                      key={cust.id}
                      className="table-row-popup cursor-pointer"
                      onClick={() => setSelectedCustomer(cust)}
                    >
                      <td className="cell-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-rose-950 text-amber-300 font-extrabold text-xs flex items-center justify-center shadow-xs border border-amber-400/30 shrink-0">
                            {cust.avatar || cust.name?.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-extrabold text-stone-900 text-sm tracking-tight">{cust.name}</div>
                            <div className="text-[11px] font-mono text-stone-500 mt-0.5">ID: {cust.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="text-xs font-semibold text-stone-900">{cust.phone}</div>
                        <div className="text-[11px] text-stone-500 truncate max-w-xs">{cust.email}</div>
                      </td>
                      <td className="text-center">
                        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap border shadow-2xs ${
                          cust.measurements ? 'bg-rose-50 text-rose-950 border-rose-200' : 'bg-stone-100 text-stone-600 border-stone-200'
                        }`}>
                          <Ruler className="w-3.5 h-3.5" /> {cust.measurements ? 'Saved (Active)' : 'Pending'}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap inline-flex items-center justify-center border shadow-2xs ${
                          cust.status === 'VIP' ? 'bg-amber-100 text-amber-950 border-amber-300' : 'bg-stone-100 text-stone-700 border-stone-200'
                        }`}>
                          {cust.status || 'Regular'}
                        </span>
                      </td>
                      <td className="text-right font-black text-rose-950 tabular-nums whitespace-nowrap text-sm">
                        ₹{(cust.totalSpent || 0).toLocaleString()}
                      </td>
                      <td className="text-center whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 font-extrabold text-xs border border-stone-200 shadow-2xs">
                          {activeJobs} Orders
                        </span>
                      </td>
                      <td className="text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1 p-1 rounded-xl bg-stone-100/70 border border-stone-200/70" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={canEditCustomers ? () => onEditCustomer(cust) : undefined}
                            disabled={!canEditCustomers}
                            className={`p-1.5 rounded-lg transition-colors shadow-2xs ${
                              canEditCustomers ? 'hover:bg-white text-stone-700 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                            }`}
                            title={canEditCustomers ? "Edit Customer Profile" : "Restricted to Store Manager / Admin"}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={canEditCustomers ? () => onDeleteCustomer(cust.id) : undefined}
                            disabled={!canEditCustomers}
                            className={`p-1.5 rounded-lg transition-colors shadow-2xs ${
                              canEditCustomers ? 'hover:bg-rose-100 text-rose-800 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                            }`}
                            title={canEditCustomers ? "Delete Customer Profile" : "Restricted to Store Manager / Admin"}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="customer-card-luxury p-2.5 sm:p-5 flex flex-col justify-between group cursor-pointer min-w-0 overflow-hidden"
              onClick={() => setSelectedCustomer(cust)}
            >
              <div className="min-w-0">
                {/* Card Top */}
                <div className="flex items-start justify-between gap-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-rose-900 text-amber-200 font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0">
                      {cust.avatar || cust.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-extrabold text-stone-900 text-xs sm:text-base leading-tight group-hover:text-rose-900 transition-colors truncate">
                        {cust.name}
                      </h3>
                      <p className="text-[9px] sm:text-[11px] text-stone-500 font-normal truncate">ID: {cust.id}</p>
                    </div>
                  </div>

                  <span className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-extrabold border shrink-0 ${
                    cust.status === 'VIP' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-stone-100 text-stone-700 border-stone-200'
                  }`}>
                    {cust.status || 'Regular'}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="mt-2.5 sm:mt-4 space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs text-stone-700 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{cust.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{cust.email}</span>
                  </div>
                </div>

                {/* Measurement Preview Pill */}
                <div className="mt-2.5 sm:mt-4 p-1.5 sm:p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between gap-1 text-[10px] sm:text-xs text-stone-700 min-w-0">
                  <div className="flex items-center gap-1 min-w-0 truncate">
                    <Ruler className="w-3 h-3 sm:w-4 sm:h-4 text-rose-800 shrink-0" />
                    <span className="truncate hidden sm:inline">Measurements Saved</span>
                    <span className="truncate sm:hidden">Fit Saved</span>
                  </div>
                  <span className={`text-[9px] sm:text-[11px] font-semibold px-1.5 py-0.5 rounded border shrink-0 ${
                    cust.measurements ? 'bg-rose-50 text-rose-900 border-rose-200' : 'bg-stone-100 text-stone-500 border-stone-200'
                  }`}>
                    {cust.measurements ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-1 min-w-0">
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[10px] text-stone-400 font-semibold block uppercase tracking-wider truncate">Total Spent</span>
                  <span className="font-heading text-xs sm:text-sm font-black text-stone-900 tabular-nums truncate block">₹{(cust.totalSpent || 0).toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-0.5 sm:gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={canEditCustomers ? () => onEditCustomer(cust) : undefined}
                    disabled={!canEditCustomers}
                    className={`p-1 rounded transition-colors ${
                      canEditCustomers ? 'hover:bg-stone-100 text-stone-600 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                    }`}
                    title={canEditCustomers ? "Edit Customer Profile" : "Restricted to Store Manager / Admin"}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={canEditCustomers ? () => onDeleteCustomer(cust.id) : undefined}
                    disabled={!canEditCustomers}
                    className={`p-1 rounded transition-colors ${
                      canEditCustomers ? 'hover:bg-rose-50 text-rose-700 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                    }`}
                    title={canEditCustomers ? "Delete Customer Profile" : "Restricted to Store Manager / Admin"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customer Profile Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-stone-900/50 backdrop-blur-xs">
          <div className="w-full max-w-xl h-full bg-white shadow-xl border-l border-stone-200 overflow-y-auto p-6 space-y-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-rose-900 text-amber-200 font-semibold text-base flex items-center justify-center shadow-sm">
                  {selectedCustomer.avatar || selectedCustomer.name?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-heading text-xl font-semibold text-stone-900">{selectedCustomer.name}</h2>
                  <p className="text-xs text-stone-500">{selectedCustomer.id} • {selectedCustomer.city || 'Store Customer'}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-semibold block">Phone</span>
                <p className="text-stone-900 font-semibold text-sm">{selectedCustomer.phone}</p>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-semibold block">Email</span>
                <p className="text-stone-900 font-semibold text-sm truncate">{selectedCustomer.email}</p>
              </div>
            </div>

            {/* Body Measurements Grid */}
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-rose-900" />
                  <h3 className="font-heading font-semibold text-stone-900 text-sm">Custom Tailoring Body Measurements</h3>
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-stone-200 text-stone-700">Inches (in)</span>
              </div>

              {selectedCustomer.measurements ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs">
                  {Object.entries(selectedCustomer.measurements).map(([key, val]) => {
                    if (key === 'notes') return null;
                    return (
                      <div key={key} className="p-2.5 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
                        <span className="text-[11px] text-stone-500 capitalize block">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-heading font-semibold text-stone-900 text-sm tabular-nums">{val || '—'} in</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic">No measurements recorded yet.</p>
              )}

              {selectedCustomer.measurements?.notes && (
                <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs text-stone-800">
                  <strong className="text-stone-600 font-semibold block mb-0.5">Tailor Notes & Fitting Preferences:</strong>
                  {selectedCustomer.measurements.notes}
                </div>
              )}
            </div>

            {/* Customer Active Stitching Orders */}
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-stone-900 text-sm flex items-center gap-2">
                <Scissors className="w-4 h-4 text-stone-600" />
                Active & Past Stitching Orders
              </h3>

              <div className="space-y-2">
                {stitchingOrders.filter(s => s.customerName === selectedCustomer.name || s.customerId === selectedCustomer.id).length > 0 ? (
                  stitchingOrders.filter(s => s.customerName === selectedCustomer.name || s.customerId === selectedCustomer.id).map(so => (
                    <div key={so.id} className="p-3 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between text-xs font-medium text-stone-900">
                      <div>
                        <div className="font-semibold text-stone-900 text-xs">{so.clothingType}</div>
                        <div className="text-[11px] text-stone-500">ID: {so.id} • Tailor: {so.assignedTailor}</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-stone-200 text-stone-800 text-[11px] font-semibold">
                        {so.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500 italic">No active stitching orders found for this customer.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
