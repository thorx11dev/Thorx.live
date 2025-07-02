import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';

const ParticleField = () => {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    // Significantly reduced particle count for dark mode
    const particleCount = theme === 'light' ? 5000 : 1800; // Reduced from 5000 to 1800 (36% of original)
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, [theme]);

  useFrame((state) => {
    if (meshRef.current) {
      if (theme === 'light') {
        // Keep animations for light mode
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      } else {
        // Static positioning for dark mode - no rotation animations
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={theme === 'light' ? 0.02 : 0.015} // Smaller particles in dark mode
        color={theme === 'light' ? "#FADADD" : "#FFFFFF"}
        transparent
        opacity={theme === 'light' ? 0.6 : 0.4} // Lower opacity for dark mode
        sizeAttenuation={true}
      />
    </points>
  );
};

export default ParticleField;