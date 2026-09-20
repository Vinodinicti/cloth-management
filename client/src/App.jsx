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

// Sample Data Fallbacks
import {
  defaultProducts,
  defaultStock,
  defaultCustomers,
  defaultTailors,
  defaultStitchingOrders,
  defaultOrders,
  defaultStats
} from './data/sampleData';

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

  // Data Stores (Initialized with rich sample data for Vercel static & offline deployment)
  const [stats, setStats] = useState(defaultStats);
  const [products, setProducts] = useState(defaultProducts);
  const [stock, setStock] = useState(defaultStock);
  const [customers, setCustomers] = useState(defaultCustomers);
  const [stitchingOrders, setStitchingOrders] = useState(defaultStitchingOrders);
  const [orders, setOrders] = useState(defaultOrders);
  const [tailors, setTailors] = useState(defaultTailors);

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
  const handleSaveStock = (stockItem) => {
    if (editingStockItem) {
      setStock(prev => prev.map(item => item.id === editingStockItem.id ? { ...item, ...stockItem } : item));
      fetch(`/api/stock/${editingStockItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockItem)
      }).catch(() => {});
    } else {
      const newItem = {
        id: `STK-${100 + stock.length + 1}`,
        status: stockItem.quantity > (stockItem.reorderLevel || 20) ? 'In Stock' : stockItem.quantity > 0 ? 'Low Stock' : 'Out of Stock',
        ...stockItem
      };
      setStock(prev => [newItem, ...prev]);
      fetch('/api/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      }).catch(() => {});
    }
  };

  const handleAdjustStock = (id, amount) => {
    setStock(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + amount);
        const newStatus = newQty > (item.reorderLevel || 20) ? 'In Stock' : newQty > 0 ? 'Low Stock' : 'Out of Stock';
        return { ...item, quantity: newQty, status: newStatus };
      }
      return item;
    }));
    fetch(`/api/stock/${id}/adjust`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    }).catch(() => {});
  };

  const handleDeleteStock = (id) => {
    if (window.confirm('Delete this stock item?')) {
      setStock(prev => prev.filter(item => item.id !== id));
      fetch(`/api/stock/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  };

  // Product Handlers
  const handleSaveProduct = (productItem) => {
    if (editingProductItem) {
      setProducts(prev => prev.map(item => item.id === editingProductItem.id ? { ...item, ...productItem } : item));
      fetch(`/api/products/${editingProductItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productItem)
      }).catch(() => {});
    } else {
      const newItem = {
        id: `PROD-00${products.length + 1}`,
        status: 'In Stock',
        image: productItem.image || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
        ...productItem
      };
      setProducts(prev => [newItem, ...prev]);
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      }).catch(() => {});
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product from catalog?')) {
      setProducts(prev => prev.filter(item => item.id !== id));
      fetch(`/api/products/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  };

  // Customer Handlers
  const handleSaveCustomer = (custItem) => {
    if (editingCustomerItem) {
      setCustomers(prev => prev.map(item => item.id === editingCustomerItem.id ? { ...item, ...custItem } : item));
      fetch(`/api/customers/${editingCustomerItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(custItem)
      }).catch(() => {});
    } else {
      const newItem = {
        id: `CUST-50${customers.length + 1}`,
        status: 'New',
        totalOrders: 0,
        totalSpent: 0,
        avatar: custItem.name ? custItem.name.substring(0, 2).toUpperCase() : 'CS',
        ...custItem
      };
      setCustomers(prev => [newItem, ...prev]);
      fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      }).catch(() => {});
    }
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Delete customer record?')) {
      setCustomers(prev => prev.filter(item => item.id !== id));
      fetch(`/api/customers/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  };

  // Stitching Order Handlers
  const handleCreateStitchingOrder = (stitchItem) => {
    const newItem = {
      id: `STITCH-100${stitchingOrders.length + 1}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      priority: stitchItem.priority || 'Normal',
      ...stitchItem
    };
    setStitchingOrders(prev => [newItem, ...prev]);
    setStats(prev => prev ? {
      ...prev,
      kpis: {
        ...prev.kpis,
        pendingStitching: prev.kpis.pendingStitching + 1
      }
    } : prev);
    fetch('/api/stitching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).catch(() => {});
  };

  const handleUpdateStitchingStatus = (id, newStatus) => {
    setStitchingOrders(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, status: newStatus } : item);
      const pending = updated.filter(o => o.status !== 'COMPLETED').length;
      const completed = updated.filter(o => o.status === 'COMPLETED').length;
      setStats(sPrev => sPrev ? {
        ...sPrev,
        kpis: {
          ...sPrev.kpis,
          pendingStitching: pending,
          completedStitching: completed
        }
      } : sPrev);
      return updated;
    });

    fetch(`/api/stitching/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  };

  // Sales Order Handlers
  const handleCreateOrder = (orderItem) => {
    const newItem = {
      id: `ORD-880${orders.length + 1}`,
      orderDate: new Date().toISOString().split('T')[0],
      orderStatus: 'Processing',
      paymentStatus: 'Paid',
      ...orderItem
    };
    setOrders(prev => [newItem, ...prev]);
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).catch(() => {});
  };

  const handleUpdateOrderStatus = (id, newOrderStatus) => {
    setOrders(prev => prev.map(item => item.id === id ? { ...item, orderStatus: newOrderStatus } : item));
    fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus: newOrderStatus })
    }).catch(() => {});
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
