import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        // Accelerate progress as we get closer to completion
        const increment = (100 - prev) * 0.06;
        const newProgress = Math.min(prev + increment, 99);
        
        // When we reach 99%, wait for actual loading to complete
        if (newProgress >= 99) {
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Complete loading with a slight delay to ensure animations finish
  useEffect(() => {
    if (progress >= 99) {
      const timeout = setTimeout(() => {
        if (onLoadComplete) onLoadComplete();
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoadComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Cosmic spinner */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer orbital ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-50"
          animate={{ 
            rotate: 360,
            boxShadow: ['0 0 10px #a855f7', '0 0 20px #a855f7', '0 0 10px #a855f7']
          }}
          transition={{ 
            rotate: { duration: 8, ease: 'linear', repeat: Infinity },
            boxShadow: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
          }}
        />
        
        {/* Middle orbital ring */}
        <motion.div 
          className="absolute inset-4 rounded-full border-2 border-cyan-500 opacity-50"
          animate={{ 
            rotate: -360,
            boxShadow: ['0 0 10px #06b6d4', '0 0 20px #06b6d4', '0 0 10px #06b6d4']
          }}
          transition={{ 
            rotate: { duration: 5, ease: 'linear', repeat: Infinity },
            boxShadow: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
          }}
        />
        
        {/* Inner orbital ring */}
        <motion.div 
          className="absolute inset-8 rounded-full border-2 border-yellow-500 opacity-50"
          animate={{ 
            rotate: 360,
            boxShadow: ['0 0 10px #eab308', '0 0 20px #eab308', '0 0 10px #eab308']
          }}
          transition={{ 
            rotate: { duration: 3, ease: 'linear', repeat: Infinity },
            boxShadow: { duration: 1, repeat: Infinity, repeatType: 'reverse' }
          }}
        />
        
        {/* Center planet/star */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 shadow-lg shadow-amber-500/50" />
        </motion.div>
        
        {/* Orbiting particles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 16 * 0.8;
          const delay = i * 0.2;
          const duration = 2 + Math.random();
          
          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white"
              style={{
                left: 'calc(50% - 0.75px)',
                top: 'calc(50% - 0.75px)',
                transformOrigin: 'center',
              }}
              animate={{
                x: [
                  Math.cos(angle) * radius,
                  Math.cos(angle + Math.PI/4) * radius,
                  Math.cos(angle + Math.PI/2) * radius,
                  Math.cos(angle + Math.PI*3/4) * radius,
                  Math.cos(angle + Math.PI) * radius,
                  Math.cos(angle + Math.PI*5/4) * radius,
                  Math.cos(angle + Math.PI*3/2) * radius,
                  Math.cos(angle + Math.PI*7/4) * radius,
                  Math.cos(angle) * radius,
                ],
                y: [
                  Math.sin(angle) * radius,
                  Math.sin(angle + Math.PI/4) * radius,
                  Math.sin(angle + Math.PI/2) * radius,
                  Math.sin(angle + Math.PI*3/4) * radius,
                  Math.sin(angle + Math.PI) * radius,
                  Math.sin(angle + Math.PI*5/4) * radius,
                  Math.sin(angle + Math.PI*3/2) * radius, 
                  Math.sin(angle + Math.PI*7/4) * radius,
                  Math.sin(angle) * radius,
                ],
                opacity: [0.2, 1, 0.2]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
            />
          );
        })}
      </div>
      
      {/* Loading text */}
      <motion.div
        className="text-xl text-white font-light"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Entering Cosmos
      </motion.div>
      
      {/* Progress Bar */}
      <div className="w-64 h-1 mt-6 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 via-yellow-500 to-pink-500"
          style={{ width: `${progress}%` }}
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: 'linear' 
          }}
        />
      </div>
      
      {/* Progress percentage */}
      <div className="mt-2 text-sm text-gray-400">
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;