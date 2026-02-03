
import React, { useState, useEffect } from 'react';
import { IconChefHat, IconUser, IconLock, IconShield, IconBriefcase, IconClose } from './Icons';
import { translations } from '../utils/translations';
import { Language } from '../types';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (onlyAdmin) {
      setIsLogin(true);
      setRole('admin');
    }
  }, [onlyAdmin]);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Step 1: Trigger the Google Login Popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Step 2: Check if this user already has a profile in our database
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      let finalRole = role;
      if (!userSnap.exists()) {
          // New User: Save their details and assigned role
          // Note: Logic prevents self-assigning Admin via Google for security
          const assignedRole = role === 'admin' ? 'user' : role;
          await setDoc(userRef, {
            email: user.email,
            name: user.displayName || 'Culinary Artist',
            role: assignedRole,
            joinDate: new Date().toISOString(),
            status: 'Active',
            scans: 0,
            recipesGenerated: 0
          });
          finalRole = assignedRole;
      } else {
          // Existing User: Use the role stored in their profile
          finalRole = userSnap.data().role || 'user';
      }

      onLogin(finalRole as any, lang);
      onClose();
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Login cancelled. You closed the Google window.");
      } else {
        setError("Failed to connect with Google. Ensure you enabled it in Firebase.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userRole = userDoc.exists() ? (userDoc.data().role as any) : 'user';
        onLogin(userRole, lang);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          role,
          joinDate: new Date().toISOString(),
          status: 'Active',
          scans: 0,
          recipesGenerated: 0
        });
        onLogin(role, lang);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Auth failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 z-30 p-2 text-stone-400 hover:text-stone-900 transition-colors">
            <IconClose className="w-6 h-6" />
        </button>

        <div className={`p-10 text-center relative ${
            role === 'admin' ? 'bg-stone-900' : 
            role === 'chef' ? 'bg-emerald-600' : 
            'bg-orange-600'
        }`}>
            <div className="relative z-10">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    {role === 'admin' ? <IconShield className="w-8 h-8 text-white" /> :
                     role === 'chef' ? <IconBriefcase className="w-8 h-8 text-white" /> :
                     <IconChefHat className="w-8 h-8 text-white" />}
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter">CulinaryAI</h2>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-2">
                    {role === 'admin' ? 'System Override' : 'Professional Kitchen Access'}
                </p>
            </div>
        </div>

        <div className="p-8">
            <div className="flex bg-stone-100 rounded-2xl p-1 mb-8">
                <button onClick={() => setRole('user')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === 'user' ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>User</button>
                <button onClick={() => setRole('chef')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === 'chef' ? 'bg-white text-emerald-600 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>Chef</button>
                <button onClick={() => setRole('admin')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === 'admin' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>Admin</button>
            </div>

            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100">{error}</div>}
            
            <button 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-4 bg-white border-2 border-stone-100 py-4 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all shadow-sm group active:scale-[0.98]"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pms/google.png" className="w-6 h-6" alt="Google" />
                <span className="text-sm font-black text-stone-800 uppercase tracking-tighter">Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-8">
                <div className="border-t border-stone-100 w-full"></div>
                <span className="bg-white px-4 text-[10px] font-black text-stone-300 uppercase tracking-widest absolute">or credential access</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email Address" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" 
                />
                <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Security Key" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" 
                />
                
                <button type="submit" disabled={isLoading} className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                    {isLoading ? 'Processing...' : (isLogin ? 'Establish Connection' : 'Register Profile')}
                </button>
            </form>

            <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-[10px] font-black text-stone-400 uppercase tracking-widest hover:text-orange-600 transition-colors">
                {isLogin ? "Need a professional account? Join here" : "Already registered? Sign in"}
            </button>
        </div>
      </div>
    </div>
  );
};
