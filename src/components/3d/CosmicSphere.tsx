import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CosmicSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    
    if (materialRef.current) {
      materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#D6EAF8"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

export default CosmicSphere;