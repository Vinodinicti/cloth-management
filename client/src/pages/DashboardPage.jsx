import React from 'react';
import {
  ShoppingBag,
  Layers,
  AlertTriangle,
  Scissors,
  CheckCircle,
  ClipboardList,
  DollarSign,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  PackageCheck,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import AnimatedCounter from '../components/common/AnimatedCounter';
import AISmartSummary from '../components/common/AISmartSummary';
import PageHeader from '../components/common/PageHeader';

const CHART_COLORS = ['#881337', '#D97706', '#9A3412', '#7E22CE', '#BE123C'];

export default function DashboardPage({
  stats,
  stock = [],
  products = [],
  customers = [],
  stitchingOrders = [],
  orders = [],
  onQuickAction,
  onNavigateTab
}) {
  const kpis = stats?.kpis || {
    totalProducts: 8,
    totalStockUnits: 467,
    lowStockItems: 3,
    pendingStitching: 3,
    completedStitching: 1,
    pendingOrders: 2,
    completedOrders: 2,
    totalRevenue: 42200
  };

  const categoryChartData = stats?.categoryChartData || [
    { name: 'Fabrics', value: 395 },
    { name: 'Lining', value: 240 },
    { name: 'Suiting', value: 60 },
    { name: 'Accessories', value: 12 }
  ];

  const stitchingChartData = stats?.stitchingChartData || [
    { name: 'Pending', count: 1 },
    { name: 'In Progress', count: 1 },
    { name: 'Quality Check', count: 1 },
    { name: 'Completed', count: 1 }
  ];

  const revenueTrendData = [
    { month: 'Apr', sales: 18000, stitching: 6200 },
    { month: 'May', sales: 24000, stitching: 8400 },
    { month: 'Jun', sales: 31000, stitching: 9100 },
    { month: 'Jul', sales: 28000, stitching: 10500 },
    { month: 'Aug', sales: 38000, stitching: 12300 },
    { month: 'Sep', sales: 42200, stitching: 14800 }
  ];

  const cardStats = [
    {
      title: 'Total Products',
      value: kpis.totalProducts,
      suffix: ' Items',
      icon: ShoppingBag,
      badge: '+12% this month',
      tab: 'products'
    },
    {
      title: 'Total Stock Units',
      value: kpis.totalStockUnits,
      suffix: ' Meters/Pcs',
      icon: Layers,
      badge: '92% Capacity',
      tab: 'stock'
    },
    {
      title: 'Low Stock Alerts',
      value: kpis.lowStockItems,
      suffix: ' Action Needed',
      icon: AlertTriangle,
      badge: 'Urgent Reorder',
      tab: 'stock',
      alert: true
    },
    {
      title: 'Pending Stitching',
      value: kpis.pendingStitching,
      suffix: ' Active Jobs',
      icon: Scissors,
      badge: 'In Production',
      tab: 'stitching'
    },
    {
      title: 'Completed Stitching',
      value: kpis.completedStitching,
      suffix: ' Ready Garments',
      icon: CheckCircle,
      badge: 'Ready for Fitting',
      tab: 'stitching'
    },
    {
      title: 'Pending Orders',
      value: kpis.pendingOrders,
      suffix: ' Invoices',
      icon: ClipboardList,
      badge: 'Processing',
      tab: 'orders'
    },
    {
      title: 'Completed Orders',
      value: kpis.completedOrders,
      suffix: ' Delivered',
      icon: PackageCheck,
      badge: 'Fulfilled',
      tab: 'orders'
    },
    {
      title: 'Total Sales Revenue',
      value: kpis.totalRevenue,
      prefix: '₹',
      icon: DollarSign,
      badge: 'Gross Revenue',
      tab: 'orders'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Glossy Hero Page Header */}
      <PageHeader
        title="Boutique Dashboard & Intelligence"
        subtitle={`Studio Operations Telemetry: You have ${kpis.pendingStitching} pending tailoring jobs and ${kpis.lowStockItems} low stock warnings active today.`}
        icon={Activity}
        badgeText="Live Intelligence"
        actionButton={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onQuickAction('stitching')}
              className="px-4 py-2.5 rounded-xl btn-glossy-gold font-extrabold text-xs shadow-lg flex items-center gap-2 transition-transform cursor-pointer"
            >
              <Scissors className="w-4 h-4 text-white" />
              <span>New Stitch Order</span>
            </button>
            <button
              onClick={() => onQuickAction('order')}
              className="px-4 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-amber-200 font-extrabold text-xs border border-amber-400/40 shadow-xs flex items-center gap-2 transition-colors cursor-pointer backdrop-blur-xs"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>New Sales Invoice</span>
            </button>
          </div>
        }
      />

      {/* AI Smart Summary Card */}
      <AISmartSummary
        pageType="dashboard"
        data={{ stock, products, customers, stitchingOrders, orders, stats }}
        onAction={(tab) => onNavigateTab(tab)}
      />

      {/* 8 KPI Cards Grid aligned in 2x2 on Mobile & 4x4 on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5">
        {cardStats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(item.tab)}
              className="kpi-card-glow bg-white p-3.5 sm:p-5 rounded-2xl cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              {/* Glossy Top Shimmer Ray */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-900 to-rose-950 text-amber-300 flex items-center justify-center border border-amber-400/30 shadow-md transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-rose-950 shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className={`text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border shadow-2xs whitespace-nowrap transition-all duration-200 group-hover:scale-105 ${
                  item.alert
                    ? 'bg-amber-100 text-amber-950 border-amber-300'
                    : 'bg-stone-100 text-stone-700 border-stone-200 group-hover:border-amber-400/40 group-hover:bg-amber-400/20 group-hover:text-amber-900'
                }`}>
                  {item.badge}
                </span>
              </div>

              <div className="mt-3 sm:mt-4">
                <p className="text-[10px] sm:text-[11px] font-extrabold text-stone-500 uppercase tracking-wider group-hover:text-rose-900 transition-colors truncate">{item.title}</p>
                <div className="text-xl sm:text-2.5xl font-black text-stone-900 mt-0.5 sm:mt-1 flex items-baseline gap-1 tabular-nums tracking-tight group-hover:text-amber-700 transition-colors">
                  <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix ? '' : ''} />
                  {item.suffix && <span className="text-[10px] sm:text-xs font-semibold text-stone-500 truncate">{item.suffix}</span>}
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-amber-400/20 flex items-center justify-between text-[11px] sm:text-xs font-extrabold text-stone-500 group-hover:text-rose-900 transition-colors">
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 group-hover:text-amber-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Stock Distribution */}
        <div className="chart-card-glass space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Fabric Stock Distribution</h3>
              <p className="text-xs text-stone-500 font-normal">Meters/units available by category</p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-stone-50 text-stone-700 font-semibold text-[11px] border border-stone-200">
              Live Data
            </span>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E7E5E4', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100">
            {categoryChartData.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
                <span className="truncate">{cat.name}: <strong className="text-stone-900 font-semibold tabular-nums">{cat.value}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Stitching Status Breakdown */}
        <div className="chart-card-glass space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Stitching Pipeline Status</h3>
              <p className="text-xs text-stone-500 font-normal">Active tailoring jobs per workflow stage</p>
            </div>
            <button
              onClick={() => onNavigateTab('stitching')}
              className="text-xs font-semibold text-rose-900 hover:text-rose-950 hover:underline"
            >
              Open Kanban
            </button>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stitchingChartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E7E5E4', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#881337" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between text-xs text-stone-700 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>Average Tailoring Turnaround: 3 Days</span>
            </div>
            <span className="font-semibold text-rose-900">Optimal</span>
          </div>
        </div>

        {/* Revenue & Growth Trend */}
        <div className="chart-card-glass space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Monthly Revenue Trend</h3>
              <p className="text-xs text-stone-500 font-normal">Sales vs Stitching Service Income</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-900 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4%
            </div>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#881337" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#881337" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E7E5E4', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#881337" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between text-xs text-stone-700 font-medium">
            <span>September Target Progress</span>
            <span className="font-bold text-stone-900 tabular-nums">₹42,200 / 50,000 (84%)</span>
          </div>
        </div>
      </div>

      {/* Reorder Alerts & Store Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">Low Stock & Reorder Alerts</h3>
                <p className="text-xs text-stone-500 font-normal">Fabrics requiring immediate supplier reorder</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('stock')}
              className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 font-medium text-xs text-stone-700 transition-colors"
            >
              Manage Inventory
            </button>
          </div>

          <div className="space-y-2.5">
            {(stats?.lowStockAlerts || [
              { id: 'STK-102', fabricName: 'Organic Chanderi Cotton', quantity: 18, reorderLevel: 30, unit: 'Meters', supplier: 'MP Textile Hub' },
              { id: 'STK-103', fabricName: 'Italian Poly-Wool Suit Fabric', quantity: 0, reorderLevel: 15, unit: 'Meters', supplier: 'Milano Fabrics Export' },
              { id: 'STK-105', fabricName: 'Gold Zari Thread Spools', quantity: 12, reorderLevel: 20, unit: 'Pcs', supplier: 'Zari Craft India' }
            ]).map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">{alert.fabricName}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Supplier: {alert.supplier}</p>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${alert.quantity === 0 ? 'bg-rose-100 text-rose-950 border-rose-300' : 'bg-amber-50 text-amber-900 border-amber-200'}`}>
                    {alert.quantity === 0 ? 'Out of Stock (0)' : `Low: ${alert.quantity} ${alert.unit}`}
                  </span>
                  <p className="text-[11px] text-stone-400 mt-0.5">Limit: {alert.reorderLevel} {alert.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Log */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base">Recent Studio Activity Log</h3>
            <span className="text-xs text-stone-500 font-normal">Real-time telemetry</span>
          </div>

          <div className="space-y-2.5">
            {(stats?.recentActivities || [
              { id: '1', time: '10 mins ago', text: 'New stitching order #STITCH-1001 created for Ananya Sharma', type: 'stitching' },
              { id: '2', time: '35 mins ago', text: 'Stock updated: Banarasi Raw Silk Roll (+25 meters added)', type: 'stock' },
              { id: '3', time: '2 hours ago', text: 'Order #ORD-8803 payment confirmed via NetBanking (INR 8,600)', type: 'payment' },
              { id: '4', time: '4 hours ago', text: 'Master Ramesh updated #STITCH-1002 status to IN PROGRESS', type: 'stitching' }
            ]).map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-900 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5 font-medium shadow-xs">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-stone-900 leading-snug">{act.text}</p>
                  <span className="text-[11px] text-stone-400 block mt-0.5">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

