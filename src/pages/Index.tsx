import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Showcase } from '@/components/Showcase';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        
        {/* Trusted By Bar */}
        <section className="py-12 border-b border-gray-100">
          <div className="container mx-auto px-6">
            <p className="text-center text-xs uppercase tracking-widest text-gray-400 mb-8 font-mono">
              Collaborations with architectural firms worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {['VOGUE', 'ARCHITECTURAL DIGEST', 'ELLE DECOR', 'DWELL', 'WALLPAPER*'].map((brand) => (
                <span key={brand} className="text-xl font-serif tracking-tighter">{brand}</span>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid />
        
        <Showcase />

        {/* Gallery Section */}
        <section className="py-24 bg-white px-6">
          <div className="container mx-auto">
            <div className="mb-16 text-center reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl mb-4">Crafting environments</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Explore our latest projects where we transformed empty spaces into soulful homes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="reveal-on-scroll group cursor-pointer">
                <div className="rounded-cohere overflow-hidden aspect-video mb-6 relative">
                  <img 
                    src="/assets/dining.jpg" 
                    alt="Project 1" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <h4 className="text-2xl">The Glass Villa, Como</h4>
                <p className="text-gray-400">Minimalist retreat</p>
              </div>
              
              <div className="reveal-on-scroll group cursor-pointer" style={{ transitionDelay: '200ms' }}>
                <div className="rounded-cohere overflow-hidden aspect-video mb-6 relative">
                  <img 
                    src="/assets/living-room.jpg" 
                    alt="Project 2" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <h4 className="text-2xl">Oak & Marble Penthouse</h4>
                <p className="text-gray-400">Contemporary luxury</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="container mx-auto">
            <div className="bg-interaction rounded-[40px] p-12 md:p-24 text-center text-white reveal-on-scroll">
              <h2 className="text-4xl md:text-7xl mb-8 leading-tight max-w-3xl mx-auto">
                Ready to transform <br />
                your sanctuary?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                Schedule a consultation with our design team today and start your journey 
                towards a home that truly reflects who you are.
              </p>
              <button className="bg-white text-interaction rounded-full px-10 py-5 text-xl font-medium hover:bg-gray-100 transition-all active:scale-95 shadow-xl">
                Book a Consultation
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
