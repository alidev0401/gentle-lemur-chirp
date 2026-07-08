import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingContact = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-fade-in" style={{ animationDelay: '2s' }}>
      <button className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group">
        <MessageSquare className="h-5 w-5" />
        <span className="font-medium whitespace-nowrap">Consult with us</span>
      </button>
    </div>
  );
};
