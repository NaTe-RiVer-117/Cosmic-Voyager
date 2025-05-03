import React from 'react';

const PlanetDetails = () => {
  const planets = [
    {
      name: "Mercury",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/mercury-messenger-globe-pia15162-800x800.jpg",
      description: "The smallest planet in our solar system and closest to the Sun.",
      facts: [
        "Diameter: 4,880 km",
        "Orbital Period: 88 Earth days",
        "Surface Temperature: -173°C to 427°C",
        "Moons: 0"
      ]
    },
    {
      name: "Venus",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/venus-magellan-colorized-800x800.jpg",
      description: "Similar in size to Earth but with a toxic atmosphere of carbon dioxide.",
      facts: [
        "Diameter: 12,104 km",
        "Orbital Period: 225 Earth days",
        "Surface Temperature: 462°C (hottest planet)",
        "Moons: 0"
      ]
    },
    {
      name: "Earth",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/earth-blue-marble-800x800.jpg",
      description: "Our home planet and the only known place in the universe confirmed to host life.",
      facts: [
        "Diameter: 12,742 km",
        "Orbital Period: 365.25 days",
        "Surface Temperature: -88°C to 58°C",
        "Moons: 1 (The Moon)"
      ]
    },
    {
      name: "Mars",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/mars-globe-valles-marineris-enhanced-800x800.jpg",
      description: "Known as the Red Planet due to iron oxide on its surface.",
      facts: [
        "Diameter: 6,779 km",
        "Orbital Period: 687 Earth days",
        "Surface Temperature: -153°C to 20°C",
        "Moons: 2 (Phobos & Deimos)"
      ]
    },
    {
      name: "Jupiter",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/jupiter-juno-800x800.jpg",
      description: "The largest planet in our solar system, a gas giant with a Great Red Spot storm.",
      facts: [
        "Diameter: 139,820 km",
        "Orbital Period: 12 Earth years",
        "Cloud Top Temperature: -145°C",
        "Moons: 95 (known)"
      ]
    },
    {
      name: "Saturn",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/saturn-cassini-800x800.jpg",
      description: "Famous for its beautiful ring system made of ice and rock particles.",
      facts: [
        "Diameter: 116,460 km",
        "Orbital Period: 29 Earth years",
        "Cloud Top Temperature: -178°C",
        "Moons: 146 (known)"
      ]
    },
    {
      name: "Uranus",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/uranus-voyager-800x800.jpg",
      description: "An ice giant that rotates on its side, with rings and a blue-green hue.",
      facts: [
        "Diameter: 50,724 km",
        "Orbital Period: 84 Earth years",
        "Cloud Top Temperature: -224°C",
        "Moons: 27"
      ]
    },
    {
      name: "Neptune",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/neptune-voyager-800x800.jpg",
      description: "The windiest planet with the strongest winds in the solar system.",
      facts: [
        "Diameter: 49,244 km",
        "Orbital Period: 165 Earth years",
        "Cloud Top Temperature: -214°C",
        "Moons: 14"
      ]
    }
  ];

  return (
    <div className="relative z-10 container mx-auto px-4 pt-[100vh]">
      <section className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto bg-black/70 p-8 rounded-xl backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-8 text-center">Solar System Planets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planets.map((planet, index) => (
              <div 
                key={index} 
                className="bg-gray-900/80 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={planet.image} 
                    alt={planet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {planet.name}
                  </h3>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-300 mb-4">{planet.description}</p>
                  
                  <div className="space-y-2">
                    {planet.facts.map((fact, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        <span className="text-sm text-gray-300">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">How to Explore</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-gray-800/50 p-4 rounded-lg max-w-xs">
                <p className="font-semibold text-cyan-400">Mouse Controls</p>
                <p className="text-sm text-gray-300">Click & drag to rotate view</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg max-w-xs">
                <p className="font-semibold text-cyan-400">Zoom</p>
                <p className="text-sm text-gray-300">Scroll wheel to zoom in/out</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg max-w-xs">
                <p className="font-semibold text-cyan-400">Auto-Rotation</p>
                <p className="text-sm text-gray-300">View automatically rotates slowly</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanetDetails;