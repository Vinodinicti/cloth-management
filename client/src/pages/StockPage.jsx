import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PlusCircle,
  MinusCircle,
  Edit2,
  Trash2,
  List,
  LayoutGrid
} from 'lucide-react';
import AISmartSummary from '../components/common/AISmartSummary';
import PageHeader from '../components/common/PageHeader';

export default function StockPage({ stock = [], activeRole = 'Administrator (Owner)', onAddStock, onEditStock, onDeleteStock, onAdjustStock }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('table');

  const canEditStock = activeRole === 'Administrator (Owner)' || activeRole === 'Boutique Store Manager';

  const filteredStock = stock.filter(item => {
    const matchesSearch = item.fabricName?.toLowerCase().includes(search.toLowerCase()) ||
                          item.color?.toLowerCase().includes(search.toLowerCase()) ||
                          item.supplier?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['All', 'Fabrics', 'Lining', 'Suiting', 'Accessories'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const totalItems = stock.length;
  const availableStock = stock.filter(s => s.status === 'In Stock').length;
  const lowStock = stock.filter(s => s.status === 'Low Stock').length;
  const outOfStock = stock.filter(s => s.status === 'Out of Stock').length;

  return (
    <div className="space-y-6">
      {/* Glossy Hero Page Header */}
      <PageHeader
        title="Stock & Fabric Inventory"
        subtitle="Monitor raw fabric rolls, thread spools, linings, and reorder levels."
        icon={Layers}
        badgeText="Inventory Vault"
        actionButton={
          <button
            onClick={canEditStock ? onAddStock : undefined}
            disabled={!canEditStock}
            title={canEditStock ? "Add new fabric stock item" : "Restricted: Master Tailor Staff cannot edit stock"}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
              canEditStock ? 'btn-glossy-gold shadow-lg cursor-pointer' : 'bg-stone-800 text-stone-400 border border-stone-700 cursor-not-allowed opacity-70'
            }`}
          >
            <Plus className={`w-4 h-4 ${canEditStock ? 'text-white' : 'text-stone-400'}`} />
            <span>Add New Stock / Fabric</span>
          </button>
        }
      />

      {/* AI Smart Summary Card */}
      <AISmartSummary
        pageType="stock"
        data={{ stock }}
        onAction={(actionKey) => {
          if (actionKey === 'add_stock' && canEditStock) onAddStock();
        }}
      />

      {/* 4 Summary Counter Cards with Vault Animation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4.5">
        <div className="stock-vault-card group flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold text-stone-500 uppercase tracking-widest group-hover:text-rose-900 transition-colors">Total Stock SKUs</p>
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs border border-stone-200 group-hover:bg-rose-900 group-hover:text-amber-300 transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2.5xl font-black text-stone-900 mt-2.5 tabular-nums tracking-tight group-hover:text-amber-700 transition-colors">
            {totalItems} <span className="text-xs font-bold text-stone-500">Active SKUs</span>
          </h3>
        </div>

        <div className="stock-vault-card group flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold text-stone-500 uppercase tracking-widest group-hover:text-rose-900 transition-colors">Available Stock</p>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-900 flex items-center justify-center font-bold text-xs border border-rose-200 group-hover:bg-rose-900 group-hover:text-amber-300 transition-colors">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2.5xl font-black text-stone-900 mt-2.5 tabular-nums tracking-tight group-hover:text-amber-700 transition-colors">
            {availableStock} <span className="text-xs font-bold text-rose-900">Healthy</span>
          </h3>
        </div>

        <div className="stock-vault-card group flex flex-col justify-between border-amber-400/40 bg-gradient-to-br from-amber-50/70 via-amber-50/30 to-white">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold text-amber-900 uppercase tracking-widest">Low Stock Warnings</p>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs border border-amber-300 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <h3 className="text-2.5xl font-black text-amber-950 mt-2.5 tabular-nums tracking-tight">
            {lowStock} <span className="text-xs font-bold text-amber-800">Reorder Needed</span>
          </h3>
        </div>

        <div className="stock-vault-card group flex flex-col justify-between border-rose-400/40 bg-gradient-to-br from-rose-50/80 via-rose-50/40 to-white">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold text-rose-900 uppercase tracking-widest">Out of Stock</p>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-xs border border-rose-300">
              <XCircle className="w-4 h-4 text-rose-700" />
            </div>
          </div>
          <h3 className="text-2.5xl font-black text-rose-950 mt-2.5 tabular-nums tracking-tight">
            {outOfStock} <span className="text-xs font-bold text-rose-800">Replenish Now</span>
          </h3>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-amber-400/25 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search fabric name, color, supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 text-xs font-medium text-stone-900 placeholder:text-stone-400 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 cursor-pointer"
          >
            {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
          </select>

          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Neat Stock Data Table */}
      {viewMode === 'table' ? (
        <div className="neat-table-container overflow-hidden">
          <div className="overflow-x-auto p-1">
            <table className="neat-table neat-table-stock">
              <thead>
                <tr>
                  <th className="text-left w-1/4">Fabric & Material Ref</th>
                  <th className="text-center">Category</th>
                  <th className="text-left">Shade & Spec</th>
                  <th className="text-right">Quantity Balance</th>
                  <th className="text-center">Inventory Status</th>
                  <th className="text-right">Unit Cost / Retail</th>
                  <th className="text-center">Stock Control</th>
                  <th className="text-right">Vault Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.map((item) => (
                  <tr key={item.id} className="table-row-popup cursor-pointer">
                    <td className="cell-wrap">
                      <div className="font-extrabold text-stone-900 text-sm tracking-tight">{item.fabricName}</div>
                      <div className="text-[11px] font-mono text-stone-500 mt-1 flex items-center gap-1">ID: {item.id} • {item.supplier}</div>
                    </td>
                    <td className="text-center">
                      <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 font-extrabold text-[11px] border border-stone-200 shadow-2xs whitespace-nowrap">
                        {item.category}
                      </span>
                    </td>
                    <td>
                      <div className="text-stone-900 font-extrabold text-xs whitespace-nowrap">{item.color}</div>
                      <div className="text-[11px] text-stone-500 font-semibold mt-0.5 whitespace-nowrap">{item.size}</div>
                    </td>
                    <td className="text-right tabular-nums whitespace-nowrap">
                      <div className="font-black text-stone-900 text-sm">{item.quantity} <span className="text-[11px] font-bold text-stone-500">{item.unit || 'Meters'}</span></div>
                    </td>
                    <td className="text-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-black border tracking-wide whitespace-nowrap inline-flex items-center justify-center ${
                        item.status === 'In Stock' ? 'bg-rose-50 text-rose-950 border-rose-200 shadow-2xs' :
                        item.status === 'Low Stock' ? 'bg-amber-50 text-amber-950 border-amber-300 shadow-2xs' :
                        'bg-rose-100 text-rose-950 border-rose-300 shadow-xs'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-right tabular-nums whitespace-nowrap">
                      <div className="font-black text-stone-900 text-xs">₹{item.unitCost?.toLocaleString()}</div>
                      <div className="text-[11px] font-semibold text-stone-500 mt-0.5">Retail: ₹{item.retailPrice?.toLocaleString()}</div>
                    </td>
                    <td className="text-center">
                      <div className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100/80 border border-stone-200/80 shadow-2xs">
                        <button
                          onClick={canEditStock ? () => onAdjustStock(item.id, -10) : undefined}
                          disabled={!canEditStock}
                          title={canEditStock ? "Stock Out (-10)" : "Restricted to Store Manager / Admin"}
                          className={`p-1 rounded-lg transition-colors ${
                            canEditStock ? 'hover:bg-rose-200 text-rose-900 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <MinusCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={canEditStock ? () => onAdjustStock(item.id, 10) : undefined}
                          disabled={!canEditStock}
                          title={canEditStock ? "Stock In (+10)" : "Restricted to Store Manager / Admin"}
                          className={`p-1 rounded-lg transition-colors ${
                            canEditStock ? 'hover:bg-amber-200 text-amber-900 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="inline-flex items-center justify-end gap-1 p-1 rounded-xl bg-stone-100/70 border border-stone-200/70">
                        <button
                          onClick={canEditStock ? () => onEditStock(item) : undefined}
                          disabled={!canEditStock}
                          className={`p-1.5 rounded-lg transition-all ${
                            canEditStock ? 'hover:bg-white text-stone-700 hover:text-stone-900 shadow-2xs cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                          }`}
                          title={canEditStock ? "Edit SKU" : "Restricted to Store Manager / Admin"}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={canEditStock ? () => onDeleteStock(item.id) : undefined}
                          disabled={!canEditStock}
                          className={`p-1.5 rounded-lg transition-all ${
                            canEditStock ? 'hover:bg-rose-100 text-rose-800 shadow-2xs cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                          }`}
                          title={canEditStock ? "Delete SKU" : "Restricted to Store Manager / Admin"}
                        >
                          <Trash2 className="w-4 h-4" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStock.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200">
                    {item.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                    item.status === 'In Stock' ? 'bg-rose-50 text-rose-900 border-rose-200' :
                    item.status === 'Low Stock' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-rose-100 text-rose-950 border-rose-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="font-semibold text-stone-900 text-base mt-2.5">{item.fabricName}</h3>
                <p className="text-xs text-stone-500 mt-0.5">Supplier: {item.supplier}</p>

                <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5 text-xs text-stone-700">
                  <div className="flex justify-between"><span>Color & Spec:</span> <strong className="text-stone-900">{item.color} ({item.size})</strong></div>
                  <div className="flex justify-between"><span>In Stock:</span> <strong className="text-stone-900 tabular-nums">{item.quantity} {item.unit}</strong></div>
                  <div className="flex justify-between"><span>Reorder Limit:</span> <strong className="text-stone-900 tabular-nums">{item.reorderLevel} {item.unit}</strong></div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={canEditStock ? () => onAdjustStock(item.id, -10) : undefined}
                    disabled={!canEditStock}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${canEditStock ? 'bg-rose-50 text-rose-900 hover:bg-rose-100' : 'bg-stone-100 text-stone-300 cursor-not-allowed'}`}
                  >
                    -10
                  </button>
                  <button
                    onClick={canEditStock ? () => onAdjustStock(item.id, 10) : undefined}
                    disabled={!canEditStock}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${canEditStock ? 'bg-stone-100 text-stone-800 hover:bg-stone-200' : 'bg-stone-100 text-stone-300 cursor-not-allowed'}`}
                  >
                    +10
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={canEditStock ? () => onEditStock(item) : undefined}
                    disabled={!canEditStock}
                    className={`p-1.5 rounded-lg ${canEditStock ? 'hover:bg-stone-100 text-stone-600' : 'text-stone-300 cursor-not-allowed'}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={canEditStock ? () => onDeleteStock(item.id) : undefined}
                    disabled={!canEditStock}
                    className={`p-1.5 rounded-lg ${canEditStock ? 'hover:bg-rose-50 text-rose-700' : 'text-stone-300 cursor-not-allowed'}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

