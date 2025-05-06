import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Model23 } from '../components/Astra23';
import { 
  Float, 
  SpotLight, 
  Sparkles, 
  OrbitControls,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Trail,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Integrated cosmos scene with model in one canvas
const CosmosScene = ({ isMobile }) => {
  // Get viewport dimensions for responsive positioning
  const viewportWidth = isMobile ? 0 : 2;
  const viewportScale = isMobile ? 1.5 : 2.2;
  
  return (
    <>
      {/* Cosmos background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={0.5} 
      />
      
      {/* Enhanced ambient lighting */}
      <ambientLight intensity={0.5} color="#cc99ff" />
      
      {/* Strong directional light for overall illumination */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={2} 
        color="#ffffff" 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Closer point lights surrounding the model */}
      {/* <pointLight position={[3, 0, 3]} intensity={5} color="#ff00ff" distance={10} />
      <pointLight position={[-3, 0, -3]} intensity={4} color="#00ffff" distance={10} />
      <pointLight position={[0, 3, 0]} intensity={6} color="#ffff00" distance={8} /> */}
      
      {/* Main model with simplified animation */}
      <CleanModel 
        position={[viewportWidth, 0, 0]} 
        scale={viewportScale} 
        isMobile={isMobile} 
      />
      
      {/* High-intensity spotlights */}
      <EnhancedSpotlights isMobile={isMobile}  />
      
      {/* Sparkles for added magic */}
      <Sparkles 
        count={isMobile ? 150 : 300}
        scale={15}
        size={2.5}
        speed={0.4}
        opacity={0.6}
        noise={[3, 3, 3]}
        color="#ff00ff"
      />
      
      {/* Additional sparkle layers with different colors */}
      <Sparkles 
        count={isMobile ? 100 : 200}
        scale={12}
        size={2}
        speed={0.3}
        opacity={0.5}
        noise={[4, 4, 4]}
        color="#00ffff"
      />
      
      <Sparkles 
        count={isMobile ? 80 : 150}
        scale={10}
        size={1.8}
        speed={0.2}
        opacity={0.4}
        noise={[5, 5, 5]}
        color="#ffff00"
      />
      
      {/* Post-processing effects with stronger bloom */}
      <EffectComposer>
        <Bloom 
          intensity={2.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
};

// Simplified model with just the rotation and floating animation
const CleanModel = ({ position, scale, isMobile }) => {
  const modelRef = useRef();
  
  // Animation
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // // Gentle rotation
      modelRef.current.rotation.z = clock.getElapsedTime() * 0.2;
      
      // Subtle floating motion
      modelRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.5;
      
      // Very subtle tilt
      modelRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.4) * 0.05;
    }
  });
  
  return (
    <group ref={modelRef} position={position} scale={scale}>
      {/* Just the model itself - no extra objects */}
      <Float 
        speed={0} 
        rotationIntensity={0.1} 
        floatIntensity={0.2}
      >
        <Model23 castShadow />
      </Float>
    </group>
  );
};

// Glowing highlights to add to the model
const GlowingHighlights = () => {
  return (
    <>
      {/* Orbital accent lights - small glowing spheres around model */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * radius,
              0.5 + i * 0.3,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#ff00ff" : "#00ffff"} />
          </mesh>
        );
      })}
    </>
  );
};

// Energy ring with enhanced glow and emissive properties
const EnergyRing = ({ radius, thickness, speed, color, opacity, emissiveIntensity = 2 }) => {
  const ringRef = useRef();
  
  useFrame(({ clock }) => {
    if (ringRef.current) {
      // Gentle rotation
      ringRef.current.rotation.x = clock.getElapsedTime() * speed;
      ringRef.current.rotation.y = clock.getElapsedTime() * speed * 0.7;
      
      // Subtle pulse
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.2) * 0.08;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 60]} />
      <MeshWobbleMaterial 
        color={color} 
        transparent 
        opacity={opacity} 
        factor={0.3} 
        speed={1}
        metalness={1}
        roughness={0}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
};

// Enhanced spotlights with much stronger impact
const EnhancedSpotlights = ({ isMobile }) => {
  // Higher intensity for dramatic effect
  const baseIntensity = isMobile ? 20 : 30;
  
  return (
    <>
      {/* Primary front spotlight - extremely bright */}
      <SpotLight
        position={[0, 2, 15]}
        intensity={baseIntensity * 1.5}
        color="#ff00ff"
        distance={50}
        angle={0.7}
        penumbra={0.5}
        decay={1}
        attenuation={3}
        anglePower={3}
        castShadow
      />
      
      {/* Side spotlights for dramatic side lighting */}
      <SpotLight
        position={[25, 5, 0]}
        intensity={baseIntensity}
        color="#00ffff"
        distance={50}
        angle={0.6}
        penumbra={0.5}
        decay={1}
        attenuation={3}
        anglePower={3}
        castShadow
      />
      
      <SpotLight
        position={[-25, 5, 0]}
        intensity={baseIntensity * 0.8}
        color="#ffff00"
        distance={50}
        angle={0.6}
        penumbra={0.5}
        decay={1}
        // attenuation={3}
        anglePower={3}
        castShadow
      />
      
      {/* Top-down spotlight for dramatic effect */}
      <SpotLight
        position={[0, 15, 0]}
        intensity={baseIntensity * 2}
        color="#ff5500"
        distance={30}
        angle={0.5}
        penumbra={0.5}
        decay={1}
        attenuation={4}
        anglePower={5}
        castShadow
      />
    </>
  );
};

// Individual moving spotlight with improved movement patterns
const MovingSpotlight = ({ color, basePosition, intensity, speed, delay, range, angle = 0.5 }) => {
  const light = useRef();
  
  useFrame(({ clock }) => {
    if (light.current) {
      const t = clock.getElapsedTime() + delay;
      
      // More natural, elliptical movement pattern
      light.current.position.x = basePosition[0] + Math.sin(t * speed) * range;
      light.current.position.y = basePosition[1] + Math.sin(t * speed * 0.7) * (range * 0.5);
      light.current.position.z = basePosition[2] + Math.cos(t * speed) * range;
      
      // Target always points at model with slight offset for visual interest
      const targetX = Math.sin(t * 0.1) * 0.5;
      const targetY = Math.sin(t * 0.08) * 0.5;
      light.current.target.position.set(targetX, targetY, 0);
      light.current.target.updateMatrixWorld();
    }
  });
  
  return (
    <SpotLight
      ref={light}
      color={color}
      position={basePosition}
      intensity={intensity}
      distance={25}
      angle={angle}
      penumbra={0.8}
      decay={1.5}
      attenuation={5}
      anglePower={4}
      castShadow
    />
  );
};

// Main landing page component
const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Comprehensive responsive handling
  useEffect(() => {
    // Function to update all size-related states
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setWindowSize({ width, height });
    };
    
    // Initial call
    handleResize();
    
    // Set up event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-screen 3D Canvas with integrated cosmos and model */}
      <Canvas 
        className="absolute inset-0"
        camera={{ 
          position: [0, 0, 15], 
          fov: isMobile ? 50 : 45
        }}
        shadows
      >
        {/* Enable controls on mobile for interactivity */}
        {isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
        
        {/* Background color */}
        <color attach="background" args={["#000008"]} />
        
        {/* Integrated cosmos scene with model */}
        <CosmosScene isMobile={isMobile} />
      </Canvas>
      
      {/* Content Container - responsive positioning */}
      <div 
        className={`absolute z-10 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center
                   ${isMobile 
                     ? 'inset-x-0 top-1/4 text-center items-center' 
                     : 'left-0 inset-y-0 max-w-md items-start'}`}
      >
        {/* Animated Title with responsive text sizes */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 
                    text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500"
        >
          Explore the Cosmos
        </motion.h1>

        {/* Subtitle with responsive sizes */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-4 sm:mb-6 md:mb-8"
        >
          Discover constellations, myths, and celestial wonders hidden in the night sky.
        </motion.p>

        {/* CTA Button with responsive sizing */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="inline-block"
        >
          <Link
            to="/celestial-guide"
            className="relative px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full 
                     text-sm sm:text-base md:text-lg font-bold text-black hover:bg-[#FFEA00]
                     bg-gradient-to-r from-amber-300 to-yellow-500   hover:shadow-[0_0_2em_#FFEA00]"
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

        {/* Footer Note - conditional display based on screen size */}
        {!isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-4 sm:mt-6 text-white/60 text-xs sm:text-sm"
          >
           "Defy the Limits"
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;