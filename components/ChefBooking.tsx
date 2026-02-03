
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
      {/* High-Visibility Attractive Hero Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl h-[400px] md:h-[550px]">
          {/* Background Image - Clear and Sharp */}
          <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
                alt="Chef Cooking"
                className="w-full h-full object-cover"
              />
              {/* Solid subtle overlay for text readability without blur */}
              <div className="absolute inset-0 bg-stone-900/40"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl">
              <div className="inline-flex items-center gap-3 bg-orange-600 px-5 py-2.5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 w-fit shadow-xl">
                <IconChefHat className="w-4 h-4" /><span>{t.premium_service}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter drop-shadow-2xl">
                {t.hero_title}
              </h1>
              <p className="text-stone-50 text-sm md:text-xl mb-12 leading-relaxed font-bold max-w-2xl drop-shadow-lg">
                {t.hero_desc}
              </p>
              <div className="flex flex-wrap gap-6">
                  <button 
                    onClick={() => { setActiveTab('browse'); document.getElementById('chef-browser-target')?.scrollIntoView({ behavior: 'smooth' }); }} 
                    className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40 transform hover:scale-105 active:scale-95 text-xs"
                  >
                    {t.find_chef}
                  </button>
                  <button 
                    onClick={() => { setIsApplicationOpen(true); setAppStep('form'); }} 
                    className="bg-white text-stone-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-stone-100 transition-all shadow-xl text-xs"
                  >
                    {t.join_chef}
                  </button>
              </div>
          </div>
      </div>

      <div id="chef-browser-target" className="flex justify-center mb-10 scroll-mt-24">
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-stone-100 flex gap-2">
             <button onClick={() => setActiveTab('browse')} className={`px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'browse' ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-400 hover:text-stone-800'}`}>{t.browse_chefs}</button>
             <button onClick={() => setActiveTab('leaderboard')} className={`px-10 py-4 rounded-xl font-black flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest transition-all ${activeTab === 'leaderboard' ? 'bg-orange-500 text-white shadow-lg' : 'text-stone-400 hover:text-stone-800'}`}><IconTrophy className="w-4 h-4" /> {t.leaderboard}</button>
          </div>
      </div>

      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 animate-in fade-in duration-500">
            {chefs.map((chef) => (
            <div key={chef.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-lg hover:shadow-2xl transition-all group flex flex-col transform hover:-translate-y-2">
                <div className="h-64 overflow-hidden relative">
                    <img src={chef.image} alt={chef.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
                        <IconStar className="w-4 h-4 text-orange-400" fill="currentColor" />
                        <span className="text-xs font-black text-stone-900">{chef.rating}</span>
                    </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-stone-900 mb-1 tracking-tighter">{chef.name}</h3>
                    <p className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em] mb-8">{chef.speciality}</p>
                    
                    <div className="mt-auto pt-8 border-t border-stone-50 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Base Rate</span>
                            <span className="text-2xl font-black text-stone-900">₹{(chef.price || 0).toLocaleString()}</span>
                        </div>
                        <button onClick={() => setSelectedChef(chef)} className="bg-stone-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg">{t.book_now}</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}

      {/* Join as Chef Modal */}
      {isApplicationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md">
              <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative">
                  <button onClick={resetModals} className="absolute top-8 right-8 text-stone-400 hover:text-stone-900 p-2 rounded-full transition-all z-20"><IconClose className="w-6 h-6" /></button>
                  <div className="flex flex-col h-full max-h-[90vh]">
                      <div className="p-10 border-b border-stone-100 bg-stone-50/50">
                          <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter">Partner Program</h3>
                          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">Enroll in our elite professional network</p>
                      </div>
                      <div className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                          {!currentUser ? (
                              <div className="py-16 text-center">
                                  <IconLock className="w-16 h-16 mx-auto mb-6 text-stone-200" />
                                  <h4 className="text-xl font-black text-stone-900 uppercase tracking-tighter">Security Lock</h4>
                                  <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-10">Identify yourself to access professional services.</p>
                                  <button onClick={resetModals} className="bg-stone-900 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest">Acknowledge</button>
                              </div>
                          ) : (
                              appStep === 'form' ? (
                              <form onSubmit={handleApply} className="space-y-6">
                                  <div className="grid grid-cols-2 gap-6">
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">First Identity</label>
                                          <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" />
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Last Identity</label>
                                          <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" />
                                      </div>
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Primary Email</label>
                                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" />
                                  </div>
                                  <div className="grid grid-cols-2 gap-6">
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Specialization</label>
                                          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20">
                                              <option value="Italian">Italian Cuisine</option>
                                              <option value="Indian">Indian Cuisine</option>
                                              <option value="French">French Cuisine</option>
                                              <option value="Japanese">Japanese Cuisine</option>
                                              <option value="Mexican">Mexican Cuisine</option>
                                              <option value="Pastry">Pastry & Baking</option>
                                          </select>
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Seniority (Years)</label>
                                          <input required type="number" value={experience} onChange={(e) => setExperience(parseInt(e.target.value))} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20" />
                                      </div>
                                  </div>
                                  <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">Initiate Application</button>
                              </form>
                              ) : (
                                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-8">
                                      <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4"><IconCheck className="w-12 h-12" /></div>
                                      <h3 className="text-3xl font-black text-stone-900 uppercase tracking-tighter">Transmission Successful</h3>
                                      <p className="text-stone-500 text-xs font-bold uppercase tracking-widest max-w-[300px] leading-relaxed">Our evaluation board will contact you regarding your placement within 48 hours.</p>
                                      <button onClick={resetModals} className="bg-stone-900 text-white px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Close Session</button>
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
