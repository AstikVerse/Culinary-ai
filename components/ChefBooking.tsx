import React, { useState } from 'react';
import { ChefProfile, ChefApplication, Language, ChefBookingRequest } from '../types';
import { IconStar, IconCheck, IconChefHat, IconCalendar, IconUsers, IconClock, IconClose, IconUpload, IconRupee, IconTrophy, IconFlame, IconWine, IconArrowLeft, IconBriefcase, IconUser, IconMap, IconLock } from './Icons';
import { translations } from '../utils/translations';
import { db } from '../lib/firebase';
import { collection, addDoc } from "firebase/firestore";

interface ChefBookingProps {
  chefs: ChefProfile[];
  onApply: (application: Omit<ChefApplication, 'id' | 'status' | 'appliedDate'>) => void;
  language: Language;
  currentUser?: string;
}

export const ChefBooking: React.FC<ChefBookingProps> = ({ chefs, onApply, language, currentUser }) => {
  const [selectedChef, setSelectedChef] = useState<ChefProfile | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [isBooked, setIsBooked] = useState(false);
  const [appStep, setAppStep] = useState<'form' | 'success'>('form');
  const [activeTab, setActiveTab] = useState<'browse' | 'leaderboard'>('browse');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[language] as any;

  const [bookingData, setBookingData] = useState({
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      occasion: 'Casual Dining',
      mealType: [] as string[],
      guests: 2,
      location: '',
      dietary: ''
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('Italian');
  const [experience, setExperience] = useState(5);

  const calculateTotal = (price: number) => {
    const baseHours = 4;
    const baseCost = (price || 0) * baseHours;
    const guestSurcharge = (bookingData.guests - 2) * 500;
    return baseCost + (guestSurcharge > 0 ? guestSurcharge : 0);
  };

  const handleBookingUpdate = (key: string, value: any) => {
      setBookingData(prev => ({ ...prev, [key]: value }));
  };

  const handleBook = async () => {
    if (!selectedChef) return;
    if (!bookingData.location.trim()) {
        alert("Please provide a service location.");
        return;
    }

    setIsSubmitting(true);
    try {
        const total = calculateTotal(selectedChef.price);
        // Ensure we write to the 'bookings' collection
        await addDoc(collection(db, 'bookings'), {
            chefId: selectedChef.id,
            chefName: selectedChef.name,
            clientName: currentUser || "Guest User",
            date: bookingData.date,
            time: bookingData.time,
            guests: bookingData.guests,
            location: bookingData.location,
            totalPayout: total,
            status: 'pending',
            paymentStatus: 'Pending',
            createdAt: new Date().toISOString()
        });
        setIsBooked(true);
    } catch (err) {
        console.error("Booking failed:", err);
        alert("Booking failed. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        alert("You must be logged in to apply as a chef.");
        return;
    }
    onApply({
      firstName, lastName, email, specialty,
      yearsExperience: experience,
    });
    setAppStep('success');
  };

  const resetModals = () => {
    setSelectedChef(null);
    setBookingStep(1);
    setIsBooked(false);
    setIsApplicationOpen(false);
    setAppStep('form');
    setBookingData(prev => ({ ...prev, location: '' }));
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-slide-up pb-12">
      {/* Redesigned Premium Hero Banner - Visual Upgrade */}
      <div className="relative rounded-[2rem] overflow-hidden mb-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-white/10 group">
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Chef cooking" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 p-8 md:p-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-orange-600 text-white rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl shadow-orange-600/30">
            <IconChefHat className="w-3.5 h-3.5" />
            <span>{t.premium_service}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1] mb-8 tracking-tighter drop-shadow-2xl">
            Bring the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Restaurant</span> Experience Home
          </h1>
          <p className="text-stone-300 text-lg md:text-xl mb-12 leading-relaxed font-medium max-w-2xl">
            Elevate your home dining with world-class private chefs. Bespoke menus, dinner parties, and culinary masterclasses at your doorstep.
          </p>
          <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => { setActiveTab('browse'); document.getElementById('chef-browser-target')?.scrollIntoView({ behavior: 'smooth' }); }} 
                className="bg-white text-stone-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                {t.find_chef}
              </button>
              <button 
                onClick={() => { setIsApplicationOpen(true); setAppStep('form'); }} 
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all transform hover:scale-105"
              >
                {t.join_chef}
              </button>
          </div>
        </div>
      </div>

      <div id="chef-browser-target" className="flex justify-center mb-12 scroll-mt-24">
          <div className="bg-white dark:bg-[#1a1a1a] p-1.5 rounded-2xl shadow-2xl border border-stone-100 dark:border-white/5 flex gap-1">
             <button onClick={() => setActiveTab('browse')} className={`px-10 py-3.5 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${activeTab === 'browse' ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-lg' : 'text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'}`}>{t.browse_chefs}</button>
             <button onClick={() => setActiveTab('leaderboard')} className={`px-10 py-3.5 rounded-xl font-black transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest ${activeTab === 'leaderboard' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'}`}><IconTrophy className="w-4 h-4" /> {t.leaderboard}</button>
          </div>
      </div>

      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {chefs.map((chef) => (
            <div key={chef.id} className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] overflow-hidden border border-stone-100 dark:border-white/5 shadow-xl hover:shadow-[0_40px_80px_-15_rgba(0,0,0,0.2)] transition-all group flex flex-col">
                <div className="h-72 overflow-hidden relative">
                    <img src={chef.image} alt={chef.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-2xl">
                        <IconStar className="w-4 h-4 text-orange-400" fill="currentColor" />
                        <span className="text-xs font-black text-stone-900">{chef.rating}</span>
                    </div>
                    <div className="absolute bottom-5 left-5 flex gap-2">
                        {chef.badges?.slice(0, 2).map(b => (
                            <span key={b} className="bg-stone-900/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-white/10">{b}</span>
                        ))}
                    </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-stone-800 dark:text-white mb-1 tracking-tight">{chef.name}</h3>
                    <p className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em] mb-8">{chef.speciality}</p>
                    <div className="mt-auto pt-8 border-t border-stone-50 dark:border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-[9px] text-stone-400 font-black uppercase tracking-widest mb-1">Base Price</p>
                            <span className="text-2xl font-black text-stone-900 dark:text-white">₹{(chef.price || 0).toLocaleString()}</span>
                        </div>
                        <button onClick={() => setSelectedChef(chef)} className="bg-stone-900 dark:bg-white dark:text-stone-900 text-white px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-xl">{t.book_now}</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}

      {selectedChef && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden relative animate-slide-up">
                  <button onClick={resetModals} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-2"><IconClose className="w-5 h-5" /></button>
                  {isBooked ? (
                      <div className="p-10 text-center space-y-4">
                          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                              <IconCheck className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-black text-stone-900 uppercase">Confirmed!</h3>
                          <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Your request has been queued with {selectedChef.name}.</p>
                          <button onClick={resetModals} className="w-full bg-stone-900 text-white py-3 rounded-lg font-black text-[10px] uppercase mt-4 shadow-lg">Excellent</button>
                      </div>
                  ) : (
                      <div className="p-8">
                          <h3 className="text-xl font-black text-stone-900 mb-6 uppercase tracking-tight">Hire {selectedChef.name}</h3>
                          <div className="space-y-4">
                              <div className="space-y-1">
                                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Event Date</label>
                                  <input type="date" value={bookingData.date} onChange={e => setBookingData(p => ({...p, date: e.target.value}))} className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 px-4 text-xs font-bold outline-none" />
                              </div>
                              <div className="space-y-1">
                                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Venue Location</label>
                                  <input type="text" placeholder="Full Address" value={bookingData.location} onChange={e => setBookingData(p => ({...p, location: e.target.value}))} className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 px-4 text-xs font-bold outline-none" />
                              </div>
                              <button onClick={handleBook} disabled={isSubmitting} className="w-full bg-orange-600 text-white py-4 rounded-lg font-black text-[11px] uppercase tracking-widest transition-all mt-4 shadow-xl hover:bg-orange-700">
                                {isSubmitting ? 'Submitting...' : `Confirm • ₹${calculateTotal(selectedChef.price).toLocaleString()}`}
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      )}

      {isApplicationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative animate-in zoom-in-95">
                  <button onClick={resetModals} className="absolute top-8 right-8 text-stone-400 hover:text-stone-900 dark:hover:text-white p-2 rounded-full hover:bg-stone-50 dark:hover:bg-white/5 transition-all z-20"><IconClose className="w-6 h-6" /></button>
                  <div className="flex flex-col h-full max-h-[90vh]">
                      <div className="p-10 border-b border-stone-100 dark:border-white/5 bg-stone-50/50 dark:bg-black/20">
                          <h3 className="text-2xl font-black text-stone-900 dark:text-white uppercase tracking-tight">Partner Application</h3>
                          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">Join the CulinaryAI Professional Network</p>
                      </div>
                      <div className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                          {!currentUser ? (
                              <div className="py-12 text-center">
                                  <div className="w-20 h-20 bg-stone-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <IconLock className="w-10 h-10 text-stone-400" />
                                  </div>
                                  <h4 className="text-xl font-black text-stone-900 dark:text-white uppercase mb-2">Login Required</h4>
                                  <p className="text-sm text-stone-500 font-bold uppercase tracking-widest mb-8">Sign in to submit your professional profile.</p>
                                  <button onClick={resetModals} className="bg-stone-900 dark:bg-white dark:text-stone-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Dismiss</button>
                              </div>
                          ) : (
                              appStep === 'form' ? (
                              <form onSubmit={handleApply} className="space-y-6">
                                  <div className="grid grid-cols-2 gap-5">
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">First Name</label>
                                          <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" />
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Last Name</label>
                                          <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" />
                                      </div>
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Work Email</label>
                                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" />
                                  </div>
                                  <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 active:scale-98">Submit Portfolio</button>
                              </form>
                              ) : (
                                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
                                      <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 rounded-[2rem] flex items-center justify-center mb-4"><IconCheck className="w-12 h-12" /></div>
                                      <h3 className="text-3xl font-black text-stone-900 dark:text-white uppercase tracking-tight">Application Sent!</h3>
                                      <p className="text-stone-500 text-sm font-bold uppercase tracking-widest max-w-[320px] leading-relaxed">Our concierge team will review your culinary portfolio within 48 hours.</p>
                                      <button onClick={resetModals} className="mt-8 bg-stone-900 dark:bg-white dark:text-stone-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Dismiss</button>
                                  </div>
                              )
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};