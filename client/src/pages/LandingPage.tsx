import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Zap, Globe, Shield, Users, TrendingUp, DollarSign, Sparkles, Star, Orbit, Satellite, Rocket, Target, Award, Activity, ChevronDown, Play, Pause } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const isHeroInView = useInView(heroRef, { amount: 0.5 });
  const isFeaturesInView = useInView(featuresRef, { amount: 0.2 });
  const isStatsInView = useInView(statsRef, { amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { amount: 0.3 });

  // Force dark theme styles for landing page only
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking for section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [heroRef, featuresRef, statsRef, ctaRef];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((ref, index) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
      
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Advanced SVG Illustrations with Animation
  const CosmicIllustration = ({ className = "w-64 h-64" }: { className?: string }) => (
    <motion.svg 
      viewBox="0 0 400 400" 
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <defs>
        <motion.pattern 
          id="starPattern" 
          x="0" y="0" 
          width="40" height="40" 
          patternUnits="userSpaceOnUse"
          animate={{ x: [0, 5, 0], y: [0, 3, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <motion.circle 
            cx="5" cy="5" r="1" 
            fill="#64748b" 
            opacity="0.6"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle 
            cx="25" cy="15" r="0.5" 
            fill="#64748b" 
            opacity="0.4"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.circle 
            cx="35" cy="35" r="0.8" 
            fill="#64748b" 
            opacity="0.5"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </motion.pattern>
        
        <motion.radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
        </motion.radialGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#starPattern)" opacity="0.3"/>
      
      <motion.circle 
        cx="200" cy="200" r="80" 
        fill="none" 
        stroke="#475569" 
        strokeWidth="1" 
        opacity="0.5"
        animate={{ 
          strokeDasharray: [0, 502], 
          strokeDashoffset: [0, -502] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "loop" 
        }}
      />
      
      <motion.circle 
        cx="200" cy="200" r="120" 
        fill="none" 
        stroke="#475569" 
        strokeWidth="1" 
        opacity="0.3"
        animate={{ 
          strokeDasharray: [0, 754], 
          strokeDashoffset: [0, 754] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "loop",
          delay: 2
        }}
      />
      
      <motion.circle 
        cx="200" cy="200" r="160" 
        fill="none" 
        stroke="#475569" 
        strokeWidth="1" 
        opacity="0.2"
        animate={{ 
          strokeDasharray: [0, 1005], 
          strokeDashoffset: [0, -1005] 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "loop",
          delay: 4
        }}
      />
      
      <motion.circle 
        cx="200" cy="200" r="4" 
        fill="url(#centralGlow)"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
      />
      
      {/* Orbiting planets */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx="280" cy="200" r="2" fill="#64748b" opacity="0.8"/>
      </motion.g>
      
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx="120" cy="200" r="1.5" fill="#64748b" opacity="0.6"/>
      </motion.g>
      
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx="200" cy="120" r="1" fill="#64748b" opacity="0.7"/>
      </motion.g>
    </motion.svg>
  );

  const NetworkIllustration = ({ className = "w-48 h-48" }: { className?: string }) => (
    <motion.svg 
      viewBox="0 0 300 300" 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <motion.path 
            d="M 20 0 L 0 0 0 20" 
            fill="none" 
            stroke="#475569" 
            strokeWidth="0.5" 
            opacity="0.2"
            animate={{ strokeDasharray: [0, 40], strokeDashoffset: [0, -40] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grid)"/>
      
      <motion.circle 
        cx="150" cy="150" r="6" 
        fill="#64748b"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
      />
      
      {/* Network nodes with staggered animation */}
      {[
        { cx: 100, cy: 100, delay: 0 },
        { cx: 200, cy: 100, delay: 0.2 },
        { cx: 100, cy: 200, delay: 0.4 },
        { cx: 200, cy: 200, delay: 0.6 },
        { cx: 80, cy: 150, delay: 0.8 },
        { cx: 220, cy: 150, delay: 1 }
      ].map((node, index) => (
        <motion.circle
          key={index}
          cx={node.cx}
          cy={node.cy}
          r="4"
          fill="#64748b"
          opacity="0.7"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0.8],
            opacity: [0, 0.7, 0.5]
          }}
          transition={{
            duration: 1.5,
            delay: node.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Animated connections */}
      {[
        { x1: 150, y1: 150, x2: 100, y2: 100, delay: 0 },
        { x1: 150, y1: 150, x2: 200, y2: 100, delay: 0.3 },
        { x1: 150, y1: 150, x2: 100, y2: 200, delay: 0.6 },
        { x1: 150, y1: 150, x2: 200, y2: 200, delay: 0.9 },
        { x1: 150, y1: 150, x2: 80, y2: 150, delay: 1.2 },
        { x1: 150, y1: 150, x2: 220, y2: 150, delay: 1.5 }
      ].map((line, index) => (
        <motion.line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#64748b"
          strokeWidth="1"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            delay: line.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </motion.svg>
  );

  // Loading Screen with Skeleton Animation
  const LoadingScreen = () => (
    <motion.div
      className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      onAnimationComplete={() => setIsLoading(false)}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-slate-700 border-t-slate-400 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          className="text-2xl font-bold text-slate-200 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Thorx
        </motion.h2>
        <motion.p
          className="text-slate-400"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing cosmic experience...
        </motion.p>
      </div>
    </motion.div>
  );

  // Interactive Navigation Indicator
  const NavigationIndicator = () => (
    <motion.div
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
    >
      {['Hero', 'Features', 'Stats', 'CTA'].map((section, index) => (
        <motion.div
          key={section}
          className={`w-2 h-8 rounded-full cursor-pointer transition-all duration-300 ${
            activeSection === index ? 'bg-slate-400' : 'bg-slate-700'
          }`}
          whileHover={{ scale: 1.2, backgroundColor: '#64748b' }}
          onClick={() => {
            const refs = [heroRef, featuresRef, statsRef, ctaRef];
            refs[index].current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ))}
    </motion.div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      <NavigationIndicator />
      
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative h-screen"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-slate-900">
          {/* Interactive Mouse Follower */}
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Constellation Background */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ y: parallaxY }}
          >
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="constellation" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <motion.circle 
                    cx="50" cy="50" r="1" 
                    fill="#64748b" 
                    opacity="0.5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.circle 
                    cx="150" cy="100" r="1" 
                    fill="#64748b" 
                    opacity="0.3"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <motion.circle 
                    cx="100" cy="150" r="1" 
                    fill="#64748b" 
                    opacity="0.4"
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.line 
                    x1="50" y1="50" x2="150" y2="100" 
                    stroke="#64748b" 
                    strokeWidth="0.5" 
                    opacity="0.1"
                    animate={{ strokeDasharray: [0, 111], strokeDashoffset: [0, -111] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#constellation)"/>
            </svg>
          </motion.div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 opacity-20"
            animate={{ 
              rotate: 360,
              y: [-10, 10, -10],
              x: [-5, 5, -5]
            }}
            transition={{ 
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.2, opacity: 0.4 }}
          >
            <Satellite className="w-8 h-8 text-slate-600" />
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 right-1/4 opacity-15"
            animate={{ 
              rotate: -360,
              scale: [1, 1.1, 1],
              y: [0, -15, 0]
            }}
            transition={{ 
              rotate: { duration: 80, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.3, opacity: 0.3 }}
          >
            <Orbit className="w-12 h-12 text-slate-600" />
          </motion.div>
          
          {/* Interactive Geometric Shapes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10 cursor-pointer"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i * 15)}%`,
              }}
              animate={{ 
                y: [-5, 5, -5],
                rotate: [0, 180, 360]
              }}
              transition={{
                y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" }
              }}
              whileHover={{ 
                scale: 1.5, 
                opacity: 0.3,
                rotate: 45
              }}
              whileTap={{ scale: 0.8 }}
            >
              <div className="w-4 h-4 border border-slate-600 rounded-sm" />
            </motion.div>
          ))}
        </div>

        {/* Navigation with Micro-interactions */}
        <nav className="relative z-50 flex justify-between items-center px-6 py-6">
          <motion.div 
            className="text-2xl font-bold text-slate-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            Thorx
          </motion.div>
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link to="/login" className="text-slate-400 hover:text-slate-200 transition-colors relative group">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  Sign In
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-slate-400 w-0 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link to="/register" className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700 relative overflow-hidden group">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10"
                >
                  Get Started
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-slate-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  initial={{ scaleX: 0 }}
                />
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content with Entrance Animations */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 -mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-slate-200 mb-6 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  Explore the
                </motion.span>
                <motion.span 
                  className="block text-slate-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  Digital Universe
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-slate-400 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                Navigate through cosmic earning opportunities with Thorx. A minimalist platform designed for the modern digital explorer.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/register" className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-2 relative overflow-hidden group">
                    <span className="relative z-10">Start Your Journey</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-slate-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      initial={{ scaleX: 0 }}
                    />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/login" className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                    Sign In
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right side - Interactive 3D Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative">
                <CosmicIllustration className="w-80 h-80 opacity-60" />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    {isPlaying ? (
                      <Rocket className="w-8 h-8 text-slate-500" />
                    ) : (
                      <Pause className="w-8 h-8 text-slate-500" />
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section with Scroll-triggered Animations */}
      <motion.div 
        ref={featuresRef}
        className="relative py-24 bg-slate-800"
        initial={{ opacity: 0 }}
        animate={isFeaturesInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-slate-200"
              animate={isFeaturesInView ? { 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Cosmic Features
            </motion.h2>
            <motion.p 
              className="text-xl max-w-2xl mx-auto text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover the tools that make digital earning effortless
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Task Management",
                description: "Organize and track your earning activities with precision",
                illustration: <NetworkIllustration className="w-32 h-32 mx-auto mb-6 opacity-40" />,
                color: "from-blue-500 to-purple-500"
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard",
                description: "Monitor your progress with detailed insights and reports",
                illustration: <CosmicIllustration className="w-32 h-32 mx-auto mb-6 opacity-40" />,
                color: "from-green-500 to-teal-500"
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Your data and earnings are protected with enterprise-grade security",
                illustration: <NetworkIllustration className="w-32 h-32 mx-auto mb-6 opacity-40" />,
                color: "from-red-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={{ scale: 0, rotate: 45 }}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isFeaturesInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {feature.illustration}
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-semibold text-slate-200 mb-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-slate-400 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section with Counter Animations */}
      <motion.div 
        ref={statsRef}
        className="relative py-24 bg-slate-900"
        initial={{ opacity: 0 }}
        animate={isStatsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users", icon: Users, end: 10000 },
              { value: "$2M+", label: "Total Earnings", icon: DollarSign, end: 2000000 },
              { value: "50K+", label: "Tasks Completed", icon: Activity, end: 50000 },
              { value: "99.9%", label: "Uptime", icon: Shield, end: 99.9 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-6 relative group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-slate-800 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                
                <motion.div
                  animate={isStatsInView ? { 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                >
                  <stat.icon className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                </motion.div>
                
                <motion.div 
                  className="text-3xl font-bold text-slate-200 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                
                <motion.div 
                  className="text-slate-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section with Motion Path Animation */}
      <motion.div 
        ref={ctaRef}
        className="relative py-24 bg-slate-800 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isCtaInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full opacity-5"
              style={{
                background: 'radial-gradient(circle, #64748b 0%, transparent 70%)',
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-slate-200"
              animate={isCtaInView ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              } : {}}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Ready to Start Your Journey?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of users who have already discovered the power of Thorx
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link to="/register" className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-2 relative overflow-hidden group">
                  <span className="relative z-10">Get Started Free</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 relative z-10" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-slate-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    initial={{ scaleX: 0 }}
                  />
                </Link>
                
                {/* Particle trail effect */}
                <motion.div
                  className="absolute -top-2 -right-2 w-2 h-2 bg-slate-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors relative overflow-hidden group">
                  <span className="relative z-10">Learn More</span>
                  <motion.div
                    className="absolute inset-0 bg-slate-700 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    initial={{ scaleX: 0 }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer with Staggered Animations */}
      <motion.footer 
        className="bg-slate-900 py-12 border-t border-slate-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold text-slate-200 mb-4">Thorx</div>
              <p className="text-slate-400">
                Navigate the digital universe with confidence
              </p>
            </motion.div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Updates"]
              },
              {
                title: "Support", 
                links: ["Help Center", "Contact", "Community"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers"]
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a 
                        href="#" 
                        className="text-slate-400 hover:text-slate-200 transition-colors relative group"
                      >
                        <motion.span whileHover={{ x: 5 }}>
                          {link}
                        </motion.span>
                        <motion.span 
                          className="absolute bottom-0 left-0 h-0.5 bg-slate-400 w-0 group-hover:w-full transition-all duration-300"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-slate-800 mt-8 pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400">
              © 2025 Thorx. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;