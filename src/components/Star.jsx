// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';

// export default function Star({ position, size, active }) {
//   const ref = useRef();
  
//   // Add subtle animation
//   useFrame((state) => {
//     ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
//   });

//   return (
//     <mesh position={position} ref={ref}>
//       <sphereGeometry args={[size * 0.1, 16, 16]} />
//       <meshStandardMaterial 
//         color={active ? "#ffcc00" : "#ffffff"} 
//         emissive={active ? "#ffcc00" : "#ffffff"} 
//         emissiveIntensity={active ? 1 : 0.2}
//       />
//     </mesh>
//   );
// }