import { useNavigate } from 'react-router-dom';

import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Text } from '@react-three/drei';
import Star from './Star';
import ConstellationLine from './ConstellationLine';

export default function ConstellationCard({ constellation, index }) {
  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-12 px-8">
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
        <Canvas className="rounded-xl border border-gray-800">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <group position={[0, 0, -10]}>
            {constellation.stars.map((star, i) => (
              <Star key={i} position={[star.x, star.y, star.z]} size={star.size} name={star.name} />
            ))}
            
            {constellation.lines.map((line, i) => {
              const start = constellation.stars[line[0]];
              const end = constellation.stars[line[1]];
              return (
                <ConstellationLine
                  key={i}
                  start={[start.x, start.y, start.z]}
                  end={[end.x, end.y, end.z]}
                />
              );
            })}
            
            <Text
              position={[0, constellation.stars[0].y + 2, constellation.stars[0].z]}
              color="#ffcc00"
              fontSize={0.8}
              anchorX="center"
              anchorY="middle"
            >
              {constellation.name}
            </Text>
          </group>
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
        </Canvas>
      </div>
      
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-400">{constellation.name}</h2>
        <p className="text-xl text-gray-300">{constellation.meaning}</p>
        
        <div className="my-6">
          <h3 className="text-2xl font-semibold mb-2">Mythology</h3>
          <p className="text-gray-400">{constellation.mythology.story}</p>
          <p className="mt-2 text-amber-200">— {constellation.mythology.culture} Legend</p>
        </div>
        
        <button 
          onClick={() => navigate(`/constellation/${index}`)}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-medium transition-colors"
        >
          Explore Details
        </button>
      </div>
    </div>
  );
}