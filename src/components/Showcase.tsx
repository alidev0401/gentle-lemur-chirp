import React from 'react';

export const Showcase = () => {
  return (
    <section className="py-24 bg-[#17171c] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-on-scroll">
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
              Where luxury meets <br />
              <span className="italic text-gray-400">modern living.</span>
            </h2>
            <div className="space-y-8">
              <div className="border-l-2 border-interaction pl-6">
                <h4 className="text-xl mb-2">Bespoke Craftsmanship</h4>
                <p className="text-gray-400">Every piece in our collection is handpicked for its unique story and exceptional quality.</p>
              </div>
              <div className="border-l-2 border-gray-700 pl-6">
                <h4 className="text-xl mb-2">Sustainable Elegance</h4>
                <p className="text-gray-400">We prioritize materials that are as kind to the earth as they are pleasing to the eye.</p>
              </div>
            </div>
          </div>
          
          <div className="relative reveal-on-scroll">
            <div className="rounded-cohere overflow-hidden aspect-[4/3] relative z-10">
              <img 
                src="/assets/hero-fallback.jpg" 
                alt="Modern Living" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-interaction/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
