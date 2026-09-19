import React from 'react';
import {
  ShieldCheck,
  Store,
  Scissors,
  CheckCircle2,
  Sliders,
  Percent,
  Clock,
  UserCheck,
  FileText,
  BadgeCheck,
  Lock,
  Check
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function AdminPage({ activeRole, onOpenRoleAuth }) {
  const roles = [
    {
      id: 'Administrator (Owner)',
      desc: 'Full access to all 7 modules, financial reports & boutique configuration',
      badge: 'SuperAdmin'
    },
    {
      id: 'Boutique Store Manager',
      desc: 'Can manage stock, fabric inventory, catalog items, orders, and customer records',
      badge: 'Manager'
    },
    {
      id: 'Master Tailor Staff',
      desc: 'Access to Stitching Kanban & Tailor Body Measurement Worksheets',
      badge: 'Tailor'
    }
  ];

  const tailorRoster = [
    { name: 'Master Ramesh Kumar', specialty: 'Suits, Tuxedos & Heavy Sherwanis', status: '3 Jobs Active', badge: 'Master Tailor' },
    { name: 'Sunita Devi', specialty: 'Silk Blouses, Bridal Lehengas & Gowns', status: '4 Jobs Active', badge: 'Senior Tailor' },
    { name: 'Akhtar Hussain', specialty: 'Chanderi Kurtis & Indo-Western Sets', status: '2 Jobs Active', badge: 'Staff Tailor' },
    { name: 'Kiran Patel', specialty: 'Custom Trousers, Shirts & Fit Alterations', status: '1 Job Active', badge: 'Staff Tailor' }
  ];

  const permissionMatrix = [
    { module: 'Stock & Fabric Inventory', superAdmin: true, manager: true, tailor: false },
    { module: 'Clothing Product Catalog', superAdmin: true, manager: true, tailor: false },
    { module: 'Customer & Measurement CRM', superAdmin: true, manager: true, tailor: true },
    { module: 'Visual Stitching Kanban Studio', superAdmin: true, manager: true, tailor: true },
    { module: 'Orders & Sales Invoices', superAdmin: true, manager: true, tailor: false },
    { module: 'Admin & Boutique Settings', superAdmin: true, manager: false, tailor: false }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Glossy Hero Page Header */}
      <PageHeader
        title="Admin Telemetry & Access Control"
        subtitle="Manage active role access, tailor workshop rosters, store settings, and module permissions."
        icon={ShieldCheck}
        badgeText="System Telemetry"
        actionButton={
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-200/80 font-medium hidden sm:inline">Boutique Edition:</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-black/30 backdrop-blur-md text-amber-300 font-bold text-xs font-mono border border-amber-400/30 shadow-xs">
              ThreadCraft PRO v2.4
            </span>
          </div>
        }
      />

      {/* Role Switching Cards */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-stone-900 text-base">Active Staff Role Login & Authentication</h3>
            <p className="text-xs text-stone-500">Click any role to authenticate with password & switch user context</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-900 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200 w-fit shadow-2xs">
            <BadgeCheck className="w-4 h-4 text-amber-700" />
            Active User: {activeRole}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {roles.map((r) => {
            const isActive = activeRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => onOpenRoleAuth(r.id)}
                className={`admin-card-cyber cursor-pointer relative p-3.5 sm:p-5 space-y-2.5 ${
                  isActive
                    ? 'bg-rose-50/80 border-rose-900 shadow-md ring-2 ring-rose-900/30'
                    : 'bg-white border-stone-200 hover:border-amber-400/60 hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-rose-950 text-amber-300'
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {r.badge}
                  </span>
                  {isActive && <CheckCircle2 className="w-4.5 h-4.5 text-rose-900" />}
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-sm">{r.id}</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed font-medium">{r.desc}</p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-rose-900 flex items-center justify-between border-t border-stone-100">
                  <span>{isActive ? 'Currently Logged In' : 'Click to Authenticate'}</span>
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Boutique Store Settings & Workshop Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Boutique Configuration Panel */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Store className="w-4 h-4 text-stone-500" />
              Store Settings & Defaults
            </h3>
            <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
              Active Profile
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 flex justify-between items-center border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-600 font-medium">
                <Sliders className="w-4 h-4 text-stone-400" />
                <span>Store Identity:</span>
              </div>
              <strong className="text-stone-900 font-semibold text-sm">ThreadCraft Couture & Atelier</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 flex justify-between items-center border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-600 font-medium">
                <Percent className="w-4 h-4 text-stone-400" />
                <span>Apparel GST Tax Bracket:</span>
              </div>
              <strong className="text-stone-900 font-semibold">5% (Ready) / 12% (Bespoke)</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 flex justify-between items-center border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-600 font-medium">
                <Clock className="w-4 h-4 text-stone-400" />
                <span>Tailoring Turnaround Target:</span>
              </div>
              <strong className="text-stone-900 font-semibold">5-7 Days (Express: 24 hrs)</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 flex justify-between items-center border border-stone-200/60">
              <div className="flex items-center gap-2 text-stone-600 font-medium">
                <FileText className="w-4 h-4 text-stone-400" />
                <span>Body Measurement System:</span>
              </div>
              <strong className="text-stone-900 font-semibold">Inches (in) & Imperial</strong>
            </div>
          </div>
        </div>

        {/* Master Tailors Workshop Roster */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Scissors className="w-4 h-4 text-rose-900" />
              Tailoring Staff Roster
            </h3>
            <span className="text-[11px] font-medium text-rose-900 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100 tabular-nums">
              4 Tailors Active
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {tailorRoster.map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="text-stone-900 font-semibold text-xs truncate">{t.name}</span>
                    <span className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 text-[10px] font-medium shrink-0">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 truncate">{t.specialty}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-[11px] font-medium shrink-0 tabular-nums">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Permission Matrix Table */}
      <div className="neat-table-container space-y-4 p-5">
        <div>
          <h3 className="font-bold text-stone-900 text-base">Module Access Control Matrix</h3>
          <p className="text-xs text-stone-500 mt-0.5">Summary of RBAC privileges by staff role</p>
        </div>

        <div className="overflow-x-auto p-1">
          <table className="neat-table neat-table-admin">
            <thead>
              <tr>
                <th className="text-left w-1/4">System & Studio Module</th>
                <th className="text-center">SuperAdmin (Atelier Owner)</th>
                <th className="text-center">Store Manager Role</th>
                <th className="text-center">Master Tailor Role</th>
                <th className="text-center">RBAC Policy Scope</th>
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((row, idx) => (
                <tr key={idx} className="table-row-popup cursor-pointer">
                  <td className="font-extrabold text-stone-900 text-xs whitespace-nowrap">{row.module}</td>
                  <td className="text-center whitespace-nowrap">
                    <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-950 border border-rose-200 text-[11px] font-extrabold whitespace-nowrap shadow-2xs">
                      <Check className="w-3.5 h-3.5 text-rose-900" /> Full Access
                    </span>
                  </td>
                  <td className="text-center whitespace-nowrap">
                    {row.manager ? (
                      <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-300 text-[11px] font-extrabold whitespace-nowrap shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-amber-700" /> Granted
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200 text-[11px] font-bold whitespace-nowrap shadow-2xs">
                        <Lock className="w-3.5 h-3.5 text-stone-400" /> Restricted
                      </span>
                    )}
                  </td>
                  <td className="text-center whitespace-nowrap">
                    {row.tailor ? (
                      <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-300 text-[11px] font-extrabold whitespace-nowrap shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-amber-700" /> Granted
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200 text-[11px] font-bold whitespace-nowrap shadow-2xs">
                        <Lock className="w-3.5 h-3.5 text-stone-400" /> Restricted
                      </span>
                    )}
                  </td>
                  <td className="text-center whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-[11px] font-extrabold whitespace-nowrap inline-flex items-center justify-center shadow-2xs">
                      {row.module.includes('Admin') || row.module.includes('Financial') ? 'High Security' : 'Standard'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

