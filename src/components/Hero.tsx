import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        poster="/assets/hero-fallback.jpg"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="animate-fade-up">
          <p className="text-sm uppercase tracking-[0.2em] font-mono mb-6 text-gray-300">
            Premium Home Decor & Interior Design
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9] max-w-4xl mx-auto">
            Elevating your <br />
            <span className="italic">living experience</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            We craft bespoke interiors that blend modern elegance with personal soul. 
            Transforming spaces into timeless masterpieces.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg h-auto group transition-all">
              View Portfolios
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full px-8 py-6 text-lg h-auto">
              <Play className="mr-2 h-5 w-5 fill-current" />
              Watch Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};
