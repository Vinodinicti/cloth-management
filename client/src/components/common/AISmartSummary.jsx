import React from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Bot,
  Layers,
  ShoppingBag,
  Users,
  Scissors,
  ClipboardList,
  TrendingUp
} from 'lucide-react';

export default function AISmartSummary({ pageType, data = {} }) {

  // Compute Page-Specific Metrics & Messages
  const getSummaryContent = () => {
    switch (pageType) {
      case 'dashboard': {
        const stockList = data.stock || [];
        const stitchingList = data.stitchingOrders || [];
        const orderList = data.orders || [];

        const totalStockUnits = stockList.reduce((acc, s) => acc + (s.quantity || 0), 0);
        const lowStockCount = stockList.filter(s => s.quantity <= (s.reorderLevel || 20)).length;
        const pendingStitching = stitchingList.filter(s => s.status !== 'COMPLETED').length;
        const completedOrders = orderList.filter(o => o.orderStatus === 'Delivered' || o.orderStatus === 'Ready').length;
        const attentionNeeded = orderList.filter(o => o.paymentStatus !== 'Paid' || o.orderStatus === 'New').length;

        return {
          title: "Boutique Operations Overview",
          subtitle: "Real-time AI summary of fabric inventory, tailor studio, and sales metrics.",
          cards: [
            { label: "Fabric Stock", value: `${totalStockUnits} Mtr/Pcs`, icon: Layers, status: "good" },
            { label: "Low Stock Items", value: `${lowStockCount} Reorder`, icon: AlertTriangle, status: lowStockCount > 0 ? "warning" : "good" },
            { label: "Active Tailoring", value: `${pendingStitching} In Studio`, icon: Scissors, status: "info" },
            { label: "Completed Orders", value: `${completedOrders} Delivered`, icon: CheckCircle2, status: "good" },
            { label: "Pending Payment", value: `${attentionNeeded} Invoices`, icon: Clock, status: attentionNeeded > 0 ? "warning" : "good" }
          ],
          insights: [
            lowStockCount > 0
              ? `${lowStockCount} fabric item(s) are running below reorder threshold. Replenishment recommended.`
              : "All fabric rolls and raw material stocks are at optimal operational levels.",
            `${pendingStitching} custom stitching orders currently active in the tailoring workshop.`,
            `${completedOrders} customer orders fulfilled or ready for store delivery.`
          ],
          alertStatus: lowStockCount > 0 ? "warning" : "good"
        };
      }

      case 'stock': {
        const stockList = data.stock || [];
        const totalItems = stockList.length;
        const availableStock = stockList.filter(s => s.status === 'In Stock').length;
        const lowStockItems = stockList.filter(s => s.status === 'Low Stock');
        const outOfStockItems = stockList.filter(s => s.status === 'Out of Stock');
        const totalUnits = stockList.reduce((acc, s) => acc + (s.quantity || 0), 0);

        const urgentItem = outOfStockItems[0] || lowStockItems[0];
        const urgentMessage = urgentItem
          ? `High Priority: ${urgentItem.fabricName} is low (${urgentItem.quantity} ${urgentItem.unit || 'm'} left). Supplier: ${urgentItem.supplier || 'N/A'}.`
          : "All fabric rolls, threads, and accessory inventory have healthy stock levels.";

        return {
          title: "Raw Material & Inventory Intelligence",
          subtitle: "Smart automated stock analysis for fabrics, spools, and linings.",
          cards: [
            { label: "Total SKUs", value: `${totalItems} Items`, icon: Layers, status: "info" },
            { label: "Total Volume", value: `${totalUnits} Mtr/Pcs`, icon: Layers, status: "info" },
            { label: "In Stock", value: `${availableStock} Healthy`, icon: CheckCircle2, status: "good" },
            { label: "Low Stock", value: `${lowStockItems.length} SKUs`, icon: AlertTriangle, status: lowStockItems.length > 0 ? "warning" : "good" },
            { label: "Depleted", value: `${outOfStockItems.length} Out`, icon: AlertTriangle, status: outOfStockItems.length > 0 ? "danger" : "good" }
          ],
          insights: [
            urgentMessage,
            `Healthy inventory ratio is at ${totalItems > 0 ? Math.round((availableStock / totalItems) * 100) : 100}% overall.`,
            outOfStockItems.length > 0 ? `${outOfStockItems.length} fabric SKU(s) need immediate vendor reordering.` : "No stockouts recorded across current fabric catalog."
          ],
          alertStatus: outOfStockItems.length > 0 ? "danger" : lowStockItems.length > 0 ? "warning" : "good"
        };
      }

      case 'products': {
        const prodList = data.products || [];
        const totalProducts = prodList.length;
        const inStockCount = prodList.filter(p => p.availableQty > 10).length;
        const lowStockCount = prodList.filter(p => p.availableQty > 0 && p.availableQty <= 10).length;
        const outCount = prodList.filter(p => p.availableQty === 0).length;

        const catMap = {};
        prodList.forEach(p => catMap[p.category] = (catMap[p.category] || 0) + 1);
        const topCat = Object.keys(catMap).sort((a, b) => catMap[b] - catMap[a])[0] || 'Apparel';

        return {
          title: "Boutique Product Catalog Insights",
          subtitle: "Automated breakdown of collection availability, top categories, and size readiness.",
          cards: [
            { label: "Catalog Designs", value: `${totalProducts} Items`, icon: ShoppingBag, status: "info" },
            { label: "Fully Available", value: `${inStockCount} Ready`, icon: CheckCircle2, status: "good" },
            { label: "Limited Stock", value: `${lowStockCount} Items`, icon: AlertTriangle, status: lowStockCount > 0 ? "warning" : "good" },
            { label: "Out of Stock", value: `${outCount} Depleted`, icon: AlertTriangle, status: outCount > 0 ? "danger" : "good" },
            { label: "Top Category", value: topCat, icon: Sparkles, status: "good" }
          ],
          insights: [
            outCount > 0
              ? `${outCount} retail product design(s) are completely out of stock.`
              : `All ${totalProducts} catalog apparel items are ready for customer orders.`,
            `Top performing design category in display: ${topCat}.`,
            `Active sizes: Free Size, Medium, Large, XL.`
          ],
          alertStatus: outCount > 0 ? "danger" : lowStockCount > 0 ? "warning" : "good"
        };
      }

      case 'customers': {
        const custList = data.customers || [];
        const totalCust = custList.length;
        const vipCount = custList.filter(c => c.status === 'VIP').length;
        const registeredCount = custList.filter(c => c.measurements && Object.keys(c.measurements).length > 0).length;

        return {
          title: "Client & Fitting CRM Analysis",
          subtitle: "Live summary of boutique clientele, VIP statuses, and custom measurement logs.",
          cards: [
            { label: "Registered Clients", value: `${totalCust} Clients`, icon: Users, status: "info" },
            { label: "VIP Regulars", value: `${vipCount} VIPs`, icon: Sparkles, status: "good" },
            { label: "Saved Fittings", value: `${registeredCount} Profiles`, icon: CheckCircle2, status: "good" }
          ],
          insights: [
            `${registeredCount} out of ${totalCust} clients have detailed body fitting measurements logged.`,
            `${vipCount} VIP clients contribute to recurring custom tailoring orders.`,
            "Measurement history available for quick repeat order generation."
          ],
          alertStatus: "good"
        };
      }

      case 'stitching': {
        const stitchList = data.stitchingOrders || [];
        const pending = stitchList.filter(s => s.status === 'PENDING').length;
        const inProgress = stitchList.filter(s => s.status === 'IN PROGRESS').length;
        const qc = stitchList.filter(s => s.status === 'QUALITY CHECK').length;
        const completed = stitchList.filter(s => s.status === 'COMPLETED').length;
        const rushOrders = stitchList.filter(s => s.priority?.includes('Rush') || s.priority?.includes('Express')).length;

        return {
          title: "Tailor Workshop Live Summary",
          subtitle: "Workflow progress across cutting tables, master tailors, and fitting checks.",
          cards: [
            { label: "Total Orders", value: `${stitchList.length} Jobs`, icon: Scissors, status: "info" },
            { label: "Pending Cut", value: `${pending} Orders`, icon: Clock, status: pending > 0 ? "warning" : "good" },
            { label: "In Sewing Studio", value: `${inProgress} Active`, icon: Scissors, status: "info" },
            { label: "Quality Check", value: `${qc} Inspection`, icon: Sparkles, status: "info" },
            { label: "Ready & Completed", value: `${completed} Done`, icon: CheckCircle2, status: "good" }
          ],
          insights: [
            rushOrders > 0
              ? `Priority Warning: ${rushOrders} tailoring order(s) are flagged with EXPRESS RUSH delivery.`
              : `All ${stitchList.length} workshop orders are progressing within standard delivery timelines.`,
            `${inProgress} orders currently undergoing active cutting and stitching.`,
            `${completed} completed garments ready for customer trial or final pickup.`
          ],
          alertStatus: rushOrders > 0 ? "warning" : "good"
        };
      }

      case 'orders': {
        const orderList = data.orders || [];
        const newCount = orderList.filter(o => o.orderStatus === 'New').length;
        const processingCount = orderList.filter(o => o.orderStatus === 'Processing').length;
        const readyCount = orderList.filter(o => o.orderStatus === 'Ready').length;
        const deliveredCount = orderList.filter(o => o.orderStatus === 'Delivered').length;
        const pendingPayment = orderList.filter(o => o.paymentStatus !== 'Paid').length;

        return {
          title: "Sales Invoices & Revenue Summary",
          subtitle: "Real-time tracking of invoice stages, order deliveries, and customer payments.",
          cards: [
            { label: "Total Invoices", value: `${orderList.length} Invoices`, icon: ClipboardList, status: "info" },
            { label: "New Invoices", value: `${newCount} Orders`, icon: ClipboardList, status: "info" },
            { label: "In Processing", value: `${processingCount} Active`, icon: Clock, status: "info" },
            { label: "Fulfilled / Delivered", value: `${readyCount + deliveredCount} Done`, icon: CheckCircle2, status: "good" },
            { label: "Pending Payment", value: `${pendingPayment} Invoices`, icon: AlertTriangle, status: pendingPayment > 0 ? "warning" : "good" }
          ],
          insights: [
            pendingPayment > 0
              ? `Payment Notice: ${pendingPayment} invoice(s) have unpaid or partial balance remaining.`
              : `All ${orderList.length} sales invoices are fully settled.`,
            `${newCount} newly created invoice(s) awaiting processing or tailoring dispatch.`,
            `${readyCount + deliveredCount} total customer orders completed.`
          ],
          alertStatus: pendingPayment > 0 ? "warning" : "good"
        };
      }

      default:
        return null;
    }
  };

  const summary = getSummaryContent();
  if (!summary) return null;

  return (
    <div className="w-full bg-glossy-burgundy-gold rounded-2xl p-6 md:p-7 shadow-xl relative overflow-hidden mb-6 border border-amber-400/30 text-white">
      {/* Glossy Top Shimmer Ray */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-400/20">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-rose-950 flex items-center justify-center shadow-lg shrink-0 border border-amber-200">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 border border-amber-400/40">
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> AI Smart Summary
              </span>
            </div>
            <h2 className="font-extrabold text-white text-xl tracking-tight mt-0.5 drop-shadow-sm">
              {summary.title}
            </h2>
            <p className="text-xs text-amber-100/80 font-medium">
              {summary.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards Row in 1 Single Line */}
      <div className={`grid gap-3.5 my-5 ${
        summary.cards.length === 5 
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' 
          : summary.cards.length === 4 
          ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
          : 'grid-cols-2 sm:grid-cols-3'
      }`}>
        {summary.cards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-rose-950/50 border border-amber-400/35 backdrop-blur-xs flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-inner"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-amber-200/90 uppercase tracking-wider truncate">{card.label}</span>
                <IconComp className="w-4 h-4 text-amber-400 opacity-90 shrink-0" />
              </div>
              <p className="text-lg font-black text-amber-100 mt-2.5 tracking-tight truncate">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* AI Key Insights Bullet Points */}
      <div className="bg-rose-950/70 rounded-xl p-4 md:p-5 border border-amber-400/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Key Insights & Action Items</span>
        </div>
        <ul className="space-y-2 text-xs text-amber-50">
          {summary.insights.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="text-amber-400 font-bold text-sm leading-none mt-0.5">•</span>
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



