
import React, { useState, useRef } from 'react';
import { ChefBookingRequest } from '../types';
import { 
  IconWallet, IconCalendarCheck, IconStar, IconCheck, IconMessage, 
  IconClock, IconSettings, IconUser, IconMenu, IconLogout, IconDashboard,
  IconChefHat, IconRupee, IconClose, IconPlus, IconShield, IconCamera,
  IconActivity, IconBarChart, IconHistory, IconSearch, IconExternalLink,
  IconRefresh
} from './Icons';

interface ChefDashboardProps {
  bookings: ChefBookingRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  activeTab: 'dashboard' | 'bookings' | 'earnings' | 'profile' | 'availability' | 'settings';
  onTabChange: (tab: 'dashboard' | 'bookings' | 'earnings' | 'profile' | 'availability' | 'settings') => void;
  onDeleteAccount: () => void;
  onSignOut: () => void;
}

export const ChefDashboard: React.FC<ChefDashboardProps> = ({ 
  bookings: initialBookings, 
  activeTab, 
  onTabChange,
  onAccept,
  onDecline,
  onDeleteAccount,
  onSignOut
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [localBookings, setLocalBookings] = useState<ChefBookingRequest[]>(initialBookings);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const stats = {
    totalRevenue: localBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalPayout, 0),
    pendingOrders: localBookings.filter(b => b.status === 'pending').length,
    activeRating: 4.9,
    completionRate: "98.2%"
  };

  const showToast = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const NavItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => onTabChange(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
        activeTab === id 
        ? 'bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/20' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 ${activeTab === id ? 'text-slate-900' : 'text-slate-500 group-hover:text-amber-400'}`} />
      {!isSidebarCollapsed && <span className="text-[11px] font-black uppercase tracking-widest truncate">{label}</span>}
      {activeTab === id && !isSidebarCollapsed && (
        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse"></div>
      )}
    </button>
  );

  return (
    <div className="flex h-screen font-sans overflow-hidden fixed inset-0 z-50 bg-[#0a0a0c] text-slate-200">
      
      {/* Sidebar - Pro Architecture */}
      <aside className={`border-r border-white/5 flex flex-col flex-shrink-0 transition-all duration-500 bg-[#111114] ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className={`h-24 flex items-center px-8 border-b border-white/5 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 text-slate-900 p-2 rounded-xl shadow-xl shadow-amber-400/20">
                <IconChefHat className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tighter uppercase leading-none text-white">Culinary<span className="text-amber-400">AI</span></h1>
                <p className="text-[8px] font-black text-amber-400/60 uppercase tracking-widest mt-1">Chef Enterprise</p>
              </div>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <IconMenu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
          <NavItem id="dashboard" label="Command Deck" icon={IconDashboard} />
          <NavItem id="bookings" label="Service Logs" icon={IconCalendarCheck} />
          <NavItem id="earnings" label="Capital Hub" icon={IconWallet} />
          <div className="h-px bg-white/5 my-6 mx-4"></div>
          <NavItem id="profile" label="Public Profile" icon={IconUser} />
          <NavItem id="availability" label="Duty Schedule" icon={IconClock} />
          <NavItem id="settings" label="Core Settings" icon={IconSettings} />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
          >
            <IconLogout className="w-4 h-4" />
            {!isSidebarCollapsed && <span>Terminate</span>}
          </button>
        </div>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {/* Top Header */}
        <header className="h-24 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-40 px-10 flex items-center justify-between">
            <div>
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-1">System Status: <span className="text-emerald-400">Online</span></h2>
                <p className="text-2xl font-black text-white uppercase tracking-tight">{activeTab.replace('-', ' ')}</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Node</span>
                    <span className="text-xs font-bold text-white uppercase">S. Jenkins #9012</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 p-0.5 overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover rounded-[14px]" />
                </div>
            </div>
        </header>

        <div className="p-10 flex-1">
          {activeTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Gross Yield', val: `₹${stats.totalRevenue.toLocaleString()}`, icon: IconRupee, color: 'text-amber-400', trend: '+12.4%' },
                        { label: 'Pending Dispatch', val: stats.pendingOrders, icon: IconClock, color: 'text-blue-400', trend: '-2' },
                        { label: 'Market Rating', val: stats.activeRating, icon: IconStar, color: 'text-emerald-400', trend: 'STABLE' },
                        { label: 'Success Rate', val: stats.completionRate, icon: IconActivity, color: 'text-purple-400', trend: 'PEAK' },
                    ].map((m, i) => (
                        <div key={i} className="bg-[#111114] border border-white/5 p-6 rounded-2xl group hover:border-amber-400/30 transition-all relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${m.color}`}><m.icon className="w-5 h-5" /></div>
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md bg-white/5 ${m.color}`}>{m.trend}</span>
                            </div>
                            <h4 className="text-2xl font-black text-white mb-1">{m.val}</h4>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{m.label}</p>
                        </div>
                    ))}
                </div>

                {/* Database View - Service Logs */}
                <div className="bg-[#111114] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Database: Service Records</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Real-time synchronization enabled</p>
                        </div>
                        <div className="flex gap-2">
                             <div className="relative">
                                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                <input type="text" placeholder="Search Logs..." className="bg-slate-900 border border-white/5 rounded-xl px-9 py-2 text-[10px] font-bold text-white outline-none focus:border-amber-400/50 w-48" />
                             </div>
                             <button className="p-2 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all"><IconRefresh className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                                    <th className="px-8 py-4">Transaction ID</th>
                                    <th className="px-8 py-4">Client Detail</th>
                                    <th className="px-8 py-4">Timestamp</th>
                                    <th className="px-8 py-4">Financials</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Access</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {localBookings.map(b => (
                                    <tr key={b.id} className="text-xs group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-5 font-mono text-amber-400 font-bold">#{b.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black">{b.clientName[0]}</div>
                                                <div>
                                                    <p className="font-black text-white">{b.clientName}</p>
                                                    <p className="text-[9px] text-slate-500 font-bold">{b.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-slate-400 font-bold">{b.date}</td>
                                        <td className="px-8 py-5">
                                            <p className="font-black text-white">₹{b.totalPayout.toLocaleString()}</p>
                                            <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Net Payable</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                                b.status === 'confirmed' ? 'bg-blue-400/10 text-blue-400' :
                                                b.status === 'completed' ? 'bg-emerald-400/10 text-emerald-400' :
                                                b.status === 'pending' ? 'bg-amber-400/10 text-amber-400' : 'bg-white/5 text-slate-500'
                                            }`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-slate-500 hover:text-amber-400 transition-all p-2 rounded-lg hover:bg-white/5"><IconExternalLink className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'earnings' && (
              <div className="max-w-7xl mx-auto space-y-10 animate-in slide-in-from-bottom-6 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-[#111114] border border-white/5 rounded-2xl p-8 flex flex-col justify-between h-64 relative overflow-hidden">
                          <div className="relative z-10">
                              <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Payout Pipeline</h3>
                              <div className="flex items-end gap-3">
                                <span className="text-5xl font-black text-white">₹{(stats.totalRevenue * 0.9).toLocaleString()}</span>
                                <span className="text-xs font-bold text-emerald-400 mb-2">+12% vs last cycle</span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Estimated settlement date: Oct 28, 2023</p>
                          </div>
                          <div className="relative z-10 flex gap-4">
                              <button className="bg-amber-400 text-slate-900 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-400/10 hover:bg-white transition-all">Withdraw Capital</button>
                              <button className="bg-white/5 border border-white/5 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Export Ledger</button>
                          </div>
                          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                      </div>
                      <div className="bg-[#111114] border border-white/5 rounded-2xl p-8 flex flex-col justify-between h-64">
                         <div>
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Tax Intelligence</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                    <span className="text-[10px] font-bold text-slate-400">GST WITHHELD (5%)</span>
                                    <span className="text-xs font-black text-white">₹{(stats.totalRevenue * 0.05).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                    <span className="text-[10px] font-bold text-slate-400">SERVICE FEE (5%)</span>
                                    <span className="text-xs font-black text-white">₹{(stats.totalRevenue * 0.05).toLocaleString()}</span>
                                </div>
                            </div>
                         </div>
                         <div className="bg-amber-400/5 border border-amber-400/10 p-3 rounded-xl">
                             <p className="text-[9px] text-amber-400 font-black uppercase tracking-widest mb-1">PRO-TIP</p>
                             <p className="text-[10px] text-slate-300 leading-relaxed italic">"Keep your grocery invoices to claim tax offsets next month."</p>
                         </div>
                      </div>
                  </div>
              </div>
          )}

          {['profile', 'availability', 'settings'].includes(activeTab) && (
              <div className="h-full flex items-center justify-center py-20 animate-in fade-in">
                  <div className="text-center max-sm">
                      <div className="w-24 h-24 bg-slate-900/50 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                          <IconActivity className="w-8 h-8 text-amber-400/30" />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">Access Restricted</h3>
                      <p className="text-slate-500 text-xs mt-4 leading-relaxed font-bold uppercase tracking-widest">This module is currently in read-only mode during system sync. Access will be restored in 48 minutes.</p>
                      <button onClick={() => onTabChange('dashboard')} className="mt-8 text-amber-400 font-black text-[10px] uppercase tracking-widest hover:underline">Return to Deck</button>
                  </div>
              </div>
          )}
        </div>
      </main>

      {saveStatus && (
        <div className="fixed bottom-10 right-10 z-[100] bg-amber-400 text-slate-900 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl animate-in slide-in-from-right-10">
          {saveStatus}
        </div>
      )}
    </div>
  );
};
