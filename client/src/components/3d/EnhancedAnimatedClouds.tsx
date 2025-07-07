import React, { useEffect, useRef, useState, useMemo } from 'react';

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

const EnhancedAnimatedClouds: React.FC<EnhancedAnimatedCloudsProps> = ({ 
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

  // Enhanced scroll handling for more dynamic parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Enhanced cloud component with realistic 3D volumetric layers
  const EnhancedCloudElement: React.FC<{ cloud: Cloud; index: number }> = ({ cloud, index }) => {
    const baseParallaxOffset = scrollY * scrollFactor * cloud.z;
    const mouseInfluence = enableInteraction ? {
      x: mousePosition.x * 15 * (1 - cloud.z),
      y: mousePosition.y * 8 * (1 - cloud.z)
    } : { x: 0, y: 0 };

    // Enhanced time-based movement with realistic waving and drifting
    const time = Date.now() * 0.0001;
    const waveTime = time * 2; // Faster wave cycles
    const driftTime = time * 0.5; // Slower drift cycles
    
    const realisticMovement = {
      // Primary wave motion (gentle up-down movement)
      waveY: Math.sin(waveTime * cloud.speedY + cloud.driftDirection) * 8,
      // Secondary wave motion (side-to-side sway)
      waveX: Math.cos(waveTime * cloud.speedX + cloud.driftDirection * 0.7) * 6,
      // Long-term drift exploration
      driftX: Math.sin(driftTime * cloud.speedX + cloud.driftDirection) * 25,
      driftY: Math.cos(driftTime * cloud.speedY + cloud.driftDirection) * 18,
      // Subtle rotation for volume effect
      rotation: Math.sin(time * cloud.rotationSpeed + cloud.id) * 3,
      // Breathing scale effect
      scale: 1 + Math.sin(time * 0.3 + cloud.id) * 0.05
    };

    return (
      <div
        className="absolute pointer-events-none select-none will-change-transform"
        style={{
          left: `${cloud.x}%`,
          top: `${cloud.y}%`,
          transform: `
            translate3d(
              ${realisticMovement.driftX + realisticMovement.waveX + mouseInfluence.x}px, 
              ${baseParallaxOffset + realisticMovement.driftY + realisticMovement.waveY + mouseInfluence.y}px, 
              ${cloud.z * 150}px
            ) 
            scale(${(cloud.z * 1.3 + 0.4) * realisticMovement.scale}) 
            rotate(${realisticMovement.rotation}deg)
          `,
          opacity: Math.max(0.15, cloud.opacity * (0.7 + cloud.z * 0.5)),
          animationDelay: `${cloud.animationDelay}s`,
          zIndex: Math.floor(cloud.z * 20) + 5,
          // Ensure clouds remain visible during scroll
          position: 'fixed',
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      >
        {/* Enhanced volumetric cloud with realistic 3D detail levels */}
        <div
          className="enhanced-cloud-shape animate-enhanced-cloud-drift animate-cloud-breathing"
          style={{
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.65}px`,
            animationDuration: `${30 / Math.max(cloud.speedX + cloud.speedY + 0.1, 0.1)}s`,
            animationDelay: `${cloud.animationDelay}s`,
            filter: `
              blur(${(1 - cloud.z) * 2 + 0.5}px) 
              brightness(${0.85 + cloud.z * 0.4})
              contrast(${1.1 + cloud.z * 0.2})
              saturate(${0.8 + cloud.z * 0.3})
            `,
            // Enhanced 3D transform for depth
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Enhanced volumetric cloud with realistic 3D detail levels */}
          <div className="cloud-layer enhanced-layer-1" style={{ '--wave-delay': cloud.animationDelay * 0.1 } as React.CSSProperties}></div>
          <div className="cloud-layer enhanced-layer-2" style={{ '--wave-delay': cloud.animationDelay * 0.15 } as React.CSSProperties}></div>
          <div className="cloud-layer enhanced-layer-3" style={{ '--wave-delay': cloud.animationDelay * 0.2 } as React.CSSProperties}></div>
          <div className="cloud-layer enhanced-layer-4" style={{ '--wave-delay': cloud.animationDelay * 0.12 } as React.CSSProperties}></div>
          <div className="cloud-layer enhanced-layer-5" style={{ '--wave-delay': cloud.animationDelay * 0.18 } as React.CSSProperties}></div>
          <div className="cloud-layer enhanced-layer-6" style={{ '--wave-delay': cloud.animationDelay * 0.25 } as React.CSSProperties}></div>
          
          {/* Enhanced 3D lighting effects with realistic shadows */}
          <div className="enhanced-cloud-highlight" style={{ '--animation-delay': cloud.animationDelay * 0.08 } as React.CSSProperties}></div>
          <div className="enhanced-cloud-highlight-2" style={{ '--animation-delay': cloud.animationDelay * 0.12 } as React.CSSProperties}></div>
          <div className="enhanced-cloud-shadow" style={{ '--animation-delay': cloud.animationDelay * 0.05 } as React.CSSProperties}></div>
          
          {/* Enhanced wispy edges with natural movement */}
          <div className="cloud-wisp cloud-wisp-1 animate-cloud-edge-wave" style={{ '--wave-delay': cloud.animationDelay * 0.3 } as React.CSSProperties}></div>
          <div className="cloud-wisp cloud-wisp-2 animate-cloud-edge-wave" style={{ '--wave-delay': cloud.animationDelay * 0.4 } as React.CSSProperties}></div>
          <div className="cloud-wisp cloud-wisp-3 animate-cloud-edge-wave" style={{ '--wave-delay': cloud.animationDelay * 0.35 } as React.CSSProperties}></div>
          
          {/* Additional volumetric depth layers for ultra-realism */}
          <div className="cloud-depth-layer cloud-depth-1"></div>
          <div className="cloud-depth-layer cloud-depth-2"></div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ 
        perspective: '3000px',
        perspectiveOrigin: '50% 50%',
        zIndex: 1
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
};

export default EnhancedAnimatedClouds;