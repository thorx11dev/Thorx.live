import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CircularStars = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const stars = useMemo(() => {
    const starsArray = [];
    const radius = 4;
    const count = 50;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 2;
      
      starsArray.push({
        position: [x, y, z] as [number, number, number],
        scale: Math.random() * 0.3 + 0.1,
      });
    }
    
    return starsArray;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <mesh key={index} position={star.position} scale={star.scale}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>
  );
};

export default CircularStars;