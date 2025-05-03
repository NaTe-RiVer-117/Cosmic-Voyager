import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring, Text } from '@react-three/drei';
import StarsCanvas from './StarCanvas';

const CelestialObject3D = ({
  position = [0, 0, 0],
  size = 1,
  color = 'orange',
  orbitRadius = 5,
  orbitSpeed = 0.5,
  rotationSpeed = 0.01,
  hasRing = false,
  ringSize = 1.5,
  ringColor = 'gray',
  moons = [],
  name = '',
  autoRotate = true
}) => {
  const groupRef = useRef();
  const planetRef = useRef();

  // GSAP for special animations
  useGSAP(() => {
    // Initial pulse animation
    gsap.from(planetRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    });
  }, []);

  // Three.js animation loop
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Orbital movement
      groupRef.current.position.x = Math.sin(clock.getElapsedTime() * orbitSpeed) * orbitRadius;
      groupRef.current.position.z = Math.cos(clock.getElapsedTime() * orbitSpeed) * orbitRadius;
      
      // Auto-rotation
      if (autoRotate) {
        groupRef.current.rotation.y += rotationSpeed;
      }
    }
  });

  return (
    <>
   
    <group ref={groupRef} position={position}>
      {/* Main Planet */}
      <Sphere ref={planetRef} args={[size, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>

      {/* Planetary Ring */}
      {hasRing && (
        <Ring args={[size * 0.9, size * ringSize, 32]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color={ringColor} side={2} />
        </Ring>
      )}

      {/* Moons */}
      {moons.map((moon, index) => (
        <group 
          key={index}
          position={[moon.offsetX, moon.offsetY, moon.offsetZ || 0]}
        >
          <Sphere args={[moon.size, 16, 16]}>
            <meshStandardMaterial color={moon.color} />
          </Sphere>
        </group>
      ))}

      {/* Planet Name */}
      {name && (
        <Text
          position={[0, -size * 1.5, 0]}
          fontSize={size * 0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
    </>
  );
};

export default CelestialObject3D;