import React, { useState } from 'react';
import StarCanvas from '../components/StarCanvas';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaStar } from "react-icons/fa6";

const CONSTELLATIONS = [
  { 
    name: "Orion", 
    meaning: "The Hunter - Symbolizing strength, adventure, and the warrior spirit" 
  },
  { 
    name: "Ursa Major", 
    meaning: "The Great Bear - Represents guidance, protection, and celestial navigation" 
  },
  { 
    name: "Lyra", 
    meaning: "The Lyre - Embodies music, poetry, and artistic creativity" 
  },
  { 
    name: "Cassiopeia", 
    meaning: "The Queen - Signifies wisdom, leadership, and sometimes vanity" 
  },
  { 
    name: "Andromeda", 
    meaning: "The Chained Princess - Represents sacrifice, liberation, and new beginnings" 
  },
  { 
    name: "Pegasus", 
    meaning: "The Winged Horse - Symbolizes inspiration, imagination, and poetic genius" 
  },
  { 
    name: "Cygnus", 
    meaning: "The Swan - Embodies transformation, beauty, and the journey of the soul" 
  },
  { 
    name: "Draco", 
    meaning: "The Dragon - Represents guardianship, ancient wisdom, and cosmic energy" 
  },
  { 
    name: "Leo", 
    meaning: "The Lion - Symbolizes courage, royalty, and the power of the sun" 
  },
  { 
    name: "Scorpius", 
    meaning: "The Scorpion - Represents passion, intensity, and the cycle of death/rebirth" 
  },
  { 
    name: "Aquila", 
    meaning: "The Eagle - Embodies vision, spiritual ascension, and divine messages" 
  },
  { 
    name: "Gemini", 
    meaning: "The Twins - Signifies duality, communication, and brotherly bonds" 
  },
  { 
    name: "Taurus", 
    meaning: "The Bull - Represents determination, earthly pleasures, and steadfastness" 
  },
  { 
    name: "Virgo", 
    meaning: "The Maiden - Symbolizes purity, harvest, and analytical wisdom" 
  },
  { 
    name: "Sagittarius", 
    meaning: "The Archer - Embodies adventure, philosophy, and the quest for truth" 
  },
  { 
    name: "Auriga", 
    meaning: "The Charioteer - Represents guidance, protection of travelers, and innovation" 
  },
  { 
    name: "Perseus", 
    meaning: "The Hero - Symbolizes bravery, rescue, and triumph over challenges" 
  },
  { 
    name: "Hercules", 
    meaning: "The Strongman - Embodies strength, labor, and the overcoming of trials" 
  },
  { 
    name: "Corvus", 
    meaning: "The Crow - Represents intelligence, prophecy, and the messenger role" 
  },
  { 
    name: "Delphinus", 
    meaning: "The Dolphin - Symbolizes playfulness, harmony, and guidance to safe harbor" 
  }
];
const CelestialGuide = () => {
  const [activeConstellation, setActiveConstellation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSelect = (constellation) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveConstellation(constellation);
      setIsLoading(false);
    }, 800); // Longer delay for dramatic effect
  };

  const constellationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const starPulse = {
    scale: [1, 1.2, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative w-full h-full bg-black ">
      <div className="absolute inset-0">
        <StarCanvas />
        <motion.button 
          onClick={() => window.location.href = "/"}
          className="absolute top-4 left-4 z-50 pointer-events-auto p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
          aria-label="Back to landing page"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft size={24} />
        </motion.button>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500">
            Celestial Guide
          </h1>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-4xl"
          initial="hidden"
          animate="visible"
        >
          {CONSTELLATIONS.map((constellation, index) => (
            <motion.button
              key={constellation.name}
              custom={index}
              variants={constellationVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => handleSelect(constellation)}
              aria-label={`Select ${constellation.name}`}
              className={`relative p-4 rounded-lg backdrop-blur-md border-2 transition-all duration-300 ${
                activeConstellation?.name === constellation.name
                  ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                  : 'border-white/30 hover:border-amber-200/50 hover:bg-white/5'
              }`}
            >
              {hoveredIndex === index && (
                <motion.div 
                  className="absolute -top-2 -right-2 text-amber-400"
                  variants={starPulse}
                >
                  <FaStar />
                </motion.div>
              )}
              <span className="text-xl font-medium text-white">{constellation.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
                className="mb-4 text-amber-400 text-4xl"
              >
                ✨
              </motion.div>
              <motion.p
                className="text-amber-200 text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Consulting the stars...
              </motion.p>
            </motion.div>
          ) : activeConstellation ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 100 }
              }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl p-6 md:p-8 rounded-xl backdrop-blur-lg bg-black/30 border border-white/20 shadow-xl relative overflow-hidden"
            >
              {/* Animated background elements */}
              <motion.div 
                className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-amber-400/10 blur-xl"
                animate={{
                  x: [0, 20, 0],
                  y: [0, 15, 0],
                  transition: { duration: 15, repeat: Infinity }
                }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-400/10 blur-xl"
                animate={{
                  x: [0, -15, 0],
                  y: [0, -10, 0],
                  transition: { duration: 12, repeat: Infinity, delay: 2 }
                }}
              />
              
              <h2 className="text-3xl font-bold mb-2 text-amber-300 relative z-10">
                {activeConstellation.name}
              </h2>
              <p className="text-xl text-white/80 relative z-10">{activeConstellation.meaning}</p>
              
              <motion.div 
                className="mt-4 h-1 bg-gradient-to-r from-amber-400 to-transparent w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 }}
              />
              
              <motion.p 
                className="mt-4 text-white/60 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                
              </motion.p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div 
          className=" bottom-6 text-white text-sm"
          initial={{ opacity: 0,scale: 8 }}
          animate={{ opacity: 1,scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          "We are all made of star-stuff" — Carl Sagan
        </motion.div>
      </div>
    </div>
  );
};

export default CelestialGuide;