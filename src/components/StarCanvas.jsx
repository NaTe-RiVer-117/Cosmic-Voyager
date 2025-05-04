"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import * as THREE from "three";

// Improved color palette with more natural star colors
const getRandomColor = () => {
  const colors = [
    '#ffffff', // white (common)
    '#f8f7ff', // soft white
    '#d4e3ff', // cool blue-white
    '#ffebd1', // warm white
    '#ffd8a8', // yellow-white
    '#ffb347', // orange (giant stars)
    '#a8f1ff', // blue (hot stars)
    '#c792ea', // violet (very hot stars)
    '#ffa8a8', // red (cool stars)
    '#ff6b6b'  // deep red (coolest stars)
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to create a more natural star distribution
const generateStarPositions = () => {
  const positions = new Float32Array(10000 * 3);
  const colors = new Float32Array(10000 * 3);
  const sizes = new Float32Array(10000);
  const alphas = new Float32Array(10000);
  
  // Create a denser core and sparser outer regions
  for (let i = 0; i < 10000; i++) {
    // Use exponential distribution for more natural clustering
    const radius = Math.pow(Math.random(), 2) * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    
    const color = new THREE.Color(getRandomColor());
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    
    // Vary star sizes based on color (hotter stars appear larger)
    const sizeVariance = 0.002 + (1 - color.r) * 0.006;
    sizes[i] = sizeVariance * (0.5 + Math.random() * 1.5);
    
    // Vary opacity based on star brightness
    alphas[i] = 0.7 + Math.random() * 0.3;
  }
  
  return { positions, colors, sizes, alphas };
};

const StarBackground = (props) => {
  const ref = useRef();
  const [stars] = useState(generateStarPositions);
  
  // More natural rotation with slight variance
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      ref.current.rotation.z += delta / 100; // subtle secondary rotation
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={stars.positions}
        colors={stars.colors}
        sizes={stars.sizes}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          vertexColors
          transparent
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={1}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const StarCanvas = () => {
  return (
    <div className="w-full h-screen pointer-events-none ">
      <Canvas 
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: false }} 
      >
        <color attach="background" args={['#000']} /> // Darker background
        <Suspense fallback={null}>
          <StarBackground />
          <EffectComposer multisampling={8}>
            <Bloom
              intensity={1.2} // More subtle bloom
              kernelSize={3}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.4}
              height={300}
              opacity={1}
            />
          </EffectComposer>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarCanvas;