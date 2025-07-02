import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';

const CircularStars = () => {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Points>(null);
  
  const { positions, colors, sizes } = useMemo(() => {
    // Significantly reduced star count for dark mode (30-40% of original)
    const count = theme === 'light' ? 3000 : 1500; // Reduced from 5000 to 1500
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Create spherical distribution
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Enhanced colors for light mode
      if (theme === 'light') {
        // Warm, golden cosmic colors for light mode
        const colorVariant = Math.random();
        if (colorVariant < 0.3) {
          // Soft pink stars
          colors[i * 3] = 0.98 + Math.random() * 0.02;     // R
          colors[i * 3 + 1] = 0.68 + Math.random() * 0.1;  // G
          colors[i * 3 + 2] = 0.87 + Math.random() * 0.1;  // B
        } else if (colorVariant < 0.6) {
          // Pale blue stars
          colors[i * 3] = 0.84 + Math.random() * 0.1;      // R
          colors[i * 3 + 1] = 0.92 + Math.random() * 0.05; // G
          colors[i * 3 + 2] = 0.97 + Math.random() * 0.03; // B
        } else {
          // Light teal stars
          colors[i * 3] = 0.82 + Math.random() * 0.1;      // R
          colors[i * 3 + 1] = 0.95 + Math.random() * 0.05; // G
          colors[i * 3 + 2] = 0.92 + Math.random() * 0.05; // B
        }
      } else {
        // Minimal white stars for dark mode - consistent color
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      }
      
      // Consistent small-to-medium sizes for dark mode
      sizes[i] = theme === 'light' ? 
        (0.5 + Math.random() * 1.5) : 
        (0.4 + Math.random() * 0.6); // More consistent, smaller size range
    }
    
    return { positions, colors, sizes };
  }, [theme]);

  useFrame((state) => {
    if (meshRef.current) {
      if (theme === 'light') {
        // Keep animations for light mode
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.01;
      } else {
        // Static positioning for dark mode - no rotation animations
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
        meshRef.current.rotation.z = 0;
      }
    }
  });

  // Create circular texture for stars
  const circularTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d')!;
    
    // Create radial gradient for circular star
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={theme === 'light' ? 1.2 : 0.7} // Smaller stars in dark mode
        transparent
        opacity={theme === 'light' ? 0.9 : 0.5} // Lower opacity for dark mode (0.4-0.6 range)
        sizeAttenuation={true}
        alphaTest={0.1}
        map={circularTexture}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
        depthWrite={false}
      />
    </points>
  );
};

export default CircularStars;