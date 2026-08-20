import React, { useState } from 'react';
import { RouteType } from '../types';
import { BarChart3, TrendingUp, Users, Globe, Building2, ShieldCheck, Download, Award, ArrowUpRight } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (route: RouteType, param?: string) => void;
  onShowToast: (message: string, type?: 'info' | 'success') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onShowToast }) => {
  const [selectedMetricTime, setSelectedMetricTime] = useState<'30d' | '90d' | '1y'>('30d');

  const industryBreakdown = [
    { label: 'Technology & AI', percent: 42, count: '5,250', color: 'bg-blue-500' },
    { label: 'Finance & VC', percent: 22, count: '2,750', color: 'bg-teal-400' },
    { label: 'Biotech & Health', percent: 14, count: '1,750', color: 'bg-purple-400' },
    { label: 'Design & Creative', percent: 12, count: '1,500', color: 'bg-cyan-400' },
    { label: 'Consulting & Legal', percent: 10, count: '1,250', color: 'bg-amber-400' }
  ];

  const geographicNodes = [
    { city: 'San Francisco / Bay Area', alumni: '4,620', percent: '37%' },
    { city: 'New York City Metro', alumni: '2,840', percent: '23%' },
    { city: 'London & UK', alumni: '1,420', percent: '11%' },
    { city: 'Tokyo & East Asia', alumni: '980', percent: '8%' },
    { city: 'Singapore & Southeast Asia', alumni: '750', percent: '6%' },
    { city: 'Berlin & Europe Hubs', alumni: '620', percent: '5%' }
  ];

  const recentRegistrations = [
    { name: 'Dr. Evelyn Reed', role: 'Head of AI Research', org: 'NeuralTech', class: '2016', status: 'Verified' },
    { name: 'Marcus Vance', role: 'General Partner', org: 'Apex Capital', class: '2012', status: 'Verified' },
    { name: 'Elena Rostova', role: 'Staff Interaction Designer', org: 'Shopify', class: '2018', status: 'Verified' },
    { name: 'David Kim', role: 'Founding Engineer', org: 'Anthropic', class: '2020', status: 'Pending Review' }
  ];

  const exportReport = () => {
    onShowToast('Alumni network analytics report generated (CSV & PDF).', 'success');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Institutional Intelligence Suite</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            Network Analytics & Growth
          </h1>
          <p className="text-sm md:text-base text-slate-300 mt-1 max-w-2xl">
            Real-time telemetry on graduate career progression, global chapter density, and mentorship outcomes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex gap-1 text-xs">
            {(['30d', '90d', '1y'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedMetricTime(period)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedMetricTime === period
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {period.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={exportReport}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/15 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Verified Alumni</span>
            <span className="text-teal-400 font-semibold flex items-center gap-0.5">
              +14.2% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <p className="font-display font-extrabold text-3xl text-white">12,500</p>
          <p className="text-xs text-slate-400">Across 85+ countries</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/15 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Active Mentorships</span>
            <span className="text-teal-400 font-semibold flex items-center gap-0.5">
              +28.6% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <p className="font-display font-extrabold text-3xl text-teal-300">542</p>
          <p className="text-xs text-slate-400">96% mentee satisfaction rate</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/15 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Corporate Referral Hires</span>
            <span className="text-teal-400 font-semibold flex items-center gap-0.5">
              +18.1% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <p className="font-display font-extrabold text-3xl text-cyan-300">1,890</p>
          <p className="text-xs text-slate-400">At 3,200+ partner enterprises</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/15 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Event RSVPs (Past 90d)</span>
            <span className="text-teal-400 font-semibold flex items-center gap-0.5">
              +32.0% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <p className="font-display font-extrabold text-3xl text-purple-300">4,120</p>
          <p className="text-xs text-slate-400">In-person & spatial summits</p>
        </div>
      </div>

      {/* Main Breakdown: Industry Distribution & Geographic Hubs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Industry distribution */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 md:p-8 border border-white/15 space-y-6">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span>Industry Distribution</span>
            </h3>
            <p className="text-xs text-slate-400">Primary sectors of employed alumni</p>
          </div>

          <div className="space-y-4">
            {industryBreakdown.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.label}</span>
                  <span className="text-slate-400">{item.count} alumni ({item.percent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Hubs */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 md:p-8 border border-white/15 space-y-6">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-teal-400" />
              <span>Geographic Hub Density</span>
            </h3>
            <p className="text-xs text-slate-400">Top metropolitan clusters</p>
          </div>

          <div className="space-y-3">
            {geographicNodes.map((geo) => (
              <div
                key={geo.city}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-white">{geo.city}</h4>
                  <span className="text-[11px] text-slate-400">{geo.alumni} alumni residing</span>
                </div>
                <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                  {geo.percent}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alumni Verifications Table */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/15 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-white">Recent Institutional Verifications</h3>
            <p className="text-xs text-slate-400">Academic registrar verification ledger</p>
          </div>
          <button
            onClick={() => onNavigate('alumni')}
            className="text-xs font-semibold text-blue-400 hover:underline"
          >
            View All in Directory
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Alumni</th>
                <th className="pb-3 font-semibold">Current Role & Org</th>
                <th className="pb-3 font-semibold">Class</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {recentRegistrations.map((row) => (
                <tr key={row.name} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-semibold text-white">{row.name}</td>
                  <td className="py-3">{row.role} at {row.org}</td>
                  <td className="py-3 text-slate-400">{row.class}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>{row.status}</span>
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
};
