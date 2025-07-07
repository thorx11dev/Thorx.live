import React, { useEffect, useRef, useState } from 'react';

interface CloudProps {
  size: number;
  x: number;
  y: number;
  z: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface AnimatedCloudsProps {
  density?: 'low' | 'medium' | 'high';
  scrollFactor?: number;
  className?: string;
}

const AnimatedClouds: React.FC<AnimatedCloudsProps> = ({ 
  density = 'medium', 
  scrollFactor = 0.5,
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [clouds, setClouds] = useState<CloudProps[]>([]);

  // Generate cloud data based on density
  const generateClouds = () => {
    const cloudCount = density === 'low' ? 3 : density === 'medium' ? 5 : 8;
    const newClouds: CloudProps[] = [];

    for (let i = 0; i < cloudCount; i++) {
      newClouds.push({
        size: Math.random() * 150 + 80, // 80-230px
        x: Math.random() * 120 - 10, // -10% to 110% viewport width
        y: Math.random() * 80 + 10, // 10-90% viewport height
        z: Math.random() * 0.8 + 0.2, // 0.2-1.0 depth
        speed: Math.random() * 0.3 + 0.1, // 0.1-0.4 animation speed
        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5 opacity
        delay: Math.random() * 10 // 0-10s animation delay
      });
    }

    setClouds(newClouds);
  };

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate clouds on mount
  useEffect(() => {
    generateClouds();
  }, [density]);

  // Create individual cloud component
  const CloudElement: React.FC<{ cloud: CloudProps; index: number }> = ({ cloud, index }) => {
    const parallaxOffset = scrollY * scrollFactor * cloud.z;
    
    return (
      <div
        className="absolute pointer-events-none select-none"
        style={{
          left: `${cloud.x}%`,
          top: `${cloud.y}%`,
          transform: `
            translateY(${parallaxOffset}px) 
            translateZ(${cloud.z * 50}px) 
            scale(${cloud.z})
          `,
          opacity: cloud.opacity,
          animationDelay: `${cloud.delay}s`,
          zIndex: Math.floor(cloud.z * 10)
        }}
      >
        {/* CSS-based volumetric cloud */}
        <div
          className="cloud-shape animate-cloud-drift"
          style={{
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            animationDuration: `${20 / cloud.speed}s`,
            animationDelay: `${cloud.delay}s`
          }}
        >
          {/* Main cloud body with multiple layers for volume */}
          <div className="cloud-layer cloud-layer-1"></div>
          <div className="cloud-layer cloud-layer-2"></div>
          <div className="cloud-layer cloud-layer-3"></div>
          <div className="cloud-layer cloud-layer-4"></div>
          <div className="cloud-layer cloud-layer-5"></div>
          
          {/* Cloud highlights and shadows for 3D effect */}
          <div className="cloud-highlight"></div>
          <div className="cloud-shadow"></div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      {clouds.map((cloud, index) => (
        <CloudElement key={index} cloud={cloud} index={index} />
      ))}
    </div>
  );
};

export default AnimatedClouds;