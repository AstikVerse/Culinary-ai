
import React, { useState, useEffect } from 'react';
import { Recipe, Language } from '../types';
import { IconVolumeUp, IconArrowLeft, IconCheck } from './Icons';
import { translations } from '../utils/translations';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
  language: Language;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose, language }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = translations[language];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      // Set lang for speech based on app language if possible, else default
      // This is basic; proper TTS lang setting requires mapping "Hindi" to "hi-IN" etc.
      utterance.onend = () => setIsSpeaking(false);
      utterance.onstart = () => setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentStep < recipe.instructions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      speak(recipe.instructions[nextStep]);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      speak(recipe.instructions[prevStep]);
    }
  };

  const handleReadCurrent = () => {
    speak(recipe.instructions[currentStep]);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const progress = ((currentStep + 1) / recipe.instructions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <IconArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center px-4">
            <h2 className="font-bold text-slate-900 line-clamp-1 text-sm md:text-base">{recipe.title}</h2>
            <p className="text-xs text-slate-500">{t.step} {currentStep + 1} / {recipe.instructions.length}</p>
        </div>
        <div className="w-10"></div> 
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2">
        <div 
            className="bg-emerald-500 h-2 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 text-center max-w-4xl mx-auto w-full overflow-y-auto">
        <div className="mb-8">
            <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-emerald-100 text-emerald-600 text-2xl md:text-3xl font-bold mb-6">
                {currentStep + 1}
            </span>
            <p className="text-xl md:text-4xl font-medium text-slate-800 leading-tight">
                {recipe.instructions[currentStep]}
            </p>
        </div>
        
        <button 
            onClick={handleReadCurrent}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${isSpeaking ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
            <IconVolumeUp className={`w-6 h-6 ${isSpeaking ? 'animate-pulse' : ''}`} />
            {isSpeaking ? t.reading : t.read_aloud}
        </button>
      </div>

      {/* Footer Controls */}
      <div className="p-4 md:p-6 border-t border-slate-100 bg-white flex justify-between items-center max-w-4xl mx-auto w-full">
        <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm md:text-lg"
        >
            {t.previous}
        </button>

        {currentStep === recipe.instructions.length - 1 ? (
             <button 
                onClick={onClose}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all text-sm md:text-lg flex items-center"
            >
                <IconCheck className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                {t.finish}
            </button>
        ) : (
            <button 
                onClick={handleNext}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg transition-all text-sm md:text-lg"
            >
                {t.next_step}
            </button>
        )}
      </div>
    </div>
  );
};
