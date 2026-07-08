import React from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center gap-2">
        <span className="text-xl font-serif tracking-tighter text-black">THE INTERIOR MEN</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-black transition-colors">Portfolios</a>
        <a href="#" className="hover:text-black transition-colors">Services</a>
        <a href="#" className="hover:text-black transition-colors">Process</a>
        <a href="#" className="hover:text-black transition-colors">About</a>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="hidden sm:inline-flex text-interaction hover:bg-interaction/5">
          Login
        </Button>
        <Button className="bg-black text-white rounded-full px-6 hover:bg-gray-800 transition-all">
          Start Project
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
};
