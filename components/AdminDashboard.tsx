
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

type AdminSection = 'dashboard' | 'users' | 'chefs' | 'orders' | 'payments' | 'analytics' | 'settings' | 'pending-chefs';

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

  const totalRevenue = transactions.reduce((acc, curr) => acc + ((curr.amount || 0) > 0 ? curr.amount : 0), 0);
  
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
                { id: 'pending-chefs', label: 'Chef Apps', icon: IconClock },
                { id: 'users', label: 'User Registry', icon: IconUsers },
                { id: 'chefs', label: 'Chef Partners', icon: IconGlobe },
                { id: 'orders', label: 'Service Logs', icon: IconCalendar },
                { id: 'payments', label: 'Finance Hub', icon: IconWallet },
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SYSTEM: AP-SOUTH-1-ALPHA</p>
            </div>
            
            <div className="flex items-center gap-4">
                {saveNote && <span className="text-orange-600 font-black text-[9px] uppercase animate-pulse">{saveNote}</span>}
                <div className="text-right">
                    <p className="text-xs font-black text-slate-900">Admin Privileges</p>
                    <p className="text-[9px] font-bold text-emerald-500 uppercase">STATUS: ACTIVE</p>
                </div>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeSection === 'dashboard' && (
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Revenue', val: `₹${totalRevenue.toLocaleString()}`, icon: IconRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'Pending Apps', val: applications.filter(a => a.status === 'pending').length, icon: IconClock, color: 'text-amber-600', bg: 'bg-amber-50' },
                            { label: 'Active Chefs', val: approvedChefs.length, icon: IconChefHat, color: 'text-orange-600', bg: 'bg-orange-50' },
                            { label: 'Active Orders', val: bookings.length, icon: IconCalendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
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

            {activeSection === 'pending-chefs' && (
                <div className="max-w-7xl mx-auto space-y-6 animate-in slide-in-from-right-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-sm font-black text-slate-900 uppercase">Chef Candidate Review</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                        <th className="px-6 py-4">Candidate</th>
                                        <th className="px-6 py-4">Specialty</th>
                                        <th className="px-6 py-4">Experience</th>
                                        <th className="px-6 py-4">Applied On</th>
                                        <th className="px-6 py-4 text-right">Decision</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {applications.filter(a => a.status === 'pending').map(app => (
                                        <tr key={app.id} className="text-xs hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <p className="font-black text-slate-900">{app.firstName} {app.lastName}</p>
                                                <p className="text-[10px] text-slate-500">{app.email}</p>
                                            </td>
                                            <td className="px-6 py-5 font-bold">{app.specialty}</td>
                                            <td className="px-6 py-5 font-bold">{app.yearsExperience} Years</td>
                                            <td className="px-6 py-5 text-slate-500 font-medium">{app.appliedDate}</td>
                                            <td className="px-6 py-5 text-right flex justify-end gap-2">
                                                <button onClick={() => onReject(app.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><IconCross className="w-4 h-4"/></button>
                                                <button onClick={() => onApprove(app)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"><IconCheck className="w-4 h-4"/></button>
                                            </td>
                                        </tr>
                                    ))}
                                    {applications.filter(a => a.status === 'pending').length === 0 && (
                                        <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No pending applications in queue</td></tr>
                                    )}
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
                        </div>
                        <div className="p-10 space-y-10">
                            <section className="space-y-6">
                                <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Security Protocol</h4>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-black text-slate-900">Enforce Manual Approval</p>
                                            <p className="text-[10px] text-slate-500 font-bold mt-1">Users cannot self-assign 'Chef' role without admin verify.</p>
                                        </div>
                                        <Toggle checked={!settings.autoApproveChefs} onChange={(v) => updateSetting('autoApproveChefs', !v)} />
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
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
            
            {['users', 'chefs', 'orders', 'payments'].includes(activeSection) && activeSection !== 'orders' && (
                <div className="h-full flex items-center justify-center animate-in fade-in py-20">
                    <div className="text-center max-w-sm">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <IconActivity className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Module Locked</h3>
                        <p className="text-slate-400 text-sm mt-2 leading-relaxed font-medium">This registry module is currently undergoing schema synchronization with the backend cluster. Use the Command Deck for overview statistics.</p>
                        <button onClick={() => setActiveSection('dashboard')} className="mt-8 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline">Return to Base</button>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};
