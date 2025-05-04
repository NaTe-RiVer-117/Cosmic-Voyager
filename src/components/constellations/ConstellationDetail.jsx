import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Text, Html } from '@react-three/drei';
import Star from '../Star.jsx';

import { useNavigate } from 'react-router-dom';

export default function ConstellationDetail({ constellation }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
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
                <Constellation
                  key={i}
                  start={[start.x, start.y, start.z]}
                  end={[end.x, end.y, end.z]}
                />
              );
            })}
          </group>
          
          <OrbitControls enableZoom={true} enablePan={true} />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
        </Canvas>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-amber-400 mb-4">{constellation.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Key Information</h3>
              <p>{constellation.meaning}</p>
            </div>
            
            <div className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Mythology</h3>
              <p>{constellation.mythology.story}</p>
              <p className="mt-2 text-amber-200">— {constellation.mythology.culture}</p>
            </div>
            
            <div className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Stars</h3>
              <ul className="space-y-2">
                {constellation.stars.map((star, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{star.name}</span>
                    <span className="text-amber-400">Mag {star.size.toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-8 px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-medium transition-colors"
          >
            Back to Constellations
          </button>
        </div>
      </div>
    </div>
  );
}