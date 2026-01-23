
import React, { useState } from 'react';
import { IconChefHat, IconUser, IconLock, IconShield, IconBriefcase } from './Icons';
import { translations } from '../utils/translations';
import { Language } from '../types';

interface AuthPageProps {
  onLogin: (role: 'user' | 'admin' | 'chef', lang: Language) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'user' | 'chef' | 'admin'>('user');
  const [lang, setLang] = useState<Language>('English');

  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role, lang);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-4 md:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-stone-200 border border-stone-100 overflow-hidden animate-slide-up">
        {/* Banner */}
        <div className={`p-8 text-center relative overflow-hidden transition-colors duration-500 ${
            role === 'admin' ? 'bg-stone-800' : 
            role === 'chef' ? 'bg-emerald-600' : 
            'bg-orange-600'
        }`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            
            {/* Language Switcher for Auth Page */}
            <div className="absolute top-4 right-4 z-20">
                <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value as Language)}
                    className="bg-white/20 text-white text-xs rounded-lg px-2 py-1 border-none outline-none cursor-pointer backdrop-blur-sm"
                >
                    <option value="English" className="text-stone-800">English</option>
                    <option value="Hindi" className="text-stone-800">हिंदी</option>
                    <option value="Spanish" className="text-stone-800">Español</option>
                    <option value="French" className="text-stone-800">Français</option>
                    <option value="German" className="text-stone-800">Deutsch</option>
                </select>
            </div>

            <div className="relative z-10">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm transition-all duration-300">
                    {role === 'admin' ? <IconShield className="w-8 h-8 text-white" /> :
                     role === 'chef' ? <IconBriefcase className="w-8 h-8 text-white" /> :
                     <IconChefHat className="w-8 h-8 text-white" />}
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">CulinaryAI</h1>
                <p className="text-white/80 text-sm mt-2 font-medium">
                    {role === 'admin' ? 'Admin Portal' : 
                     role === 'chef' ? 'Partner Dashboard' : 
                     t.welcome}
                </p>
            </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex border-b border-stone-100">
            <button 
                onClick={() => setRole('user')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${role === 'user' ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/50' : 'text-stone-400 hover:text-stone-600'}`}
            >
                User
            </button>
            <button 
                onClick={() => setRole('chef')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${role === 'chef' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Chef
            </button>
            <button 
                onClick={() => setRole('admin')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${role === 'admin' ? 'text-stone-800 border-b-2 border-stone-800 bg-stone-50' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Admin
            </button>
        </div>

        {/* Form */}
        <div className="p-8">
            <div className="flex gap-4 mb-8 bg-stone-100 p-1 rounded-xl">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t.email}</label>
                    <div className="relative">
                        <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <input 
                            type="email" 
                            required 
                            placeholder={role === 'admin' ? "admin@culinaryai.com" : role === 'chef' ? "chef@kitchen.com" : "user@example.com"}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-stone-700 font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">{t.password}</label>
                    <div className="relative">
                        <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <input 
                            type="password" 
                            required 
                            placeholder="••••••••"
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-stone-700 font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    className={`w-full text-white font-bold py-4 rounded-xl transform active:scale-95 transition-all shadow-lg mt-4 ${
                        role === 'admin' ? 'bg-stone-800 hover:bg-stone-700' : 
                        role === 'chef' ? 'bg-emerald-600 hover:bg-emerald-500' : 
                        'bg-orange-600 hover:bg-orange-500'
                    }`}
                >
                    {isLogin 
                      ? (role === 'user' ? t.login_user : role === 'chef' ? t.login_chef : t.login_admin)
                      : t.create_account}
                </button>
            </form>

            <p className="text-center text-xs text-stone-400 mt-6">
                By continuing, you agree to our Terms of Service & Privacy Policy.
            </p>
        </div>
      </div>
    </div>
  );
};
