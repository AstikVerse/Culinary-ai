
import React, { useState } from 'react';
import { ChefApplication, ChefProfile, ChefBookingRequest, User, Transaction, Payout, AppSettings } from '../types';
import { 
  IconShield, IconCheck, IconCross, IconUsers, IconChefHat, IconClose, 
  IconCalendar, IconRupee, IconDashboard, IconSettings, 
  IconActivity, IconBriefcase, IconWallet, IconSearch, IconLock, IconMessage,
  IconRefresh, IconDownload, IconCart, IconPlus, IconLogout,
  IconStar, IconExternalLink, IconMenu, IconArrowLeft, IconBarChart, IconHistory, IconGlobe, IconClock
} from './Icons';

interface AdminDashboardProps {
  applications: ChefApplication[];
  approvedChefs: ChefProfile[];
  bookings: ChefBookingRequest[];
  users: User[];
  transactions: Transaction[];
  payouts: Payout[];
  onApprove: (app: ChefApplication) => void;
  onReject: (id: string) => void;
  onBlockUser: (id: string) => void;
  onSuspendChef: (id: string) => void;
  onBookingAction: (action: string, id: string) => void;
  onReleasePayout: (id: string) => void;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

type AdminSection = 'dashboard' | 'users' | 'chefs' | 'orders' | 'payments' | 'analytics' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  applications, 
  approvedChefs, 
  bookings,
  users,
  transactions,
  payouts,
  onApprove, 
  onReject,
  onBlockUser,
  onSuspendChef,
  onBookingAction,
  onReleasePayout,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [saveNote, setSaveNote] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = transactions.reduce((acc, curr) => acc + (curr.amount > 0 ? curr.amount : 0), 0);
  
  const updateSetting = (key: keyof AppSettings, val: any) => {
    onUpdateSettings({ ...settings, [key]: val });
    setSaveNote('Protocol Updated...');
    setTimeout(() => setSaveNote(null), 2000);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
    <button 
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ${checked ? 'bg-orange-600' : 'bg-stone-300'}`}
    >
        <div className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </button>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      Active: 'bg-emerald-50 text-emerald-600',
      Blocked: 'bg-red-50 text-red-600',
      Suspended: 'bg-orange-50 text-orange-600',
      Completed: 'bg-emerald-50 text-emerald-600',
      Pending: 'bg-amber-50 text-amber-600',
      Paid: 'bg-blue-50 text-blue-600',
      confirmed: 'bg-blue-50 text-blue-600',
      cancelled: 'bg-stone-100 text-stone-400'
    };
    const colorClass = colors[status] || 'bg-stone-50 text-stone-500';
    return <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${colorClass}`}>{status}</span>;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] flex flex-col flex-shrink-0">
        <div className="p-6 h-20 flex items-center gap-3 border-b border-white/5">
            <div className="bg-orange-500 p-1.5 rounded-lg">
                <IconShield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-black tracking-tight text-white uppercase">ROOT<span className="text-orange-500">CONTROL</span></h1>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {[
                { id: 'dashboard', label: 'Command Deck', icon: IconDashboard },
                { id: 'users', label: 'User Registry', icon: IconUsers },
                { id: 'chefs', label: 'Chef Partners', icon: IconGlobe },
                { id: 'orders', label: 'Service Logs', icon: IconCalendar },
                { id: 'payments', label: 'Finance Hub', icon: IconWallet },
                { id: 'analytics', label: 'Data Lab', icon: IconBarChart },
                { id: 'settings', label: 'Global Prefs', icon: IconSettings },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as AdminSection)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${activeSection === item.id ? 'bg-white/10 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-orange-400' : 'group-hover:text-orange-300'}`} />
                    <span className="text-xs font-bold tracking-tight">{item.label}</span>
                </button>
            ))}
        </nav>

        <div className="p-4 border-t border-white/5">
            <button onClick={onClose} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all font-black uppercase tracking-widest text-[9px]">
                <IconLogout className="w-4 h-4" />
                Terminate Session
            </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F9FBFC] overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
            <div>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">{activeSection.replace('-', ' ')}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CULINARYAI NODE: AP-SOUTH-1</p>
            </div>
            
            <div className="flex items-center gap-4">
                {saveNote && <span className="text-orange-600 font-black text-[9px] uppercase animate-pulse">{saveNote}</span>}
                <div className="text-right">
                    <p className="text-xs font-black text-slate-900">Admin Instance</p>
                    <p className="text-[9px] font-bold text-emerald-500 uppercase">STATUS: ELEVATED</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
                    <IconUsers className="w-5 h-5" />
                </div>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeSection === 'dashboard' && (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Revenue', val: `₹${totalRevenue.toLocaleString()}`, icon: IconRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'Users', val: users.length, icon: IconUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { label: 'Chefs', val: approvedChefs.length, icon: IconChefHat, color: 'text-orange-600', bg: 'bg-orange-50' },
                            { label: 'Orders', val: bookings.length, icon: IconCalendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-36">
                                <div className={`p-2 rounded-lg ${s.bg} ${s.color} w-fit`}><s.icon className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xl font-black text-slate-900">{s.val}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeSection === 'orders' && (
                <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-sm font-black text-slate-900 uppercase">Master Service Log</h3>
                            <div className="relative">
                                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input type="text" placeholder="Filter logs..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-orange-500" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                        <th className="px-6 py-4">Ref ID</th>
                                        <th className="px-6 py-4">Client / Chef</th>
                                        <th className="px-6 py-4">Service Date</th>
                                        <th className="px-6 py-4">Payout</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {bookings.map(b => (
                                        <tr key={b.id} className="text-xs hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-black text-slate-900">{b.id}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold">{b.clientName}</p>
                                                <p className="text-[10px] text-stone-400">{b.chefName}</p>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{b.date}</td>
                                            <td className="px-6 py-4 font-bold">₹{b.totalPayout.toLocaleString()}</td>
                                            <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-orange-500 p-1.5 rounded-md hover:bg-orange-50"><IconExternalLink className="w-4 h-4"/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeSection === 'payments' && (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#0f172a] text-white p-8 rounded-xl shadow-xl flex flex-col justify-between h-56 relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-2">Platform Liquidity</p>
                                <h3 className="text-4xl font-black text-white tracking-tighter">₹{(totalRevenue * 0.85).toLocaleString()}</h3>
                                <p className="text-[10px] text-emerald-400 mt-2 font-bold uppercase tracking-widest">Available for Settlement</p>
                            </div>
                            <button className="relative z-10 bg-orange-600 text-white py-3 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-orange-700 transition-all shadow-lg">Run Disbursement Protocol</button>
                            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-56">
                            <div>
                                <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1">Accumulated Commission (10%)</p>
                                <p className="text-3xl font-black text-slate-900">₹{(totalRevenue * 0.1).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Affiliate Rev</p>
                                    <p className="text-sm font-black">₹{Math.floor(totalRevenue * 0.05).toLocaleString()}</p>
                                </div>
                                <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Service Rev</p>
                                    <p className="text-sm font-black">₹{Math.floor(totalRevenue * 0.1).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-sm font-black text-slate-900 uppercase">Payment Ledger</h3>
                            <button className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase hover:text-slate-900 transition-all">
                                <IconDownload className="w-3.5 h-3.5" /> Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                        <th className="px-6 py-4">Transaction ID</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Involved Party</th>
                                        <th className="px-6 py-4">Net Amount</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {transactions.map(txn => (
                                        <tr key={txn.id} className="text-xs hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono font-bold text-slate-500">{txn.id}</td>
                                            <td className="px-6 py-4 font-black">{txn.type}</td>
                                            <td className="px-6 py-4 text-slate-500">{txn.party}</td>
                                            <td className={`px-6 py-4 font-black ${txn.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                {txn.amount > 0 ? '+' : '-'}₹{Math.abs(txn.amount).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right"><StatusBadge status={txn.status} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeSection === 'settings' && (
                <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-10 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Global Protocol</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase mt-1">Platform-wide engine constraints</p>
                        </div>
                        <div className="p-10 space-y-10">
                            <section className="space-y-6">
                                <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Platform Identity</h4>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase">App Nomenclature</label>
                                        <input type="text" value={settings.appName} onChange={(e) => updateSetting('appName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs font-bold outline-none focus:border-orange-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase">Maintenance Protocol</label>
                                        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">
                                            <span className="text-[10px] font-bold text-slate-700">ACTIVE</span>
                                            <Toggle checked={settings.maintenanceMode} onChange={(v) => updateSetting('maintenanceMode', v)} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Economic Model</h4>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase">Chef Commission (%)</label>
                                        <input type="number" value={settings.chefCommission} onChange={(e) => updateSetting('chefCommission', parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs font-bold outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase">Default AI Node</label>
                                        <select value={settings.modelName} onChange={(e) => updateSetting('modelName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs font-bold outline-none">
                                            <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
                                            <option value="gemini-3-pro-preview">Gemini 3 Pro</option>
                                        </select>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
            
            {['users', 'chefs', 'analytics'].includes(activeSection) && (
                <div className="h-full flex items-center justify-center animate-in fade-in py-20">
                    <div className="text-center max-w-sm">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <IconActivity className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Module Initialization</h3>
                        <p className="text-slate-400 text-sm mt-2 leading-relaxed font-medium">This section is being synchronized with the master database. Check back in v4.3 deployment cycle.</p>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};
