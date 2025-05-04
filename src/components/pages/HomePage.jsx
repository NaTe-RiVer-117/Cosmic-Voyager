import { useRef } from 'react';

import StarBackground from '../components/common/StarBackground';
import ConstellationCard from '../components/constellations/ConstellationCard';

import ScrollIndicator from '../components/ui/ScrollIndicator';

export default function HomePage() {
  const constellations = [
    {
      name: "Orion",
      meaning: "The Hunter - Symbolizing strength and adventure",
      stars: [
        { x: 0, y: 2, z: -5, size: 1.2 },  // Betelgeuse
        { x: 1.5, y: 0, z: -5, size: 1.0 }, // Bellatrix
        { x: 1.5, y: -1, z: -5, size: 0.8 }, // Alnilam
        { x: 0, y: -2, z: -5, size: 1.1 },  // Rigel
        { x: -1.5, y: 0, z: -5, size: 0.9 } // Saiph
      ],
      lines: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]
      ]
    },
    {
      name: "Ursa Major",
      meaning: "The Great Bear - Representing guidance and protection",
      stars: [
        { x: -2, y: 3, z: -5, size: 0.9 },
        { x: -1, y: 2, z: -5, size: 0.8 },
        { x: 0, y: 2.5, z: -5, size: 0.7 },
        { x: 1, y: 3, z: -5, size: 0.8 },
        { x: 2, y: 2, z: -5, size: 0.9 },
        { x: 3, y: 1, z: -5, size: 0.7 },
        { x: 4, y: 0, z: -5, size: 0.8 }
      ],
      lines: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
      ]
    },
    // Add other constellations similarly...
  ];
  const scrollRef = useRef();

  return (
    <div className="relative overflow-y-auto h-screen snap-y snap-mandatory" ref={scrollRef}>
      <StarBackground />
      {/* <Header /> */}
      
      <section className="h-screen snap-start flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
            Celestial Explorer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Journey through the night sky and discover ancient constellations
          </p>
        </div>
      </section>

      {constellations.map((constellation, index) => (
        <section 
          key={constellation.name} 
          className="h-screen snap-start relative flex items-center justify-center"
          id={`constellation-${index}`}
        >
          <ConstellationCard 
            constellation={constellation} 
            index={index} 
            total={constellations.length} 
          />
        </section>
      ))}

      <ScrollIndicator totalSections={constellations.length + 1} />
    </div>
  );
}