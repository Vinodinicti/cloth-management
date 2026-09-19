import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import FloatingFabricBg from './components/common/FloatingFabricBg';
import QuickActionModal from './components/common/QuickActionModal';

// Pages
import DashboardPage from './pages/DashboardPage';
import StockPage from './pages/StockPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import StitchingPage from './pages/StitchingPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';

// Modals
import StockModal from './components/modals/StockModal';
import ProductModal from './components/modals/ProductModal';
import CustomerModal from './components/modals/CustomerModal';
import StitchingModal from './components/modals/StitchingModal';
import OrderModal from './components/modals/OrderModal';
import RoleAuthModal from './components/modals/RoleAuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRole, setActiveRole] = useState('Administrator (Owner)');
  const [roleAuthModalOpen, setRoleAuthModalOpen] = useState(false);
  const [targetRoleForAuth, setTargetRoleForAuth] = useState(null);

  // Scroll to top on every page transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

  // Data Stores
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stitchingOrders, setStitchingOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tailors, setTailors] = useState([]);

  // Modal Control States
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [editingStockItem, setEditingStockItem] = useState(null);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductItem, setEditingProductItem] = useState(null);

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [editingCustomerItem, setEditingCustomerItem] = useState(null);

  const [stitchingModalOpen, setStitchingModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  // Fetch initial API data or populate fallback
  const fetchAllData = async () => {
    try {
      const resStats = await fetch('/api/stats');
      if (resStats.ok) {
        const data = await resStats.json();
        setStats(data);
      }

      const [resProd, resStock, resCust, resStitch, resOrd, resTailor] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/stock'),
        fetch('/api/customers'),
        fetch('/api/stitching'),
        fetch('/api/orders'),
        fetch('/api/tailors')
      ]);

      if (resProd.ok) setProducts(await resProd.json());
      if (resStock.ok) setStock(await resStock.json());
      if (resCust.ok) setCustomers(await resCust.json());
      if (resStitch.ok) setStitchingOrders(await resStitch.json());
      if (resOrd.ok) setOrders(await resOrd.json());
      if (resTailor.ok) setTailors(await resTailor.json());
    } catch (err) {
      console.log('Using local client state sync mode');
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Quick Action Dispatcher
  const handleSelectQuickAction = (actionId) => {
    if (actionId === 'product') {
      setEditingProductItem(null);
      setProductModalOpen(true);
    } else if (actionId === 'stock') {
      setEditingStockItem(null);
      setStockModalOpen(true);
    } else if (actionId === 'customer') {
      setEditingCustomerItem(null);
      setCustomerModalOpen(true);
    } else if (actionId === 'stitching') {
      setStitchingModalOpen(true);
    } else if (actionId === 'order') {
      setOrderModalOpen(true);
    }
  };

  // Stock Handlers
  const handleSaveStock = async (stockItem) => {
    if (editingStockItem) {
      await fetch(`/api/stock/${editingStockItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockItem)
      });
    } else {
      await fetch('/api/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockItem)
      });
    }
    fetchAllData();
  };

  const handleAdjustStock = async (id, amount) => {
    await fetch(`/api/stock/${id}/adjust`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    fetchAllData();
  };

  const handleDeleteStock = async (id) => {
    if (window.confirm('Delete this stock item?')) {
      await fetch(`/api/stock/${id}`, { method: 'DELETE' });
      fetchAllData();
    }
  };

  // Product Handlers
  const handleSaveProduct = async (productItem) => {
    if (editingProductItem) {
      await fetch(`/api/products/${editingProductItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productItem)
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productItem)
      });
    }
    fetchAllData();
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product from catalog?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchAllData();
    }
  };

  // Customer Handlers
  const handleSaveCustomer = async (custItem) => {
    if (editingCustomerItem) {
      await fetch(`/api/customers/${editingCustomerItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(custItem)
      });
    } else {
      await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(custItem)
      });
    }
    fetchAllData();
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Delete customer record?')) {
      await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      fetchAllData();
    }
  };

  // Stitching Order Handlers
  const handleCreateStitchingOrder = async (stitchItem) => {
    await fetch('/api/stitching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stitchItem)
    });
    fetchAllData();
  };

  const handleUpdateStitchingStatus = async (id, status) => {
    await fetch(`/api/stitching/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchAllData();
  };

  // Sales Order Handlers
  const handleCreateOrder = async (orderItem) => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderItem)
    });
    fetchAllData();
  };

  const handleUpdateOrderStatus = async (id, orderStatus) => {
    await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus })
    });
    fetchAllData();
  };

  // Role Auth Handlers
  const handleOpenRoleAuth = (targetRole = null) => {
    setTargetRoleForAuth(targetRole || activeRole);
    setRoleAuthModalOpen(true);
  };

  const handleRoleAuthSuccess = (newRole) => {
    setActiveRole(newRole);
    setRoleAuthModalOpen(false);
  };

  // Admin DB Tools
  const handleSeedData = async () => {
    await fetch('/api/admin/seed', { method: 'POST' });
    fetchAllData();
  };

  const handleResetData = async () => {
    await fetch('/api/admin/reset', { method: 'POST' });
    fetchAllData();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex font-sans selection:bg-rose-100 selection:text-rose-600">
      {/* Floating Animated Background Particles */}
      <FloatingFabricBg />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activeRole={activeRole}
        onOpenRoleAuth={handleOpenRoleAuth}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 z-10">
        {/* Header Bar */}
        <Header
          setMobileOpen={setMobileOpen}
          onOpenQuickAction={() => setQuickActionOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeRole={activeRole}
          onOpenRoleAuth={handleOpenRoleAuth}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 p-4 lg:p-6 w-full space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardPage
              stats={stats}
              stock={stock}
              products={products}
              customers={customers}
              stitchingOrders={stitchingOrders}
              orders={orders}
              onQuickAction={handleSelectQuickAction}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'stock' && (
            <StockPage
              stock={stock}
              activeRole={activeRole}
              onAddStock={() => {
                setEditingStockItem(null);
                setStockModalOpen(true);
              }}
              onEditStock={(item) => {
                setEditingStockItem(item);
                setStockModalOpen(true);
              }}
              onDeleteStock={handleDeleteStock}
              onAdjustStock={handleAdjustStock}
            />
          )}

          {activeTab === 'products' && (
            <ProductsPage
              products={products}
              activeRole={activeRole}
              onAddProduct={() => {
                setEditingProductItem(null);
                setProductModalOpen(true);
              }}
              onEditProduct={(item) => {
                setEditingProductItem(item);
                setProductModalOpen(true);
              }}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersPage
              customers={customers}
              stitchingOrders={stitchingOrders}
              orders={orders}
              activeRole={activeRole}
              onAddCustomer={() => {
                setEditingCustomerItem(null);
                setCustomerModalOpen(true);
              }}
              onEditCustomer={(cust) => {
                setEditingCustomerItem(cust);
                setCustomerModalOpen(true);
              }}
              onDeleteCustomer={handleDeleteCustomer}
            />
          )}

          {activeTab === 'stitching' && (
            <StitchingPage
              stitchingOrders={stitchingOrders}
              tailors={tailors}
              activeRole={activeRole}
              onCreateStitchingOrder={() => setStitchingModalOpen(true)}
              onUpdateStatus={handleUpdateStitchingStatus}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersPage
              orders={orders}
              activeRole={activeRole}
              onCreateOrder={() => setOrderModalOpen(true)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPage
              activeRole={activeRole}
              onOpenRoleAuth={handleOpenRoleAuth}
              onSeedData={handleSeedData}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <QuickActionModal
        isOpen={quickActionOpen}
        onClose={() => setQuickActionOpen(false)}
        onSelectAction={handleSelectQuickAction}
        activeRole={activeRole}
      />

      <StockModal
        isOpen={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        onSave={handleSaveStock}
        initialData={editingStockItem}
      />

      <ProductModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProductItem}
      />

      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        onSave={handleSaveCustomer}
        initialData={editingCustomerItem}
      />

      <StitchingModal
        isOpen={stitchingModalOpen}
        onClose={() => setStitchingModalOpen(false)}
        onSave={handleCreateStitchingOrder}
        customers={customers}
        tailors={tailors}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        onSave={handleCreateOrder}
        customers={customers}
        products={products}
      />

      <RoleAuthModal
        isOpen={roleAuthModalOpen}
        onClose={() => setRoleAuthModalOpen(false)}
        targetRole={targetRoleForAuth}
        onAuthenticateSuccess={handleRoleAuthSuccess}
      />
    </div>
  );
}
