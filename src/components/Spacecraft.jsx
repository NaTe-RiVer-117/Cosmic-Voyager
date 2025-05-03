import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Spacecraft = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const spacecraftRef = React.useRef(null);
  
  useGSAP(() => {
    if (isLaunched) {
      gsap.to(spacecraftRef.current, {
        y: -500,
        duration: 3,
        ease: 'power2.inOut',
        onComplete: () => {
          // Star travel animation
          gsap.to(spacecraftRef.current, {
            x: 1000,
            y: -200,
            duration: 5,
            ease: 'power1.inOut'
          });
        }
      });
      
      // Exhaust flame effect
      gsap.to('.exhaust-flame', {
        scaleY: 2,
        duration: 0.2,
        yoyo: true,
        repeat: -1
      });
    }
  }, [isLaunched]);
  
  const handleLaunch = () => {
    setIsLaunched(true);
  };

  return (
    <div 
      ref={spacecraftRef}
      className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer ${isLaunched ? '' : 'hover:scale-110 transition-transform'}`}
      onClick={!isLaunched ? handleLaunch : null}
    >
      {/* Rocket body */}
      <div className="w-12 h-24 bg-gray-200 rounded-t-lg relative">
        {/* Rocket tip */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
        
        {/* Windows */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-400"></div>
        
        {/* Exhaust */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-orange-500 rounded-b-lg overflow-hidden">
          <div className="exhaust-flame w-full h-full bg-yellow-400 origin-bottom transform scale-y-1"></div>
        </div>
      </div>
      
      {/* Fins */}
      <div className="absolute -bottom-4 -left-4 w-4 h-8 bg-red-500 transform skew-y-30"></div>
      <div className="absolute -bottom-4 -right-4 w-4 h-8 bg-red-500 transform -skew-y-30"></div>
    </div>
  );
};

export default Spacecraft;