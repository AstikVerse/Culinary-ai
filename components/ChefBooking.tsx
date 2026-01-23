
import React, { useState } from 'react';
import { ChefProfile, ChefApplication, Language, ChefBookingRequest } from '../types';
import { IconStar, IconCheck, IconChefHat, IconCalendar, IconUsers, IconClock, IconClose, IconUpload, IconRupee, IconTrophy, IconFlame, IconWine, IconArrowLeft } from './Icons';
import { fileToGenerativePart } from '../services/geminiService';
import { translations } from '../utils/translations';

interface ChefBookingProps {
  chefs: ChefProfile[];
  onApply: (application: Omit<ChefApplication, 'id' | 'status' | 'appliedDate'>) => void;
  language: Language;
}

export const ChefBooking: React.FC<ChefBookingProps> = ({ chefs, onApply, language }) => {
  const [selectedChef, setSelectedChef] = useState<ChefProfile | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [isBooked, setIsBooked] = useState(false);
  const [appStep, setAppStep] = useState<'form' | 'success'>('form');
  const [activeTab, setActiveTab] = useState<'browse' | 'leaderboard'>('browse');

  const t = translations[language] as any;

  const [bookingData, setBookingData] = useState({
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      occasion: 'Casual Dining',
      mealType: [] as string[],
      guests: 2,
      burners: 3,
      dietary: '',
      location: ''
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('Italian');
  const [experience, setExperience] = useState(5);
  const [resumeFile, setResumeFile] = useState<{name: string, data: string} | null>(null);

  const calculateTotal = (rate: number) => {
    const baseHours = 4;
    const baseCost = rate * baseHours;
    const guestSurcharge = (bookingData.guests - 2) * 500;
    const total = baseCost + (guestSurcharge > 0 ? guestSurcharge : 0);
    return total;
  };

  const handleBookingUpdate = (key: string, value: any) => {
      setBookingData(prev => ({ ...prev, [key]: value }));
  };

  const toggleMealType = (type: string) => {
      setBookingData(prev => {
          const exists = prev.mealType.includes(type);
          return {
              ...prev,
              mealType: exists ? prev.mealType.filter(t => t !== type) : [...prev.mealType, type]
          };
      });
  };

  const handleBook = () => {
    setIsBooked(true);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({
      firstName,
      lastName,
      email,
      specialty,
      yearsExperience: experience,
      resumeData: resumeFile?.data,
      resumeName: resumeFile?.name
    });
    setAppStep('success');
  };

  const resetModals = () => {
    setSelectedChef(null);
    setBookingStep(1);
    setIsBooked(false);
    setIsApplicationOpen(false);
  };

  const OCCASIONS = ['Casual Dining', 'Birthday Party', 'Anniversary', 'House Warming', 'Date Night', 'Get Together'];
  const MEALS = ['Lunch', 'High Tea', 'Dinner', 'Late Night'];

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-slide-up pb-12">
      {/* Hero Section */}
      <div className="bg-stone-900/50 backdrop-blur-md rounded-2xl p-8 md:p-12 text-white mb-8 relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-lg px-3 py-1.5 text-orange-300 text-xs font-bold uppercase tracking-wider mb-6">
            <IconChefHat className="w-4 h-4" />
            <span>{t.premium_service}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-none">
            {t.hero_title}
          </h1>
          <p className="text-stone-300 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
            {t.hero_desc}
          </p>
          <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => {
                    setActiveTab('browse');
                    document.getElementById('chef-browser-target')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/90 text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors text-sm"
              >
                {t.find_chef}
              </button>
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
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-4">{chef.specialty}</p>
                    <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-base font-black text-stone-900">{chef.price}</span>
                        <button onClick={() => setSelectedChef(chef)} className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">{t.book_now}</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedChef && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in zoom-in-95">
                  <button onClick={resetModals} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 p-2 rounded-full hover:bg-stone-50 transition-all z-20">
                      <IconClose className="w-6 h-6" />
                  </button>

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
                                  <div className="flex items-center gap-4 mb-2">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${bookingStep === 1 ? 'bg-stone-900 text-white shadow-lg' : 'bg-emerald-100 text-emerald-600'}`}>
                                          {bookingStep > 1 ? <IconCheck className="w-5 h-5" /> : '1'}
                                      </div>
                                      <div className="h-px flex-1 bg-stone-200"></div>
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${bookingStep === 2 ? 'bg-stone-900 text-white shadow-lg' : 'bg-stone-100 text-stone-400'}`}>2</div>
                                  </div>

                                  {bookingStep === 1 && (
                                      <div className="space-y-6 animate-in slide-in-from-right-8">
                                          <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Date of Event</label>
                                                  <input type="date" value={bookingData.date} onChange={(e) => handleBookingUpdate('date', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500" />
                                              </div>
                                              <div className="space-y-2">
                                                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Arrival Time</label>
                                                  <input type="time" value={bookingData.time} onChange={(e) => handleBookingUpdate('time', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500" />
                                              </div>
                                          </div>
                                          <div className="space-y-2">
                                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Total Guests</label>
                                              <div className="flex items-center gap-2">
                                                  {[2, 4, 6, 8, 12].map(num => (
                                                      <button 
                                                        key={num}
                                                        onClick={() => handleBookingUpdate('guests', num)}
                                                        className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${bookingData.guests === num ? 'bg-stone-900 border-stone-900 text-white shadow-lg' : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400'}`}
                                                      >
                                                          {num}
                                                      </button>
                                                  ))}
                                              </div>
                                          </div>
                                          <div className="space-y-2">
                                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Service Location</label>
                                              <input type="text" placeholder="e.g. Bandra West, Mumbai" value={bookingData.location} onChange={(e) => handleBookingUpdate('location', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500" />
                                          </div>
                                          <button onClick={() => setBookingStep(2)} className="w-full bg-stone-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10">Continue to Options</button>
                                      </div>
                                  )}

                                  {bookingStep === 2 && (
                                      <div className="space-y-6 animate-in slide-in-from-right-8">
                                          <div className="space-y-2">
                                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Occasion</label>
                                              <div className="grid grid-cols-2 gap-2">
                                                  {OCCASIONS.map(occ => (
                                                      <button 
                                                        key={occ}
                                                        onClick={() => handleBookingUpdate('occasion', occ)}
                                                        className={`py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all text-left ${bookingData.occasion === occ ? 'bg-orange-500 border-orange-500 text-white shadow-md' : 'bg-white border-stone-200 text-stone-500'}`}
                                                      >
                                                          {occ}
                                                      </button>
                                                  ))}
                                              </div>
                                          </div>
                                          <div className="space-y-2">
                                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Meal Focus</label>
                                              <div className="flex flex-wrap gap-2">
                                                  {MEALS.map(meal => (
                                                      <button 
                                                        key={meal}
                                                        onClick={() => toggleMealType(meal)}
                                                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${bookingData.mealType.includes(meal) ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-200 text-stone-500'}`}
                                                      >
                                                          {meal}
                                                      </button>
                                                  ))}
                                              </div>
                                          </div>
                                          <div className="space-y-2">
                                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Dietary Notes</label>
                                              <textarea rows={3} value={bookingData.dietary} onChange={(e) => handleBookingUpdate('dietary', e.target.value)} placeholder="Allergies, preferences..." className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500 resize-none" />
                                          </div>
                                          
                                          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex justify-between items-center">
                                              <div>
                                                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Estimate Total</p>
                                                  <p className="text-xl font-black text-stone-900">₹{calculateTotal(selectedChef.hourlyRate).toLocaleString()}</p>
                                              </div>
                                              <div className="text-right text-[8px] font-bold text-stone-400 uppercase tracking-tighter">
                                                  Includes 4hrs base service
                                              </div>
                                          </div>

                                          <div className="flex gap-4">
                                              <button onClick={() => setBookingStep(1)} className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-200 transition-all">Back</button>
                                              <button onClick={handleBook} className="flex-[2] bg-stone-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10">Confirm Booking</button>
                                          </div>
                                      </div>
                                  )}
                              </>
                          ) : (
                              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
                                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                      <IconCheck className="w-10 h-10" />
                                  </div>
                                  <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Request Sent!</h3>
                                  <p className="text-stone-500 text-xs font-bold uppercase tracking-widest max-w-[280px] leading-relaxed">
                                      {selectedChef.name} will review your request for {bookingData.date} and confirm within 2 hours.
                                  </p>
                                  <div className="w-full bg-stone-50 p-6 rounded-2xl border border-stone-100 text-left">
                                      <div className="flex justify-between items-center mb-2">
                                          <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Ref ID</span>
                                          <span className="text-xs font-black text-stone-900">#BK-{Math.floor(1000 + Math.random() * 9000)}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                          <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Net Value</span>
                                          <span className="text-xs font-black text-emerald-600">₹{calculateTotal(selectedChef.hourlyRate).toLocaleString()}</span>
                                      </div>
                                  </div>
                                  <button onClick={resetModals} className="mt-4 bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Back to Browser</button>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Application Modal */}
      {isApplicationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95">
                <button onClick={resetModals} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 p-2 rounded-full hover:bg-stone-50 transition-all z-20">
                    <IconClose className="w-6 h-6" />
                </button>
                {appStep === 'form' ? (
                  <div className="p-10">
                     <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-8">Join the Elite</h3>
                     <form onSubmit={handleApply} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">First Name</label>
                              <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500" />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Last Name</label>
                              <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500" />
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Address</label>
                           <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Primary Specialty</label>
                           <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500">
                              <option value="Italian">Italian Cuisine</option>
                              <option value="Asian Fusion">Asian Fusion</option>
                              <option value="Modern Indian">Modern Indian</option>
                              <option value="Pastry & Baking">Pastry & Baking</option>
                              <option value="Vegan/Plant-Based">Vegan/Plant-Based</option>
                           </select>
                        </div>
                        <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10">Submit Application</button>
                     </form>
                  </div>
                ) : (
                  <div className="p-12 text-center flex flex-col items-center">
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                          <IconCheck className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-4">Application Staged</h3>
                      <p className="text-stone-500 text-xs font-bold uppercase tracking-widest leading-relaxed mb-8">Our onboarding team will review your portfolio and reach out for a tasting trial soon.</p>
                      <button onClick={resetModals} className="bg-stone-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Dismiss</button>
                  </div>
                )}
           </div>
        </div>
      )}
    </div>
  );
};
