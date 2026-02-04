
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
      <div className="bg-stone-900/50 backdrop-blur-md rounded-2xl p-8 md:p-12 text-white mb-8 relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-lg px-3 py-1.5 text-orange-300 text-xs font-bold uppercase tracking-wider mb-6">
            <IconChefHat className="w-4 h-4" /><span>{t.premium_service}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-none">{t.hero_title}</h1>
          <p className="text-stone-300 text-sm md:text-base mb-8 leading-relaxed max-w-lg">{t.hero_desc}</p>
          <div className="flex flex-wrap gap-3">
              <button onClick={() => { setActiveTab('browse'); document.getElementById('chef-browser-target')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-white/90 text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors text-sm">{t.find_chef}</button>
              <button onClick={() => { setIsApplicationOpen(true); setAppStep('form'); }} className="bg-stone-800/80 text-white border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-stone-700 transition-colors text-sm">{t.join_chef}</button>
          </div>
        </div>
      </div>

      <div id="chef-browser-target" className="flex justify-center mb-10 scroll-mt-24">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-stone-100 flex">
             <button onClick={() => setActiveTab('browse')} className={`px-8 py-2.5 rounded-lg font-bold transition-all text-xs uppercase tracking-widest ${activeTab === 'browse' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-800'}`}>{t.browse_chefs}</button>
             <button onClick={() => setActiveTab('leaderboard')} className={`px-8 py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest ${activeTab === 'leaderboard' ? 'bg-orange-500 text-white' : 'text-stone-400 hover:text-stone-800'}`}><IconTrophy className="w-3.5 h-3.5" /> {t.leaderboard}</button>
          </div>
      </div>

      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {chefs.map((chef) => (
            <div key={chef.id} className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-md hover:shadow-xl transition-all group flex flex-col">
                <div className="h-48 overflow-hidden relative">
                    <img src={chef.image} alt={chef.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <IconStar className="w-3 h-3 text-orange-400" fill="currentColor" />
                        <span className="text-[10px] font-bold text-stone-800">{chef.rating}</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-black text-stone-800 mb-1">{chef.name}</h3>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-4">{chef.speciality}</p>
                    <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-base font-black text-stone-900">₹{(chef.price || 0).toLocaleString()}</span>
                        <button onClick={() => setSelectedChef(chef)} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">{t.book_now}</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}

      {/* Join as Chef Modal */}
      {isApplicationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in zoom-in-95">
                  <button onClick={resetModals} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 p-2 rounded-full hover:bg-stone-50 transition-all z-20"><IconClose className="w-6 h-6" /></button>
                  <div className="flex flex-col h-full max-h-[90vh]">
                      <div className="p-8 border-b border-stone-100 bg-stone-50/50">
                          <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight">Partner Application</h3>
                          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Apply to join our elite chef network</p>
                      </div>
                      <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                          {!currentUser ? (
                              <div className="py-12 text-center">
                                  <IconLock className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                                  <h4 className="text-lg font-black text-stone-900 uppercase mb-2">Authentication Required</h4>
                                  <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-6">You must be signed in to apply for a professional role.</p>
                                  <button onClick={resetModals} className="bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Got it</button>
                              </div>
                          ) : (
                              appStep === 'form' ? (
                              <form onSubmit={handleApply} className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">First Name</label>
                                          <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Last Name</label>
                                          <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                      </div>
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Professional Email</label>
                                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Specialty</label>
                                          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none">
                                              <option value="Italian">Italian</option>
                                              <option value="Indian">Indian</option>
                                              <option value="French">French</option>
                                              <option value="Japanese">Japanese</option>
                                              <option value="Mexican">Mexican</option>
                                              <option value="Pastry">Pastry</option>
                                          </select>
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Experience (Years)</label>
                                          <input required type="number" value={experience} onChange={(e) => setExperience(parseInt(e.target.value))} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                      </div>
                                  </div>
                                  <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-stone-900/10">Submit Application</button>
                              </form>
                              ) : (
                                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
                                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4"><IconCheck className="w-10 h-10" /></div>
                                      <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Success!</h3>
                                      <p className="text-stone-500 text-xs font-bold uppercase tracking-widest max-w-[280px] leading-relaxed">Our recruitment team will review your application and contact you within 48 hours.</p>
                                      <button onClick={resetModals} className="mt-4 bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Dismiss</button>
                                  </div>
                              )
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {selectedChef && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in zoom-in-95">
                  <button onClick={resetModals} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 p-2 rounded-full hover:bg-stone-50 transition-all z-20"><IconClose className="w-6 h-6" /></button>
                  <div className="flex flex-col h-full max-h-[90vh]">
                      <div className="p-8 border-b border-stone-100 bg-stone-50/50 flex items-center gap-5">
                          <img src={selectedChef.image} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                          <div>
                              <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight">{t.book_now}</h3>
                              <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">{selectedChef.name}</p>
                          </div>
                      </div>
                      <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                          {!isBooked ? (
                              <>
                                  {bookingStep === 1 ? (
                                      <div className="space-y-6 animate-in slide-in-from-right-8">
                                          <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Date</label>
                                                  <input type="date" value={bookingData.date} onChange={(e) => handleBookingUpdate('date', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                              </div>
                                              <div className="space-y-2">
                                                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Arrival</label>
                                                  <input type="time" value={bookingData.time} onChange={(e) => handleBookingUpdate('time', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                              </div>
                                          </div>
                                          <div className="space-y-2">
                                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Service Location</label>
                                              <div className="relative">
                                                  <IconMap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                                  <input type="text" placeholder="House/Apt No, Locality, City" value={bookingData.location} onChange={(e) => handleBookingUpdate('location', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none" />
                                              </div>
                                          </div>
                                          <div className="space-y-2">
                                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Total Guests</label>
                                              <div className="flex items-center gap-2">
                                                  {[2, 4, 6, 8, 12].map(num => (
                                                      <button key={num} onClick={() => handleBookingUpdate('guests', num)} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${bookingData.guests === num ? 'bg-stone-900 border-stone-900 text-white shadow-lg' : 'bg-white border-stone-200 text-stone-500'}`}>{num}</button>
                                                  ))}
                                              </div>
                                          </div>
                                          <button onClick={() => setBookingStep(2)} className="w-full bg-stone-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10">Continue</button>
                                      </div>
                                  ) : (
                                      <div className="space-y-6 animate-in slide-in-from-right-8">
                                          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex justify-between items-center">
                                              <div>
                                                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Estimate Total</p>
                                                  <p className="text-xl font-black text-stone-900">₹{calculateTotal(selectedChef.price).toLocaleString()}</p>
                                              </div>
                                              <div className="text-right text-[8px] font-bold text-stone-400 uppercase tracking-tighter">Includes 4hrs base service</div>
                                          </div>
                                          <div className="flex gap-4">
                                              <button onClick={() => setBookingStep(1)} className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-200 transition-all">Back</button>
                                              <button onClick={handleBook} disabled={isSubmitting} className="flex-[2] bg-stone-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all disabled:opacity-50">
                                                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                                              </button>
                                          </div>
                                      </div>
                                  )}
                              </>
                          ) : (
                              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
                                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4"><IconCheck className="w-10 h-10" /></div>
                                  <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Request Sent!</h3>
                                  <p className="text-stone-500 text-xs font-bold uppercase tracking-widest max-w-[280px] leading-relaxed">{selectedChef.name} will review your request for {bookingData.date}.</p>
                                  <button onClick={resetModals} className="mt-4 bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Dismiss</button>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
