import React, { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react';
import { useOptimizedScroll, useMemoryOptimization } from '../../hooks/usePerformance';

interface Cloud {
  id: number;
  size: number;
  x: number;
  y: number;
  z: number;
  speedX: number;
  speedY: number;
  opacity: number;
  animationDelay: number;
  rotationSpeed: number;
  driftDirection: number;
}

interface EnhancedAnimatedCloudsProps {
  density?: 'low' | 'medium' | 'high';
  scrollFactor?: number;
  className?: string;
  enableInteraction?: boolean;
}

const EnhancedAnimatedClouds: React.FC<EnhancedAnimatedCloudsProps> = memo(({ 
  density = 'medium', 
  scrollFactor = 0.4,
  className = '',
  enableInteraction = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Generate clouds based on density with enhanced properties
  const clouds = useMemo(() => {
    const cloudCount = density === 'low' ? 4 : density === 'medium' ? 7 : 12;
    const newClouds: Cloud[] = [];

    for (let i = 0; i < cloudCount; i++) {
      newClouds.push({
        id: i,
        size: Math.random() * 180 + 60, // 60-240px
        x: Math.random() * 130 - 15, // -15% to 115% viewport width
        y: Math.random() * 85 + 5, // 5-90% viewport height
        z: Math.random() * 0.7 + 0.3, // 0.3-1.0 depth
        speedX: (Math.random() - 0.5) * 0.2, // Horizontal drift
        speedY: (Math.random() - 0.5) * 0.1, // Vertical drift
        opacity: Math.random() * 0.35 + 0.1, // 0.1-0.45 opacity
        animationDelay: Math.random() * 15, // 0-15s animation delay
        rotationSpeed: (Math.random() - 0.5) * 0.02, // Gentle rotation
        driftDirection: Math.random() * Math.PI * 2 // Random drift direction
      });
    }

    return newClouds;
  }, [density]);

  // Optimized scroll handling with performance hook
  const { addCleanup } = useMemoryOptimization();
  
  useOptimizedScroll(useCallback((newScrollY) => {
    setScrollY(newScrollY);
  }, []));

  // Mouse interaction for subtle cloud response
  useEffect(() => {
    if (!enableInteraction) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableInteraction]);

  // Window resize handling
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced cloud component with volumetric layers
  const EnhancedCloudElement: React.FC<{ cloud: Cloud; index: number }> = ({ cloud, index }) => {
    const baseParallaxOffset = scrollY * scrollFactor * cloud.z;
    const mouseInfluence = enableInteraction ? {
      x: mousePosition.x * 10 * (1 - cloud.z),
      y: mousePosition.y * 5 * (1 - cloud.z)
    } : { x: 0, y: 0 };

    // Time-based movement for exploration effect
    const time = Date.now() * 0.0001;
    const explorationOffset = {
      x: Math.sin(time * cloud.speedX + cloud.driftDirection) * 20,
      y: Math.cos(time * cloud.speedY + cloud.driftDirection) * 15
    };

    return (
      <div
        className="absolute pointer-events-none select-none will-change-transform"
        style={{
          left: `${cloud.x}%`,
          top: `${cloud.y}%`,
          transform: `
            translate3d(
              ${explorationOffset.x + mouseInfluence.x}px, 
              ${baseParallaxOffset + explorationOffset.y + mouseInfluence.y}px, 
              ${cloud.z * 100}px
            ) 
            scale(${cloud.z * 1.2 + 0.3}) 
            rotate(${time * cloud.rotationSpeed * 57.3}deg)
          `,
          opacity: cloud.opacity * (0.8 + cloud.z * 0.4),
          animationDelay: `${cloud.animationDelay}s`,
          zIndex: Math.floor(cloud.z * 15) + 1
        }}
      >
        {/* Enhanced volumetric cloud with multiple detail levels */}
        <div
          className="enhanced-cloud-shape animate-enhanced-cloud-drift"
          style={{
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.65}px`,
            animationDuration: `${25 / Math.max(cloud.speedX + cloud.speedY + 0.1, 0.1)}s`,
            animationDelay: `${cloud.animationDelay}s`,
            filter: `blur(${(1 - cloud.z) * 1.5 + 0.3}px) brightness(${0.9 + cloud.z * 0.3})`
          }}
        >
          {/* Primary cloud mass - 6 layers for enhanced volume */}
          <div className="cloud-layer enhanced-layer-1"></div>
          <div className="cloud-layer enhanced-layer-2"></div>
          <div className="cloud-layer enhanced-layer-3"></div>
          <div className="cloud-layer enhanced-layer-4"></div>
          <div className="cloud-layer enhanced-layer-5"></div>
          <div className="cloud-layer enhanced-layer-6"></div>
          
          {/* Enhanced lighting effects */}
          <div className="enhanced-cloud-highlight"></div>
          <div className="enhanced-cloud-highlight-2"></div>
          <div className="enhanced-cloud-shadow"></div>
          
          {/* Wispy edges for more realistic appearance */}
          <div className="cloud-wisp cloud-wisp-1"></div>
          <div className="cloud-wisp cloud-wisp-2"></div>
          <div className="cloud-wisp cloud-wisp-3"></div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ 
        perspective: '2000px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      {/* Background atmosphere for depth */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(226, 232, 240, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(203, 213, 225, 0.08) 0%, transparent 50%)
          `,
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      />

      {/* Cloud layer */}
      {clouds.map((cloud, index) => (
        <EnhancedCloudElement key={cloud.id} cloud={cloud} index={index} />
      ))}
    </div>
  );
});

export default EnhancedAnimatedClouds;