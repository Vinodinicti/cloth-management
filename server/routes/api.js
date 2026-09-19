import express from 'express';
import {
  sampleProducts,
  sampleStock,
  sampleCustomers,
  sampleStitchingOrders,
  sampleOrders,
  sampleActivities,
  sampleTailors
} from '../data/sampleData.js';

const router = express.Router();

// In-Memory Data Store (Works out-of-the-box, can sync with MongoDB when connected)
let db = {
  products: [...sampleProducts],
  stock: [...sampleStock],
  customers: [...sampleCustomers],
  stitching: [...sampleStitchingOrders],
  orders: [...sampleOrders],
  activities: [...sampleActivities],
  tailors: [...sampleTailors],
  system: {
    dbConnected: false,
    version: "2.4.0-pro",
    activeRole: "Administrator (Owner)",
    lastBackup: new Date().toISOString()
  }
};

// ---------------- DASHBOARD & STATS ----------------
router.get('/stats', (req, res) => {
  const totalProducts = db.products.length;
  const totalStockUnits = db.stock.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
  const lowStockItems = db.stock.filter(s => s.quantity > 0 && s.quantity <= s.reorderLevel).length +
                        db.stock.filter(s => s.quantity === 0).length;
  const pendingStitching = db.stitching.filter(s => s.status === 'PENDING' || s.status === 'IN PROGRESS' || s.status === 'QUALITY CHECK').length;
  const completedStitching = db.stitching.filter(s => s.status === 'COMPLETED').length;
  const pendingOrders = db.orders.filter(o => o.orderStatus === 'New' || o.orderStatus === 'Processing').length;
  const completedOrders = db.orders.filter(o => o.orderStatus === 'Ready' || o.orderStatus === 'Delivered').length;
  const totalRevenue = db.orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  // Category chart distribution
  const stockByCategory = {};
  db.stock.forEach(item => {
    stockByCategory[item.category] = (stockByCategory[item.category] || 0) + item.quantity;
  });

  const categoryChartData = Object.keys(stockByCategory).map(cat => ({
    name: cat,
    value: stockByCategory[cat]
  }));

  // Stitching status chart data
  const stitchingChartData = [
    { name: 'Pending', count: db.stitching.filter(s => s.status === 'PENDING').length },
    { name: 'In Progress', count: db.stitching.filter(s => s.status === 'IN PROGRESS').length },
    { name: 'Quality Check', count: db.stitching.filter(s => s.status === 'QUALITY CHECK').length },
    { name: 'Completed', count: db.stitching.filter(s => s.status === 'COMPLETED').length }
  ];

  // Order status chart data
  const orderChartData = [
    { name: 'New', count: db.orders.filter(o => o.orderStatus === 'New').length },
    { name: 'Processing', count: db.orders.filter(o => o.orderStatus === 'Processing').length },
    { name: 'Ready', count: db.orders.filter(o => o.orderStatus === 'Ready').length },
    { name: 'Delivered', count: db.orders.filter(o => o.orderStatus === 'Delivered').length }
  ];

  const lowStockAlerts = db.stock.filter(s => s.quantity <= s.reorderLevel);

  res.json({
    kpis: {
      totalProducts,
      totalStockUnits,
      lowStockItems,
      pendingStitching,
      completedStitching,
      pendingOrders,
      completedOrders,
      totalRevenue
    },
    categoryChartData,
    stitchingChartData,
    orderChartData,
    recentOrders: db.orders.slice(0, 5),
    recentActivities: db.activities,
    lowStockAlerts
  });
});

// ---------------- PRODUCTS ----------------
router.get('/products', (req, res) => res.json(db.products));

router.post('/products', (req, res) => {
  const newProduct = {
    id: `PROD-${String(db.products.length + 1).padStart(3, '0')}`,
    ...req.body,
    status: req.body.availableQty > 10 ? 'In Stock' : (req.body.availableQty > 0 ? 'Low Stock' : 'Out of Stock')
  };
  db.products.unshift(newProduct);
  db.activities.unshift({
    id: `ACT-${Date.now()}`,
    time: 'Just now',
    text: `New product added: ${newProduct.name} (₹${newProduct.price})`,
    icon: 'package',
    type: 'product'
  });
  res.status(201).json(newProduct);
});

router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.products.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.products[idx] = { ...db.products[idx], ...req.body };
    return res.json(db.products[idx]);
  }
  res.status(404).json({ error: 'Product not found' });
});

router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.products = db.products.filter(p => p.id !== id);
  res.json({ success: true, message: `Product ${id} deleted` });
});

// ---------------- STOCK ----------------
router.get('/stock', (req, res) => res.json(db.stock));

router.post('/stock', (req, res) => {
  const newStock = {
    id: `STK-${String(db.stock.length + 101)}`,
    ...req.body,
    status: req.body.quantity > req.body.reorderLevel ? 'In Stock' : (req.body.quantity > 0 ? 'Low Stock' : 'Out of Stock')
  };
  db.stock.unshift(newStock);
  db.activities.unshift({
    id: `ACT-${Date.now()}`,
    time: 'Just now',
    text: `Stock added: ${newStock.fabricName} (${newStock.quantity} ${newStock.unit || 'Pcs'})`,
    icon: 'package',
    type: 'stock'
  });
  res.status(201).json(newStock);
});

router.put('/stock/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.stock.findIndex(s => s.id === id);
  if (idx !== -1) {
    db.stock[idx] = { ...db.stock[idx], ...req.body };
    db.stock[idx].status = db.stock[idx].quantity > db.stock[idx].reorderLevel ? 'In Stock' : (db.stock[idx].quantity > 0 ? 'Low Stock' : 'Out of Stock');
    return res.json(db.stock[idx]);
  }
  res.status(404).json({ error: 'Stock item not found' });
});

router.post('/stock/:id/adjust', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body; // Positive for stock-in, negative for stock-out
  const idx = db.stock.findIndex(s => s.id === id);
  if (idx !== -1) {
    db.stock[idx].quantity = Math.max(0, db.stock[idx].quantity + amount);
    db.stock[idx].status = db.stock[idx].quantity > db.stock[idx].reorderLevel ? 'In Stock' : (db.stock[idx].quantity > 0 ? 'Low Stock' : 'Out of Stock');
    db.activities.unshift({
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      text: `Stock adjusted for ${db.stock[idx].fabricName}: ${amount > 0 ? '+' : ''}${amount} ${db.stock[idx].unit || 'Pcs'}`,
      icon: 'package',
      type: 'stock'
    });
    return res.json(db.stock[idx]);
  }
  res.status(404).json({ error: 'Stock item not found' });
});

router.delete('/stock/:id', (req, res) => {
  const { id } = req.params;
  db.stock = db.stock.filter(s => s.id !== id);
  res.json({ success: true, message: `Stock ${id} deleted` });
});

// ---------------- CUSTOMERS ----------------
router.get('/customers', (req, res) => res.json(db.customers));

router.post('/customers', (req, res) => {
  const nameParts = (req.body.name || 'New Customer').trim().split(' ');
  const initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() : nameParts[0].substring(0, 2).toUpperCase();

  const newCustomer = {
    id: `CUST-${String(db.customers.length + 505)}`,
    avatar: initials,
    totalOrders: 0,
    totalSpent: 0,
    status: req.body.status || 'New',
    measurements: req.body.measurements || {},
    ...req.body
  };
  db.customers.unshift(newCustomer);
  db.activities.unshift({
    id: `ACT-${Date.now()}`,
    time: 'Just now',
    text: `New customer registered: ${newCustomer.name}`,
    icon: 'user',
    type: 'customer'
  });
  res.status(201).json(newCustomer);
});

router.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.customers.findIndex(c => c.id === id);
  if (idx !== -1) {
    db.customers[idx] = { ...db.customers[idx], ...req.body };
    return res.json(db.customers[idx]);
  }
  res.status(404).json({ error: 'Customer not found' });
});

router.delete('/customers/:id', (req, res) => {
  const { id } = req.params;
  db.customers = db.customers.filter(c => c.id !== id);
  res.json({ success: true, message: `Customer ${id} deleted` });
});

// ---------------- STITCHING ORDERS ----------------
router.get('/stitching', (req, res) => res.json(db.stitching));
router.get('/tailors', (req, res) => res.json(db.tailors));

router.post('/stitching', (req, res) => {
  const newStitching = {
    id: `STITCH-${String(db.stitching.length + 1005)}`,
    orderDate: new Date().toISOString().split('T')[0],
    status: 'PENDING',
    priority: req.body.priority || 'Normal',
    ...req.body
  };
  db.stitching.unshift(newStitching);
  db.activities.unshift({
    id: `ACT-${Date.now()}`,
    time: 'Just now',
    text: `New stitching order #${newStitching.id} assigned to ${newStitching.assignedTailor || 'Tailor'}`,
    icon: 'scissors',
    type: 'stitching'
  });
  res.status(201).json(newStitching);
});

router.put('/stitching/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const idx = db.stitching.findIndex(s => s.id === id);
  if (idx !== -1) {
    db.stitching[idx].status = status;
    db.activities.unshift({
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      text: `Stitching order #${id} status changed to ${status}`,
      icon: 'scissors',
      type: 'stitching'
    });
    return res.json(db.stitching[idx]);
  }
  res.status(404).json({ error: 'Stitching order not found' });
});

router.put('/stitching/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.stitching.findIndex(s => s.id === id);
  if (idx !== -1) {
    db.stitching[idx] = { ...db.stitching[idx], ...req.body };
    return res.json(db.stitching[idx]);
  }
  res.status(404).json({ error: 'Stitching order not found' });
});

router.delete('/stitching/:id', (req, res) => {
  const { id } = req.params;
  db.stitching = db.stitching.filter(s => s.id !== id);
  res.json({ success: true, message: `Stitching order ${id} deleted` });
});

// ---------------- ORDERS ----------------
router.get('/orders', (req, res) => res.json(db.orders));

router.post('/orders', (req, res) => {
  const newOrder = {
    id: `ORD-${String(db.orders.length + 8805)}`,
    orderDate: new Date().toISOString().split('T')[0],
    orderStatus: 'New',
    paymentStatus: req.body.paymentStatus || 'Pending',
    ...req.body
  };
  db.orders.unshift(newOrder);
  db.activities.unshift({
    id: `ACT-${Date.now()}`,
    time: 'Just now',
    text: `New order #${newOrder.id} placed for ${newOrder.customerName} (₹${newOrder.totalAmount})`,
    icon: 'shopping-bag',
    type: 'order'
  });
  res.status(201).json(newOrder);
});

router.put('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;
  const idx = db.orders.findIndex(o => o.id === id);
  if (idx !== -1) {
    if (orderStatus) db.orders[idx].orderStatus = orderStatus;
    if (paymentStatus) db.orders[idx].paymentStatus = paymentStatus;
    db.activities.unshift({
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      text: `Order #${id} updated: Status = ${db.orders[idx].orderStatus}, Payment = ${db.orders[idx].paymentStatus}`,
      icon: 'check-circle',
      type: 'order'
    });
    return res.json(db.orders[idx]);
  }
  res.status(404).json({ error: 'Order not found' });
});

// ---------------- ADMIN & SYSTEM DATA TOOLS ----------------
router.get('/admin/system', (req, res) => {
  res.json(db.system);
});

router.post('/admin/seed', (req, res) => {
  db = {
    products: [...sampleProducts],
    stock: [...sampleStock],
    customers: [...sampleCustomers],
    stitching: [...sampleStitchingOrders],
    orders: [...sampleOrders],
    activities: [...sampleActivities],
    tailors: [...sampleTailors],
    system: {
      ...db.system,
      lastBackup: new Date().toISOString()
    }
  };
  res.json({ success: true, message: 'Database reset and re-seeded with sample data' });
});

router.post('/admin/reset', (req, res) => {
  db.products = [];
  db.stock = [];
  db.customers = [];
  db.stitching = [];
  db.orders = [];
  db.activities = [];
  res.json({ success: true, message: 'Database cleared' });
});

export default router;
