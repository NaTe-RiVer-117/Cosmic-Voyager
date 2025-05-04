import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const FloatingModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/star_sparrow_modular_spaceship.glb");
  
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={20}
      position={[0, 1, 0]} // Adjust the position as needed
    />
  );
};

// Preload the model (optional but recommended for better performance)
export const preloadModel = () => {
  useGLTF.preload("/models/star_sparrow_modular_spaceship.glb");
};

export default FloatingModel;