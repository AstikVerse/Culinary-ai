
import React, { useState } from 'react';
import { IconStar, IconClose, IconCheck } from './Icons';
import { db } from '../lib/firebase';
import { collection, addDoc } from "firebase/firestore";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, userId, username }) => {
  const [rating, setRating] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating.");
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        userId,
        username,
        rating,
        accuracyScore: accuracy,
        comment,
        timestamp: new Date().toISOString(),
      });
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form for next time
        setRating(0);
        setAccuracy(0);
        setComment('');
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Feedback Save Error:", err);
      alert("Failed to save feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors">
            <IconClose className="w-6 h-6" />
        </button>

        <div className="p-8">
          {isSuccess ? (
            <div className="py-12 text-center animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-stone-900 uppercase">Thank You!</h3>
                <p className="text-sm text-stone-500 font-bold uppercase tracking-widest mt-2">Your feedback helps us improve.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter mb-1">Rate Your Scan</h3>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-8">Was the AI accurate with your ingredients?</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Overall Quality</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button 
                        key={num} 
                        type="button"
                        onClick={() => setRating(num)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${rating >= num ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
                      >
                        <IconStar className="w-5 h-5" fill={rating >= num ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Ingredient Accuracy</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button 
                        key={num} 
                        type="button"
                        onClick={() => setAccuracy(num)}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${accuracy === num ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-200 text-stone-400'}`}
                      >
                        {num === 1 ? 'Poor' : num === 5 ? 'Perfect' : num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Comments (Optional)</label>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Anything we missed?"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none h-24"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || rating === 0}
                  className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
