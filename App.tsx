import React, { useState, useEffect, useRef } from 'react';
import { analyzeFridgeImage, fileToGenerativePart } from './services/geminiService';
import { Recipe, AppState, AVAILABLE_FILTERS, Ingredient, Language, Cuisine, MealType, ChefProfile, ChefApplication, ChefBookingRequest, User, Transaction, Payout, AppSettings } from './types';
import { RecipeCard } from './components/RecipeCard';
import { CookingMode } from './components/CookingMode';
import { AuthModal } from './components/AuthModal';
import { ChatBot } from './components/ChatBot';
import { ChefBooking } from './components/ChefBooking';
import { AdminDashboard } from './components/AdminDashboard';
import { ChefDashboard } from './components/ChefDashboard';
import { auth, syncShoppingList, saveShoppingList, syncUserBookings, logout } from './services/firebaseService';
import { onAuthStateChanged } from 'firebase/auth';
import { IconCamera, IconShoppingList, IconChefHat, IconUpload, IconGlobe, IconMap, IconUtensils, IconCheck, IconChat, IconClose, IconLogout, IconStar, IconVideo, IconBriefcase, IconCart, IconExternalLink, IconMenu, IconSearch, IconUser, IconDashboard, IconCalendar, IconWallet, IconSettings, IconClock, IconFilter, IconRefresh } from './components/Icons';
import { translations } from './utils/translations';

const INITIAL_CHEFS: ChefProfile[] = [
  { id: '1', name: 'Chef Marco Rossi', email: 'marco.rossi@chef.com', mobile: '+91 98765 43210', specialty: 'Authentic Italian & Mediterranean', rating: 4.9, reviews: 124, price: '₹2,500/hr', hourlyRate: 2500, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', badges: ['Michelin Trained', 'Pastry Expert'], joinedDate: '2023-01-15', status: 'Active' },
  { id: '2', name: 'Chef Sarah Jenkins', email: 'sarah.j@kitchen.com', mobile: '+91 98765 43211', specialty: 'Farm-to-Table & Vegan', rating: 4.8, reviews: 89, price: '₹1,800/hr', hourlyRate: 1800, image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', badges: ['Nutritionist', 'Gluten-Free'], joinedDate: '2023-03-22', status: 'Active' },
  { id: '3', name: 'Chef Akira Tanaka', email: 'akira.tanaka@sushi.jp', mobile: '+91 98765 43212', specialty: 'Japanese Fusion & Sushi', rating: 5.0, reviews: 215, price: '₹3,500/hr', hourlyRate: 3500, image: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', badges: ['Master Sushi Chef', 'Private Events'], joinedDate: '2022-11-05', status: 'Active' },
  { id: '4', name: 'Chef Priya Patel', email: 'priya.chef@india.com', mobile: '+91 98765 43213', specialty: 'Modern Indian & Spices', rating: 4.9, reviews: 156, price: '₹2,200/hr', hourlyRate: 2200, image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', badges: ['Spice Master', 'Family Style'], joinedDate: '2023-05-10', status: 'Active' }
];

const INITIAL_CHEF_BOOKINGS: ChefBookingRequest[] = [
    { id: 'BK-9012', clientName: 'Rahul Gupta', clientEmail: 'rahul@demo.com', chefName: 'Chef Priya Patel', eventType: 'Home Cooking (Weekly)', date: '2023-10-25', hours: 4, guests: 4, totalPayout: 8500, commission: 850, paymentStatus: 'Paid', status: 'completed', location: 'Bandra West' },
    { id: 'BK-9013', clientName: 'Sarah Connor', clientEmail: 'sarah@demo.com', chefName: 'Chef Marco Rossi', eventType: 'Anniversary Dinner', date: '2023-11-12', hours: 5, guests: 2, totalPayout: 12000, commission: 1200, paymentStatus: 'Paid', status: 'confirmed', location: 'Juhu Beach' }
];

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Emma Wilson', email: 'emma.w@example.com', joinDate: '2023-05-12', scans: 45, recipesGenerated: 120, groceryPurchases: 8, bookings: 2, cuisine: 'Italian', diet: ['Vegetarian'], lastActive: '2 hours ago', status: 'Active' },
  { id: 'u2', name: 'Liam Chen', email: 'liam.c@example.com', joinDate: '2023-06-01', scans: 12, recipesGenerated: 34, groceryPurchases: 1, bookings: 0, cuisine: 'Asian', diet: [], lastActive: '1 day ago', status: 'Active' }
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TXN-1001', type: 'Booking Commission', party: 'Chef Marco Rossi', date: '2023-11-20', amount: 4500, status: 'Completed' }
];

const INITIAL_PAYOUTS: Payout[] = [
  { id: 'PO-501', chefName: 'Chef Sarah Jenkins', amount: 13500, lastPayoutDate: '2023-11-01', status: 'Pending' }
];

function App() {
  const [state, setState] = useState<AppState>({
    isLoggedIn: false,
    userRole: 'user',
    currentUserId: '',
    showChat: false,
    view: 'upload',
    chefDashboardTab: 'dashboard',
    analyzing: false,
    recipes: [],
    favorites: [],
    selectedRecipe: null,
    shoppingList: [],
    dietaryFilters: [],
    lastImage: null,
    lastImageMimeType: null,
    searchQuery: '',
    language: "English",
    cuisine: "Global",
    mealType: "Any",
    chatHistory: [],
    chefs: INITIAL_CHEFS,
    chefApplications: [],
    chefBookings: INITIAL_CHEF_BOOKINGS,
    users: INITIAL_USERS,
    transactions: INITIAL_TRANSACTIONS,
    payouts: INITIAL_PAYOUTS,
    appSettings: { appName: 'CulinaryAI', maintenanceMode: false, modelName: 'gemini-3-flash-preview', temperature: 0.7, maxTokens: 2048, commissionRate: 5, affiliatePartner: 'Instacart', chefCommission: 10, autoApproveChefs: false, notifications: true, emailAlerts: true }
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const t = translations[state.language];

  const [shoppingListBump, setShoppingListBump] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Connect Backend Sync
  useEffect(() => {
    let subShopping: (() => void) | null = null;
    let subBookings: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Clean up previous listeners if user changes or logs out
      if (subShopping) subShopping();
      if (subBookings) subBookings();

      if (user) {
        setState(prev => ({ ...prev, isLoggedIn: true, currentUserId: user.uid }));
        
        // Sync Shopping List
        subShopping = syncShoppingList(user.uid, (items) => {
          setState(prev => ({ ...prev, shoppingList: items }));
        });

        // Sync Bookings
        subBookings = syncUserBookings(user.uid, (bookings) => {
          setState(prev => ({ ...prev, chefBookings: bookings as any }));
        });
      } else {
        setState(prev => ({ ...prev, isLoggedIn: false, currentUserId: '', shoppingList: [], chefBookings: INITIAL_CHEF_BOOKINGS }));
      }
    });

    // Local preferences
    const savedFavs = localStorage.getItem('culinaryAi_favorites');
    const savedCuisine = localStorage.getItem('culinaryAi_cuisine');
    const savedDiet = localStorage.getItem('culinaryAi_diet');
    setState(prev => ({ 
        ...prev, 
        favorites: savedFavs ? JSON.parse(savedFavs) : [],
        cuisine: (savedCuisine as Cuisine) || "Global",
        dietaryFilters: savedDiet ? JSON.parse(savedDiet) : []
    }));

    return () => {
      unsubscribeAuth();
      if (subShopping) subShopping();
      if (subBookings) subBookings();
    };
  }, []);

  const updateShoppingList = (newList: Ingredient[]) => {
    if (state.currentUserId) {
      saveShoppingList(state.currentUserId, newList);
    } else {
      setState(prev => ({ ...prev, shoppingList: newList }));
      localStorage.setItem('culinaryAi_shoppingList', JSON.stringify(newList));
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    setState(prev => {
        const isFav = prev.favorites.some(r => r.id === recipe.id);
        const newFavs = isFav 
            ? prev.favorites.filter(r => r.id !== recipe.id)
            : [...prev.favorites, recipe];
        localStorage.setItem('culinaryAi_favorites', JSON.stringify(newFavs));
        return { ...prev, favorites: newFavs };
    });
  };

  const triggerAnalysis = async (base64: string, mimeType: string, overrides: Partial<AppState> = {}) => {
    const params = {
        dietaryFilters: overrides.dietaryFilters ?? state.dietaryFilters,
        language: overrides.language ?? state.language,
        cuisine: overrides.cuisine ?? state.cuisine,
        mealType: overrides.mealType ?? state.mealType,
    };
    setState(prev => ({ ...prev, analyzing: true, ...overrides, searchQuery: '' }));
    try {
        const recipes = await analyzeFridgeImage(base64, mimeType, params.dietaryFilters, params.language, params.cuisine, params.mealType);
        setState(prev => ({ ...prev, recipes, analyzing: false }));
    } catch (error) {
        console.error("Analysis failed", error);
        setState(prev => ({ ...prev, analyzing: false }));
    }
  };

  const handleRegenerate = () => {
    if (state.lastImage && state.lastImageMimeType) {
        triggerAnalysis(state.lastImage, state.lastImageMimeType);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { data, mimeType } = await fileToGenerativePart(e.target.files[0]);
      setState(prev => ({ ...prev, lastImage: data, lastImageMimeType: mimeType, view: 'dashboard' }));
      triggerAnalysis(data, mimeType);
    }
  };

  const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
    } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera.");
    }
  };

  const stopCamera = () => {
      if (videoRef.current?.srcObject) {
          (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
      }
      setIsCameraOpen(false);
  };

  const capturePhoto = () => {
      if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d')?.drawImage(video, 0, 0);
          const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
          stopCamera();
          setState(prev => ({ ...prev, lastImage: base64, lastImageMimeType: 'image/jpeg', view: 'dashboard' }));
          triggerAnalysis(base64, 'image/jpeg');
      }
  };

  const handleLanguageChange = (newLanguage: Language) => setState(prev => ({ ...prev, language: newLanguage }));
  const handleCuisineChange = (newCuisine: Cuisine) => {
    setState(prev => ({ ...prev, cuisine: newCuisine }));
    localStorage.setItem('culinaryAi_cuisine', newCuisine);
  };
  const handleMealTypeChange = (newMealType: MealType) => setState(prev => ({ ...prev, mealType: newMealType }));

  const toggleFilter = (filterId: string) => {
    const newFilters = state.dietaryFilters.includes(filterId)
        ? state.dietaryFilters.filter(f => f !== filterId)
        : [...state.dietaryFilters, filterId];
    setState(prev => ({ ...prev, dietaryFilters: newFilters }));
    localStorage.setItem('culinaryAi_diet', JSON.stringify(newFilters));
  };

  const handleAddMissingIngredients = (ingredientNames: string[]) => {
    const currentNames = new Set(state.shoppingList.map(i => i.name));
    const newItems: Ingredient[] = ingredientNames
        .filter(name => !currentNames.has(name))
        .map(name => ({ name, quantity: '1 unit', isAvailable: false }));
    if (newItems.length > 0) {
      updateShoppingList([...state.shoppingList, ...newItems]);
      setShoppingListBump(true);
      setTimeout(() => setShoppingListBump(false), 300);
    }
  };

  const toggleShoppingItem = (index: number) => {
    const newList = [...state.shoppingList];
    newList.splice(index, 1);
    updateShoppingList(newList);
  };

  const handleLogin = (role: 'user' | 'admin' | 'chef', lang: Language) => {
    setState(prev => ({
        ...prev,
        isLoggedIn: true,
        userRole: role,
        view: role === 'admin' ? 'admin-dashboard' : role === 'chef' ? 'chef-partner-dashboard' : 'upload',
        language: lang
    }));
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    await logout();
    setState(prev => ({ ...prev, isLoggedIn: false, userRole: 'user', view: 'upload', recipes: [], lastImage: null, lastImageMimeType: null, chatHistory: [] }));
    setMobileMenuOpen(false);
  };

  const handleViewChange = (newView: AppState['view']) => {
    setState(prev => ({ ...prev, view: newView }));
    setMobileMenuOpen(false);
  };

  const filteredRecipes = state.recipes.filter(recipe => {
    const query = state.searchQuery.toLowerCase();
    return recipe.title.toLowerCase().includes(query) || recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query));
  });

  return (
    <div className={`flex h-screen w-full font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f0f] text-stone-200' : 'bg-[#f8fafc] text-stone-800'}`}>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={handleLogin} initialLanguage={state.language} />

      {mobileMenuOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)} />}

      {state.view !== 'admin-dashboard' && state.view !== 'chef-partner-dashboard' && (
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-72 flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out h-full ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-stone-200 border-r shadow-2xl md:shadow-none'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className={`p-6 border-b flex justify-between items-center h-20 flex-shrink-0 ${isDarkMode ? 'border-white/5' : 'border-stone-100'}`}>
            <h1 className={`text-xl font-extrabold flex items-center gap-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>
                <div className={`p-2 rounded-lg shadow-sm text-white ${state.userRole === 'chef' ? 'bg-emerald-600' : 'bg-orange-600'}`}>
                    {state.userRole === 'chef' ? <IconBriefcase className="w-5 h-5" /> : <IconChefHat className="w-5 h-5" />}
                </div>
                {state.userRole === 'chef' ? 'Partner' : 'CulinaryAI'}
            </h1>
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden p-2 text-stone-400 hover:text-stone-600"><IconClose /></button>
        </div>
        <nav className="p-4 flex-grow overflow-y-auto space-y-1 custom-scrollbar">
            <div className="space-y-1 mb-6">
                <p className="px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 mt-4">Menu</p>
                <button onClick={() => handleViewChange(state.recipes.length > 0 ? 'dashboard' : 'upload')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${state.view === 'dashboard' || state.view === 'upload' ? (isDarkMode ? 'bg-white/5 text-[#FEF08A] font-bold' : 'bg-orange-50 text-orange-700 font-bold') : 'text-stone-500 hover:bg-stone-50'}`}><IconCamera className="w-5 h-5" /><span>{t.nav_fridge}</span></button>
                <button onClick={() => handleViewChange('favorites')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${state.view === 'favorites' ? (isDarkMode ? 'bg-white/5 text-[#FEF08A] font-bold' : 'bg-orange-50 text-orange-700 font-bold') : 'text-stone-500 hover:bg-stone-50'}`}><IconStar className="w-5 h-5" /><span>{t.nav_favorites}</span></button>
                <button onClick={() => handleViewChange('shopping')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${state.view === 'shopping' ? (isDarkMode ? 'bg-white/5 text-[#FEF08A] font-bold' : 'bg-orange-50 text-orange-700 font-bold') : 'text-stone-500 hover:bg-stone-50'}`}><div className={`relative ${shoppingListBump ? 'animate-bump text-orange-600' : ''}`}><IconShoppingList className="w-5 h-5" /></div><span>{t.nav_shopping}</span></button>
                <button onClick={() => handleViewChange('chef-booking')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${state.view === 'chef-booking' ? (isDarkMode ? 'bg-white/5 text-[#FEF08A] font-bold' : 'bg-orange-50 text-orange-700 font-bold') : 'text-stone-500 hover:bg-stone-50'}`}><IconBriefcase className="w-5 h-5" /><span>{t.nav_hire}</span></button>
            </div>
            <div className="pt-2">
                <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 px-3">Culinary Profile</h3>
                <div className="space-y-4 px-1">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest px-1">Cuisine Style</label>
                        <select value={state.cuisine} onChange={(e) => handleCuisineChange(e.target.value as Cuisine)} className={`w-full border text-xs rounded-lg block p-2.5 outline-none cursor-pointer font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-700'}`}>
                            <option value="Global">Global / Fusion</option>
                            <option value="Indian">Indian</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Asian">Asian</option>
                            <option value="American">American</option>
                            <option value="Mediterranean">Mediterranean</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest px-1">Dietary Preferences</label>
                        <div className="grid grid-cols-2 gap-1.5 px-1">
                            {AVAILABLE_FILTERS.map(f => (
                                <button key={f.id} onClick={() => toggleFilter(f.id)} className={`py-2 px-2 rounded-lg text-[10px] font-bold border transition-all ${state.dietaryFilters.includes(f.id) ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-stone-50 border-stone-200 text-stone-500'}`}>{f.label}</button>
                            ))}
                        </div>
                    </div>
                    <div className="pt-4 border-t border-stone-100/50">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 px-1">Interface</p>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-stone-500 flex items-center gap-1.5 px-1"><IconGlobe className="w-3 h-3" /> Language</label>
                                <select value={state.language} onChange={(e) => handleLanguageChange(e.target.value as Language)} className={`w-full border text-xs rounded-lg block p-2.5 outline-none cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-700'}`}>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest px-1">Theme</label>
                                <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-full flex items-center justify-between p-2 rounded-lg border text-xs font-bold transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-stone-50 border-stone-200 text-stone-600'}`}>
                                <span>{isDarkMode ? 'Solarized Dark' : 'Modern Light'}</span>
                                <div className={`w-8 h-4 rounded-full p-1 flex items-center transition-colors ${isDarkMode ? 'bg-[#FEF08A]' : 'bg-stone-300'}`}><div className={`w-2 h-2 rounded-full transition-transform ${isDarkMode ? 'translate-x-4 bg-black' : 'translate-x-0 bg-white'}`} /></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div className={`p-4 border-t mt-auto flex-shrink-0 ${isDarkMode ? 'border-white/5 bg-black/10' : 'border-stone-100 bg-stone-50'}`}>
             {state.isLoggedIn ? (
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-stone-500 hover:text-red-600 transition-all font-bold text-xs uppercase tracking-wide border border-transparent"><IconLogout className="w-4 h-4" /><span>{t.nav_logout}</span></button>
             ) : (
                <button onClick={() => setShowAuthModal(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-stone-900 text-white hover:bg-black transition-all font-bold text-xs uppercase tracking-wide shadow-lg"><IconUser className="w-4 h-4" /><span>Login / Join</span></button>
             )}
        </div>
      </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {state.view !== 'admin-dashboard' && state.view !== 'chef-partner-dashboard' && (
        <header className={`md:hidden h-16 backdrop-blur-md border-b flex items-center justify-between px-4 z-30 sticky top-0 flex-shrink-0 ${isDarkMode ? 'bg-[#0f0f0f]/80 border-white/5' : 'bg-white/80 border-stone-200'}`}>
             <div className="flex items-center gap-3">
                 <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-lg"><IconMenu className="w-6 h-6" /></button>
                 <h1 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>
                    {state.userRole === 'chef' ? <IconBriefcase className="w-5 h-5 text-emerald-600" /> : <IconChefHat className="w-5 h-5 text-orange-600" />}
                    CulinaryAI
                 </h1>
             </div>
             {!state.isLoggedIn && <button onClick={() => setShowAuthModal(true)} className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-lg">Login</button>}
        </header>
        )}

        <main className={`flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#f8fafc]'}`}>
          {state.view === 'upload' && (
            <div className="h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
              <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="text-center md:text-left space-y-6 md:pl-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-sm ${isDarkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-100 text-orange-700'}`}>
                          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                          AI Kitchen Intelligence
                      </div>
                      <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                          Turn ingredients into <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Masterpieces</span>.
                      </h1>
                      <p className="text-lg text-stone-500 leading-relaxed max-w-md mx-auto md:mx-0">Simply snap a photo of your fridge, and let our AI Chef curate your personalized menu instantly.</p>
                  </div>
                  <div className={`p-8 md:p-10 rounded-2xl shadow-2xl border relative overflow-hidden group ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-white/50 shadow-stone-200/50'}`}>
                      <div className="relative z-10 flex flex-col gap-6">
                          <div className="text-center mb-4">
                              <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200 transform group-hover:scale-110 transition-transform duration-500">
                                  <IconCamera className="w-10 h-10 text-white" />
                              </div>
                              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>{t.upload_title}</h2>
                          </div>
                          <label className="block w-full cursor-pointer relative overflow-hidden rounded-xl">
                              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                              <div className={`w-full py-4 border-2 border-dashed rounded-xl flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-orange-500' : 'bg-stone-50 border-stone-200 hover:border-orange-400'}`}>
                                  <span className="flex items-center gap-2 text-sm font-bold text-stone-500 group-hover:text-orange-600"><IconUpload className="w-5 h-5" /> {t.btn_upload}</span>
                              </div>
                          </label>
                          <button onClick={startCamera} className="w-full py-4 rounded-xl bg-stone-900 text-white font-bold hover:bg-black transition-all flex items-center justify-center gap-2"><IconVideo className="w-5 h-5" /> {t.btn_camera}</button>
                      </div>
                  </div>
              </div>
            </div>
          )}

          {state.view === 'dashboard' && (
            <div className="max-w-[1600px] mx-auto animate-slide-up">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                      <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{t.kitchen_title}</h2>
                      <p className="text-stone-500 font-medium">{state.analyzing ? t.analyzing : (t.found_recipes || "Found {count} recipes.").replace('{count}', filteredRecipes.length.toString())}</p>
                  </div>
                  {!state.analyzing && (
                      <div className="flex gap-3">
                           <button onClick={handleRegenerate} className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2 ${isDarkMode ? 'bg-white/5 border border-white/5 text-stone-300' : 'bg-white border border-stone-200 text-stone-700'}`}><IconRefresh className="w-4 h-4" /> Update Recipes</button>
                           <button onClick={() => setState(prev => ({...prev, view: 'upload'}))} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg">New Scan</button>
                      </div>
                  )}
              </div>
              {!state.analyzing && state.recipes.length > 0 && (
                  <div className="mb-8 max-w-md">
                      <div className="relative">
                          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                          <input type="text" placeholder="Search..." value={state.searchQuery} onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))} className={`w-full border rounded-xl py-3 pl-12 pr-4 outline-none transition-all shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 text-white' : 'bg-white border-stone-200 text-stone-700'}`} />
                      </div>
                  </div>
              )}
              {state.analyzing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {[1, 2, 3].map(i => (<div key={i} className={`rounded-xl p-6 h-[500px] animate-pulse border shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-stone-100'}`} />))}
                  </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10">
                      {filteredRecipes.map((recipe, idx) => (
                          <div key={recipe.id} className="animate-slide-up" style={{ animationDelay: `${idx * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}>
                              <RecipeCard recipe={recipe} onCook={(r) => setState(prev => ({ ...prev, selectedRecipe: r, view: 'cooking' }))} onAddMissing={handleAddMissingIngredients} isFavorite={state.favorites.some(f => f.id === recipe.id)} onToggleFavorite={() => toggleFavorite(recipe)} language={state.language} />
                          </div>
                      ))}
                  </div>
              )}
            </div>
          )}

          {state.view === 'favorites' && (
              <div className="max-w-[1600px] mx-auto animate-slide-up">
                  <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{t.nav_favorites}</h2>
                  {state.favorites.length === 0 ? (
                      <div className={`py-32 text-center rounded-2xl border shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-stone-100'}`}>
                          <IconStar className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                          <p className="text-xl font-bold text-stone-700">{t.empty_list}</p>
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10">
                          {state.favorites.map(recipe => (
                              <RecipeCard key={recipe.id} recipe={recipe} onCook={(r) => setState(prev => ({ ...prev, selectedRecipe: r, view: 'cooking' }))} onAddMissing={handleAddMissingIngredients} isFavorite onToggleFavorite={() => toggleFavorite(recipe)} language={state.language} />
                          ))}
                      </div>
                  )}
              </div>
          )}

          {state.view === 'shopping' && (
              <div className="max-w-5xl mx-auto animate-slide-up">
                  <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-8 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{t.shopping_title}</h2>
                  <div className={`rounded-2xl shadow-xl border overflow-hidden min-h-[500px] relative ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-white shadow-stone-200/50'}`}>
                      {state.shoppingList.length === 0 ? (
                          <div className="h-full py-32 text-center text-stone-400 flex flex-col items-center justify-center">
                              <IconShoppingList className="w-16 h-16 opacity-30 mb-6" />
                              <p className="text-lg font-medium">{t.empty_list}</p>
                          </div>
                      ) : (
                          <ul className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-stone-100'}`}>
                              {state.shoppingList.map((item, idx) => (
                                  <li key={`${item.name}-${idx}`} className="p-6 md:p-8 flex items-center justify-between group transition-colors">
                                      <div className="flex items-center gap-6">
                                          <button className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isDarkMode ? 'border-white/10 hover:bg-orange-600' : 'border-stone-200 hover:bg-orange-500 text-transparent'}`} onClick={() => toggleShoppingItem(idx)}><IconCheck className="w-6 h-6 text-white" /></button>
                                          <p className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>{item.name}</p>
                                      </div>
                                  </li>
                              ))}
                          </ul>
                      )}
                  </div>
              </div>
          )}

          {state.view === 'chef-booking' && <ChefBooking chefs={state.chefs} onApply={() => {}} language={state.language} />}
          {state.view === 'chef-partner-dashboard' && <ChefDashboard bookings={state.chefBookings} onAccept={() => {}} onDecline={() => {}} activeTab={state.chefDashboardTab} onTabChange={(tab) => setState(p => ({ ...p, chefDashboardTab: tab }))} onDeleteAccount={() => {}} onSignOut={handleLogout} />}
          {state.view === 'admin-dashboard' && <AdminDashboard applications={[]} approvedChefs={state.chefs} bookings={state.chefBookings} users={state.users} transactions={state.transactions} payouts={state.payouts} onApprove={() => {}} onReject={() => {}} onBlockUser={() => {}} onSuspendChef={() => {}} onBookingAction={() => {}} onReleasePayout={() => {}} onClose={handleLogout} settings={state.appSettings} onUpdateSettings={() => {}} />}
          {state.view === 'cooking' && state.selectedRecipe && <CookingMode recipe={state.selectedRecipe} onClose={() => setState(prev => ({ ...prev, view: 'dashboard', selectedRecipe: null }))} language={state.language} />}
          {state.userRole === 'user' && state.view !== 'upload' && !state.showChat && <button onClick={() => setState(prev => ({ ...prev, showChat: true }))} className="fixed bottom-6 right-6 z-40 bg-orange-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110"><IconChat className="w-6 h-6" /></button>}
          {state.showChat && <ChatBot history={state.chatHistory} setHistory={(h) => setState(prev => ({ ...prev, chatHistory: h }))} contextRecipes={state.recipes} onClose={() => setState(prev => ({ ...prev, showChat: false }))} />}
          {isCameraOpen && (
              <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-in fade-in duration-300">
                  <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden"><video ref={videoRef} autoPlay playsInline muted className="absolute min-w-full min-h-full object-cover" /></div>
                  <div className="h-40 bg-black/90 flex items-center justify-around px-8 pb-8 pt-4"><button onClick={stopCamera} className="text-white p-4 rounded-full hover:bg-white/10"><IconClose className="w-8 h-8" /></button><button onClick={capturePhoto} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-105"><div className="w-full h-full bg-white rounded-full" /></button><div className="w-16" /></div>
                  <canvas ref={canvasRef} className="hidden" />
              </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;