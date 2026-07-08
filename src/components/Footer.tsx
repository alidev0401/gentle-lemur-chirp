import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white py-16 px-6 border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif mb-6">THE INTERIOR MEN</h3>
            <p className="text-gray-500 max-w-sm mb-8">
              Redefining spaces, one room at a time. Join our newsletter for design inspiration and early access to collections.
            </p>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-50 border-none rounded-full px-6 py-3 flex-grow focus:ring-1 focus:ring-interaction transition-all"
              />
              <button className="bg-black text-white rounded-full px-8 py-3 font-medium">Join</button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Portfolios</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Furniture</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Decor</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Lighting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
          <p>© 2024 The Interior Men. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-black">Instagram</a>
            <a href="#" className="hover:text-black">Pinterest</a>
            <a href="#" className="hover:text-black">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
