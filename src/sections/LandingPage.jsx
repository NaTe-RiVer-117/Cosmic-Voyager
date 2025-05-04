import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import FloatingModel from '../components/FloatingModel';
import { Canvas } from '@react-three/fiber';

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 overflow-hidden flex items-center justify-center p-8">
      {/* Animated Background Particles (simplified) */}
    
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
            animate={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              transition: { duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: "reverse" }
            }}
            className="absolute w-1 h-1 rounded-full bg-white/50"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500"
        >
          Explore the Cosmos
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-white/80 mb-12"
        >
          Discover constellations, myths, and celestial wonders hidden in the night sky.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Link
            to="/celestial-guide" // Update this path to match your routing
            className="relative px-8 py-4 rounded-full text-lg font-bold text-black bg-gradient-to-r from-amber-300 to-yellow-500 shadow-lg"
          >
            <motion.span
              animate={{
                x: isHovered ? [0, -5, 5, -5, 5, 0] : 0,
                transition: { duration: 0.5 }
              }}
              className="inline-block"
            >
              Begin Stargazing →
            </motion.span>
            {isHovered && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-white shadow-sm"
              />
            )}
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute top-80 left-0 right-0 text-white/60 text-sm"
        >
          Scroll or click above to unlock the universe
        </motion.p>
      </div>
    </div>
  );
};

export default LandingPage;