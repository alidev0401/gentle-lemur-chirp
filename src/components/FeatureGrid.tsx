import React from 'react';

const features = [
  {
    title: "Curated Furniture",
    description: "Exclusive pieces sourced from master artisans globally.",
    image: "/assets/dining.jpg",
    category: "Curation"
  },
  {
    title: "Spatial Planning",
    description: "Optimizing flow and functionality without sacrificing beauty.",
    image: "/assets/living-room.jpg",
    category: "Architecture"
  },
  {
    title: "Atmospheric Lighting",
    description: "Setting the mood with bespoke lighting solutions.",
    image: "/assets/hero-fallback.jpg",
    category: "Ambience"
  }
];

export const FeatureGrid = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Our design <span className="text-gray-400">philosophy</span>
            </h2>
            <p className="text-gray-600 text-lg">
              We believe that your home should be an extension of your personality, 
              a sanctuary designed with precision and passion.
            </p>
          </div>
          <div className="reveal-on-scroll">
            <button className="text-interaction hover:underline underline-offset-8 font-medium">
              Explore All Services
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="reveal-on-scroll group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="overflow-hidden rounded-cohere mb-6 aspect-[4/5] bg-gray-100">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">{feature.category}</p>
              <h3 className="text-2xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
