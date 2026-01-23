import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Recipe } from '../types';
import { chatWithChef } from '../services/geminiService';
import { IconSend, IconChefHat, IconClose } from './Icons';

interface ChatBotProps {
  history: ChatMessage[];
  setHistory: (history: ChatMessage[]) => void;
  contextRecipes: Recipe[];
  onClose: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ history, setHistory, contextRecipes, onClose }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await chatWithChef(newHistory, userMsg.text, contextRecipes);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setHistory([...newHistory, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col border border-stone-200 animate-slide-up overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-orange-600 text-white flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold">
            <div className="bg-white/20 p-1.5 rounded-lg">
                <IconChefHat className="w-5 h-5" />
            </div>
            <span>Chef Assistant</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <IconClose className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50" ref={scrollRef}>
        {history.length === 0 && (
            <div className="text-center text-stone-400 text-sm mt-10">
                <IconChefHat className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Hello! Ask me anything about your recipes or cooking tips.</p>
            </div>
        )}
        {history.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-br-none' 
                    : 'bg-white text-stone-800 border border-stone-100 rounded-bl-none'
                }`}>
                    {msg.text}
                </div>
            </div>
        ))}
        {isTyping && (
            <div className="flex justify-start">
                <div className="bg-orange-50 border border-orange-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                    <span className="text-xs font-bold text-orange-400">Chef is thinking</span>
                    <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
        <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for cooking tips..."
            className="flex-1 bg-stone-100 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm outline-none transition-all"
        />
        <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            <IconSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};