
import React, { useState } from 'react';
import { IconChefHat, IconUser, IconLock, IconShield, IconBriefcase, IconClose } from './Icons';
import { translations } from '../utils/translations';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: 'user' | 'admin' | 'chef', lang: Language) => void;
  initialLanguage: Language;
  onlyAdmin?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, initialLanguage, onlyAdmin = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'user' | 'chef' | 'admin'>(onlyAdmin ? 'admin' : 'user');
  const [lang, setLang] = useState<Language>(initialLanguage);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role, lang);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-stone-900/20 border border-white/50 overflow-hidden relative animate-slide-up">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"
        >
            <IconClose className="w-5 h-5" />
        </button>

        {/* Banner */}
        <div className={`p-8 pb-12 text-center relative overflow-hidden transition-colors duration-500 ${
            role === 'admin' ? 'bg-stone-800' : 
            role === 'chef' ? 'bg-emerald-600' : 
            'bg-orange-600'
        }`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            
            <div className="relative z-10 pt-2">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm transition-all duration-300 shadow-lg">
                    {role === 'admin' ? <IconShield className="w-8 h-8 text-white" /> :
                     role === 'chef' ? <IconBriefcase className="w-8 h-8 text-white" /> :
                     <IconChefHat className="w-8 h-8 text-white" />}
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">CulinaryAI</h2>
                <p className="text-white/90 text-sm mt-2 font-medium tracking-wide">
                    {role === 'admin' ? 'Admin Portal' : 
                     role === 'chef' ? 'Partner Dashboard' : 
                     t.welcome}
                </p>
            </div>
        </div>

        {/* Floating Role Tabs - Hidden if onlyAdmin is true */}
        {!onlyAdmin ? (
            <div className="relative -mt-6 px-8 z-20">
                <div className="flex bg-white rounded-xl shadow-lg border border-stone-100 p-1">
                    <button 
                        onClick={() => setRole('user')}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${role === 'user' ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                        User
                    </button>
                    <button 
                        onClick={() => setRole('chef')}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${role === 'chef' ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                        Chef
                    </button>
                    <button 
                        onClick={() => setRole('admin')}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${role === 'admin' ? 'bg-stone-100 text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                        Admin
                    </button>
                </div>
            </div>
        ) : (
            <div className="h-6 bg-white rounded-t-[2rem] relative -mt-6 z-20"></div>
        )}

        {/* Form */}
        <div className="px-8 pb-8 pt-2">
            {!onlyAdmin && (
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 pb-2 text-sm font-bold transition-all border-b-2 ${isLogin ? 'text-stone-900 border-stone-900' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 pb-2 text-sm font-bold transition-all border-b-2 ${!isLogin ? 'text-stone-900 border-stone-900' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
                >
                    Sign Up
                </button>
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">{t.email}</label>
                    <div className="relative group">
                        <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-stone-600 transition-colors" />
                        <input 
                            type="email" 
                            required 
                            autoFocus
                            placeholder={role === 'admin' ? "admin@culinaryai.com" : role === 'chef' ? "chef@kitchen.com" : "user@example.com"}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-stone-700 font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-stone-300"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">{t.password}</label>
                    <div className="relative group">
                        <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-stone-600 transition-colors" />
                        <input 
                            type="password" 
                            required 
                            placeholder="••••••••"
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-stone-700 font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-stone-300"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button 
                        type="submit"
                        className={`w-full text-white font-bold py-4 rounded-xl transform active:scale-[0.98] transition-all shadow-lg hover:shadow-xl ${
                            role === 'admin' ? 'bg-stone-900 hover:bg-black shadow-stone-900/20' : 
                            role === 'chef' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 
                            'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-orange-600/20'
                        }`}
                    >
                        {isLogin 
                        ? (role === 'user' ? t.login_user : role === 'chef' ? t.login_chef : t.login_admin)
                        : t.create_account}
                    </button>
                </div>
            </form>

            <div className="mt-6 flex justify-between items-center border-t border-stone-100 pt-4">
               <span className="text-xs text-stone-400 font-medium">Language</span>
               <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value as Language)}
                    className="bg-stone-50 text-stone-600 text-xs rounded-lg px-2 py-1 border border-stone-200 outline-none cursor-pointer hover:bg-stone-100"
                >
                    <option value="English">English</option>
                    <option value="Hindi">हिंदी</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                </select>
            </div>
        </div>
      </div>
    </div>
  );
};
