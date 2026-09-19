import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Search,
  Edit2,
  Trash2,
  List,
  LayoutGrid
} from 'lucide-react';
import AISmartSummary from '../components/common/AISmartSummary';
import PageHeader from '../components/common/PageHeader';

export default function ProductsPage({ products = [], activeRole = 'Administrator (Owner)', onAddProduct, onEditProduct, onDeleteProduct }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const canEditProducts = activeRole === 'Administrator (Owner)' || activeRole === 'Boutique Store Manager';

  const categories = ['All', 'Sarees', 'Shirts', 'Pants', 'Kurtis', 'Dresses', 'Kids Wear', 'Formal Wear', 'Casual Wear'];
  const sizes = ['All', 'S (36)', 'M (38)', 'L (42)', 'XL (44)', 'Free Size'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
                          p.color?.toLowerCase().includes(search.toLowerCase()) ||
                          p.sku?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSize = selectedSize === 'All' || p.size?.includes(selectedSize.split(' ')[0]);
    return matchesSearch && matchesCategory && matchesSize;
  });

  return (
    <div className="space-y-6">
      {/* Glossy Hero Page Header */}
      <PageHeader
        title="Clothing Product Catalog"
        subtitle="Manage finished boutique apparel, designer sarees, formal suits, and ready-to-wear lines."
        icon={ShoppingBag}
        badgeText="Apparel Catalog"
        actionButton={
          <button
            onClick={canEditProducts ? onAddProduct : undefined}
            disabled={!canEditProducts}
            title={canEditProducts ? "Add new catalog product" : "Restricted: Master Tailor Staff cannot edit catalog"}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all ${
              canEditProducts ? 'btn-glossy-gold shadow-lg cursor-pointer' : 'bg-stone-800 text-stone-400 border border-stone-700 cursor-not-allowed opacity-70'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        }
      />

      {/* AI Smart Summary Card */}
      <AISmartSummary
        pageType="products"
        data={{ products }}
        onAction={(actionKey) => {
          if (actionKey === 'add_product' && canEditProducts) onAddProduct();
        }}
      />

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedCategory === cat
                ? 'bg-rose-900 text-white border-rose-900 shadow-sm'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-rose-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Size Filter Bar */}
      <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search product name, color, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-900 text-xs text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Size:</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-900"
            >
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
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
      </div>

      {/* Product List: Table View or Grid View */}
      {viewMode === 'table' ? (
        <div className="neat-table-container overflow-hidden">
          <div className="overflow-x-auto p-1">
            <table className="neat-table neat-table-products">
              <thead>
                <tr>
                  <th className="text-left w-1/3">Apparel SKU & Title</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Size / Variant</th>
                  <th className="text-right">Stock Balance</th>
                  <th className="text-right">Retail Price (₹)</th>
                  <th className="text-center">Catalog Status</th>
                  <th className="text-right">Apparel Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="table-row-popup cursor-pointer">
                    <td className="cell-wrap">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0" />
                        <div>
                          <div className="font-extrabold text-stone-900 text-sm tracking-tight">{product.name}</div>
                          <div className="text-[11px] font-mono text-stone-500 mt-0.5">SKU: {product.sku || product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 font-extrabold text-[11px] border border-stone-200 shadow-2xs whitespace-nowrap">
                        {product.category}
                      </span>
                    </td>
                    <td className="text-center font-bold text-stone-800 text-xs whitespace-nowrap">
                      {product.size || 'Free Size'}
                    </td>
                    <td className="text-right font-extrabold text-stone-900 tabular-nums whitespace-nowrap">
                      {product.availableQty} units
                    </td>
                    <td className="text-right font-black text-rose-950 tabular-nums whitespace-nowrap text-sm">
                      ₹{product.price?.toLocaleString()}
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap inline-flex items-center justify-center border shadow-2xs ${
                        product.availableQty > 10 ? 'bg-rose-50 text-rose-950 border-rose-200' : product.availableQty > 0 ? 'bg-amber-50 text-amber-950 border-amber-300' : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}>
                        {product.availableQty > 0 ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1 p-1 rounded-xl bg-stone-100/70 border border-stone-200/70" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={canEditProducts ? () => onEditProduct(product) : undefined}
                          disabled={!canEditProducts}
                          className={`p-1.5 rounded-lg transition-colors shadow-2xs ${
                            canEditProducts ? 'hover:bg-white text-stone-700 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                          }`}
                          title={canEditProducts ? "Edit Product" : "Restricted to Store Manager / Admin"}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={canEditProducts ? () => onDeleteProduct(product.id) : undefined}
                          disabled={!canEditProducts}
                          className={`p-1.5 rounded-lg transition-colors shadow-2xs ${
                            canEditProducts ? 'hover:bg-rose-100 text-rose-800 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                          }`}
                          title={canEditProducts ? "Delete Product" : "Restricted to Store Manager / Admin"}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card-3d bg-white rounded-xl p-3 sm:p-4 border border-stone-200 shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* Product Image Container */}
                <div className="relative h-36 sm:h-48 rounded-lg overflow-hidden bg-stone-100 mb-2.5 sm:mb-3 border border-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-stone-800 font-medium text-[11px] border border-stone-200 shadow-sm">
                    {product.category}
                  </span>

                  <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[11px] font-medium border ${
                    product.availableQty > 10 ? 'bg-rose-50 text-rose-900 border-rose-200' : product.availableQty > 0 ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}>
                    {product.availableQty > 0 ? `${product.availableQty} in stock` : 'Out of stock'}
                  </span>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>SKU: {product.sku || product.id}</span>
                    <span className="text-stone-700 font-medium">{product.size}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-stone-900 text-base leading-snug group-hover:text-rose-900 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">Retail Price</span>
                  <span className="font-heading text-base font-semibold text-stone-900 tabular-nums">₹{product.price?.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={canEditProducts ? () => onEditProduct(product) : undefined}
                    disabled={!canEditProducts}
                    className={`p-1.5 rounded transition-colors ${
                      canEditProducts ? 'hover:bg-stone-100 text-stone-600 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                    }`}
                    title={canEditProducts ? "Edit Product" : "Restricted to Store Manager / Admin"}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={canEditProducts ? () => onDeleteProduct(product.id) : undefined}
                    disabled={!canEditProducts}
                    className={`p-1.5 rounded transition-colors ${
                      canEditProducts ? 'hover:bg-rose-50 text-rose-700 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-50'
                    }`}
                    title={canEditProducts ? "Delete Product" : "Restricted to Store Manager / Admin"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
