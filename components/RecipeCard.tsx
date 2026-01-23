
import React, { useState } from 'react';
import { Recipe, Language } from '../types';
import { IconClock, IconFlame, IconChefHat, IconCheck, IconPlus, IconCross, IconYoutube, IconHeart, IconButterfly, IconWine, IconLightbulb } from './Icons';
import { translations } from '../utils/translations';

interface RecipeCardProps {
  recipe: Recipe;
  onCook: (recipe: Recipe) => void;
  onAddMissing: (ingredients: string[]) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  language: Language;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onCook, onAddMissing, isFavorite, onToggleFavorite, language }) => {
  const missingIngredients = recipe.ingredients.filter(i => !i.isAvailable);
  const availableIngredients = recipe.ingredients.filter(i => i.isAvailable);
  const [showIngredients, setShowIngredients] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [butterflies, setButterflies] = useState<{id: number, left: number, delay: number, tx: number}[]>([]);
  
  const t = translations[language];

  const handleYoutubeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = recipe.youtubeQuery || `How to make ${recipe.title} recipe`;
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  const handleFavoriteClick = () => {
    if (!isFavorite) {
        const count = 8;
        const newButterflies = Array.from({length: count}).map((_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 80 + 10,
            delay: Math.random() * 0.5,
            tx: (Math.random() - 0.5) * 100 
        }));
        setButterflies(newButterflies);
        setTimeout(() => setButterflies([]), 2000);
    }

    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 300);
    onToggleFavorite();
  }

  return (
    <div className="bg-white rounded-xl shadow-lg shadow-stone-200/40 hover:shadow-2xl border border-stone-100 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden">
      
      {/* Decorative Header Gradient */}
      <div className="h-28 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 relative p-5 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-20"></div>
          
          {butterflies.map(b => (
            <div 
                key={b.id} 
                className="absolute bottom-0 pointer-events-none animate-fly-up"
                style={{ 
                    left: `${b.left}%`, 
                    animationDelay: `${b.delay}s`,
                    '--tx': `${b.tx}px`
                } as React.CSSProperties}
            >
                <IconButterfly className="w-5 h-5 text-white/90" />
            </div>
          ))}

          <div className="flex justify-between items-start z-10">
              <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md shadow-sm ${
                recipe.difficulty === 'Easy' ? 'text-emerald-700' : 
                recipe.difficulty === 'Medium' ? 'text-yellow-700' : 'text-rose-700'
              }`}>
                {recipe.difficulty}
              </span>

              <button 
                onClick={handleFavoriteClick}
                className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-1.5 rounded-full text-white transition-all transform hover:scale-110 active:scale-95 z-20"
              >
                  <IconHeart className={`w-5 h-5 ${animateHeart ? 'animate-bump' : ''}`} fill={isFavorite ? "currentColor" : "none"} />
              </button>
          </div>
      </div>

      {/* Main Content */}
      <div className="p-5 pt-4 flex-grow relative -mt-4 bg-white rounded-t-lg">
        <div className="flex items-center gap-2 mb-2">
             <div className="flex items-center text-stone-500 text-[10px] font-bold bg-stone-100 px-2 py-1 rounded-md">
                <IconClock className="w-3 h-3 mr-1" />
                {recipe.prepTime}
             </div>
             {recipe.cuisine && (
                 <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2 py-1 rounded-md border border-orange-100 uppercase tracking-widest">
                    {recipe.cuisine}
                 </span>
             )}
        </div>
        
        <h3 className="text-xl font-black text-stone-800 mb-1 leading-tight tracking-tight">{recipe.title}</h3>
        <p className="text-stone-500 text-xs mb-4 leading-relaxed line-clamp-2">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-5">
            {recipe.dietaryTags.map(tag => (
                <span key={tag} className="text-[9px] uppercase font-bold px-2 py-1 rounded-md bg-stone-50 text-stone-400 border border-stone-100 tracking-wider">
                    {tag}
                </span>
            ))}
        </div>

        {/* Sommelier & Secret Section */}
        {(recipe.chefsSecret || recipe.beveragePairing) && (
             <div className="mb-5 bg-amber-50 rounded-lg p-3.5 border border-amber-100">
                 {recipe.chefsSecret && (
                    <div className="flex gap-2.5 mb-2.5 pb-2.5 border-b border-amber-200/50 last:border-0 last:mb-0 last:pb-0">
                         <div className="mt-0.5"><IconLightbulb className="w-4 h-4 text-amber-500" /></div>
                         <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-amber-500 mb-0.5">Pro Tip</p>
                             <p className="text-xs text-stone-700 italic">"{recipe.chefsSecret}"</p>
                         </div>
                    </div>
                 )}
                 {recipe.beveragePairing && (
                    <div className="flex gap-2.5">
                        <div className="mt-0.5"><IconWine className="w-4 h-4 text-purple-500" /></div>
                         <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-purple-500 mb-0.5">Pairing</p>
                             <p className="text-xs font-bold text-stone-800">{recipe.beveragePairing.name}</p>
                         </div>
                    </div>
                 )}
             </div>
        )}

        {/* Ingredient Quick View */}
        <div className="bg-stone-50 rounded-lg p-3.5 border border-stone-100">
            <button 
                onClick={() => setShowIngredients(!showIngredients)}
                className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-600 mb-1.5"
            >
                <span>{t.ingredients_label} ({recipe.ingredients.length})</span>
                <span className="text-sm font-bold">{showIngredients ? '−' : '+'}</span>
            </button>
            
            <div className={`space-y-1.5 overflow-hidden transition-all duration-300 ${showIngredients ? 'max-h-80 opacity-100' : 'max-h-16 opacity-80'}`}>
                {availableIngredients.map(i => (
                    <div key={i.name} className="flex items-center text-xs text-stone-700 font-medium">
                        <div className="w-4 h-4 rounded-md bg-emerald-100 flex items-center justify-center mr-2 flex-shrink-0">
                             <IconCheck className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        <span className="truncate">{i.name}</span>
                        <span className="text-stone-400 text-[9px] ml-auto font-bold bg-white px-1.5 py-0.5 rounded-md border border-stone-100">{i.quantity}</span>
                    </div>
                ))}
                {missingIngredients.map(i => (
                    <div key={i.name} className="flex items-center text-xs text-stone-400">
                         <div className="w-4 h-4 rounded-md bg-red-50 flex items-center justify-center mr-2 flex-shrink-0">
                             <IconCross className="w-2.5 h-2.5 text-red-400" />
                        </div>
                        <span className="truncate line-through decoration-red-200">{i.name}</span>
                        <span className="text-stone-300 text-[9px] ml-auto bg-white px-1.5 py-0.5 rounded-md border border-stone-100">{i.quantity}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-stone-100 flex flex-col gap-3 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider">
            <IconFlame className="w-3.5 h-3.5 mr-1" />
            <span>{recipe.calories} kcal</span>
          </div>
          <div className="text-[9px] font-black uppercase tracking-widest">
            {missingIngredients.length > 0 ? (
                <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">{missingIngredients.length} {t.missing_items}</span>
            ) : (
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center"><IconCheck className="w-3 h-3 mr-1"/> {t.ready_cook}</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
             <button 
                onClick={handleYoutubeClick}
                className="w-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-100"
                title={t.watch_guide}
             >
                <IconYoutube className="w-4 h-4" />
             </button>

            {missingIngredients.length > 0 && (
                <button 
                    onClick={() => onAddMissing(missingIngredients.map(i => i.name))}
                    className="flex-1 flex items-center justify-center bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 py-2.5 rounded-lg font-bold transition-all text-[10px] uppercase tracking-widest"
                >
                    <IconPlus className="w-3 h-3 mr-1" />
                    {t.add_missing}
                </button>
            )}
            <button 
              onClick={() => onCook(recipe)}
              className="flex-[2] flex items-center justify-center bg-stone-900 hover:bg-black text-white py-2.5 rounded-lg font-bold transition-all shadow-md text-[10px] uppercase tracking-widest"
            >
              <IconChefHat className="w-4 h-4 mr-2" />
              {t.cook_btn}
            </button>
        </div>
      </div>
    </div>
  );
};
