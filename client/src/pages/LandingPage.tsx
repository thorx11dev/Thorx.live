import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Globe, Shield, Users, TrendingUp, DollarSign, Activity, ChevronDown, Satellite, Rocket, Target, Star, Zap, Award, Clock } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    
    // Set loaded immediately for better UX
    setIsLoaded(true);
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
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
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-slate-400 rounded-full mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Thorx</h2>
          <p className="text-slate-400">Loading cosmic experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Navigation Indicator */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
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
      
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-slate-900">
          {/* Static background gradient - mouse follower disabled */}
          <div
            className="absolute w-96 h-96 rounded-full pointer-events-none opacity-20 top-1/4 left-1/4"
            style={{
              background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
            }}
          />
          
          {/* Constellation Background */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ y: parallaxY }}
          >
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="constellation" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                  </circle>
                  <circle cx="100" cy="150" r="1" fill="#64748b" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                  </circle>
                  <line x1="50" y1="50" x2="150" y2="100" stroke="#64748b" strokeWidth="0.5" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#constellation)"/>
            </svg>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 opacity-20"
            animate={{ 
              rotate: 360,
              y: [-5, 5, -5],
            }}
            transition={{ 
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Satellite className="w-8 h-8 text-slate-600" />
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 right-1/4 opacity-15"
            animate={{ 
              rotate: -360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 80, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Globe className="w-12 h-12 text-slate-600" />
          </motion.div>
          
          {/* Geometric shapes */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i * 15)}%`,
              }}
              animate={{ 
                y: [-3, 3, -3],
                rotate: [0, 180]
              }}
              transition={{
                y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className="w-4 h-4 border border-slate-600 rounded-sm" />
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div 
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-xl border border-slate-700"
              whileHover={{ scale: 1.1, rotate: 360, backgroundColor: '#475569' }}
              transition={{ duration: 0.6 }}
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            </motion.div>
            <span className="text-xl sm:text-2xl font-bold text-slate-200">Thorx</span>
          </motion.div>
          <div className="flex items-center gap-3 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link 
                to="/login" 
                className="text-slate-400 hover:text-slate-200 transition-colors relative group text-sm sm:text-base"
              >
                Sign In
                <span className="absolute bottom-0 left-0 h-0.5 bg-slate-400 w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link 
                to="/register" 
                className="bg-slate-800 text-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-slate-600 text-sm sm:text-base"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 -mt-16 sm:-mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center lg:text-left px-2 sm:px-0"
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-200 mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span>Explore the</span>
                <span className="block text-slate-400">Digital Universe</span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Navigate through cosmic earning opportunities with Thorx. A minimalist platform designed for the modern digital explorer.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Link 
                  to="/register" 
                  className="bg-slate-200 text-slate-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center justify-center gap-2 group text-sm sm:text-base"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  to="/login" 
                  className="border border-slate-600 text-slate-200 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 text-sm sm:text-base text-center"
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-60 md:w-72 lg:w-80 h-60 md:h-72 lg:h-80 opacity-60">
                  <defs>
                    <pattern id="starPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="1" fill="#64748b" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="25" cy="15" r="0.5" fill="#64748b" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
                      </circle>
                    </pattern>
                    <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  
                  <rect width="100%" height="100%" fill="url(#starPattern)" opacity="0.3"/>
                  
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="80" 
                    fill="none" 
                    stroke="#475569" 
                    strokeWidth="1" 
                    opacity="0.5"
                  >
                    <animate 
                      attributeName="stroke-dasharray" 
                      values="0 502;502 0;0 502" 
                      dur="8s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  
                  <circle cx="200" cy="200" r="4" fill="url(#centralGlow)">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      values="1;1.5;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 200 200;360 200 200"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                    <circle cx="280" cy="200" r="2" fill="#64748b" opacity="0.8"/>
                  </g>
                </svg>
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="w-8 h-8 text-slate-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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

      {/* Platform Features Section */}
      <motion.section 
        ref={featuresRef}
        className="relative py-24 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isFeaturesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-3 h-3 bg-slate-600 rounded-full" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={isFeaturesInView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-200 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                Revolutionary Platform
              </h2>
            </motion.div>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isFeaturesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience next-generation earning tools designed for the digital frontier
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: Rocket,
                title: "Quantum Task Engine",
                description: "AI-powered task optimization that adapts to your working style and maximizes efficiency",
                gradient: "from-blue-500 to-cyan-500",
                delay: 0.1
              },
              {
                icon: Globe,
                title: "Global Opportunities",
                description: "Access worldwide earning opportunities with automatic currency conversion and local compliance",
                gradient: "from-purple-500 to-pink-500",
                delay: 0.2
              },
              {
                icon: Shield,
                title: "Fortress Security",
                description: "Military-grade encryption and multi-layer protection for your data and earnings",
                gradient: "from-green-500 to-emerald-500",
                delay: 0.3
              },
              {
                icon: TrendingUp,
                title: "Predictive Analytics",
                description: "Advanced forecasting tools that predict earning trends and optimize your strategy",
                gradient: "from-orange-500 to-red-500",
                delay: 0.4
              },
              {
                icon: Users,
                title: "Community Network",
                description: "Connect with elite earners, share strategies, and unlock collaborative opportunities",
                gradient: "from-indigo-500 to-purple-500",
                delay: 0.5
              },
              {
                icon: Activity,
                title: "Real-time Pulse",
                description: "Live monitoring dashboard with instant notifications and performance tracking",
                gradient: "from-teal-500 to-cyan-500",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                transition={{ 
                  duration: 0.8, 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100
                }}
                className="group relative"
              >
                <motion.div
                  className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-500/50 transition-all duration-500 h-full relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated gradient border on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                    initial={false}
                  />
                  
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-slate-200 mb-4 text-center group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-slate-400 text-center leading-relaxed group-hover:text-slate-300 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Hover effect particles */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-slate-500 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Earning Opportunities Section */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        {/* Animated cosmic background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 90%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              backgroundSize: '100% 100%',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-6xl md:text-7xl font-bold mb-8 text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Earning Cosmos
            </motion.h2>
            <motion.p 
              className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Discover multiple revenue streams across digital galaxies
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left side - Interactive cards */}
            <div className="space-y-6">
              {[
                {
                  title: "Social Media Mastery",
                  earning: "$500-2000/month",
                  description: "Engage with brands, create content, and build your digital presence",
                  color: "from-pink-500 to-rose-500",
                  icon: Users
                },
                {
                  title: "Task Automation",
                  earning: "$300-1500/month", 
                  description: "Complete micro-tasks with AI assistance and workflow optimization",
                  color: "from-blue-500 to-indigo-500",
                  icon: Zap
                },
                {
                  title: "Creative Projects",
                  earning: "$800-3000/month",
                  description: "Leverage your skills in design, writing, and multimedia creation",
                  color: "from-purple-500 to-violet-500",
                  icon: Star
                }
              ].map((opportunity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-500/50 transition-all duration-500 relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
                    }}
                  >
                    <motion.div
                      className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${opportunity.color}`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                    
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${opportunity.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <opportunity.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                          {opportunity.title}
                        </h3>
                        <motion.div 
                          className={`text-xl font-semibold bg-gradient-to-r ${opportunity.color} bg-clip-text text-transparent mb-3`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {opportunity.earning}
                        </motion.div>
                        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                          {opportunity.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Animated illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Orbiting elements */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      transformOrigin: `${80 + i * 20}px center`,
                    }}
                  />
                ))}
                
                <motion.div
                  className="w-32 h-32 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(139, 92, 246, 0.3)',
                      '0 0 20px rgba(16, 185, 129, 0.3)',
                      '0 0 20px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <DollarSign className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <motion.section 
        ref={statsRef}
        className="relative py-32 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dynamic background grid */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(100, 116, 139, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 116, 139, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-8 text-slate-200"
              initial={{ scale: 0.8 }}
              animate={isStatsInView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Success <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">Chronicles</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Real stories from digital pioneers who transformed their earning potential
            </motion.p>
          </motion.div>

          {/* Achievement Metrics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0 }}
            animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: "25,000+", label: "Success Stories", icon: Star, color: "from-yellow-400 to-orange-400" },
              { value: "$50M+", label: "Total Earned", icon: DollarSign, color: "from-green-400 to-emerald-400" },
              { value: "180+", label: "Countries", icon: Globe, color: "from-blue-400 to-cyan-400" },
              { value: "99.8%", label: "Satisfaction", icon: Award, color: "from-purple-400 to-pink-400" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <metric.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.div 
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  {metric.value}
                </motion.div>
                
                <div className="text-slate-400 text-lg">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* User Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Content Creator",
                earnings: "$4,200/month",
                quote: "Thorx transformed my side hustle into a full-time income. The AI optimization tools are game-changing.",
                avatar: "SC",
                gradient: "from-pink-500 to-violet-500"
              },
              {
                name: "Marcus Rodriguez",
                role: "Digital Marketer", 
                earnings: "$6,800/month",
                quote: "The analytics dashboard helped me identify the most profitable opportunities. My earnings tripled in 6 months.",
                avatar: "MR",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                name: "Elena Volkov",
                role: "Freelance Designer",
                earnings: "$3,900/month",
                quote: "The community aspect is incredible. I've learned so much from other successful earners on the platform.",
                avatar: "EV", 
                gradient: "from-emerald-500 to-teal-500"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={isStatsInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                className="group"
              >
                <motion.div
                  className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 h-full hover:border-slate-500/50 transition-all duration-500 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    y: -10,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
                  }}
                >
                  <motion.div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${testimonial.gradient} opacity-10 rounded-bl-full`}
                    whileHover={{ scale: 1.2, opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex items-center mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
                      <p className="text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className={`text-2xl font-bold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent mb-4`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonial.earnings}
                  </motion.div>
                  
                  <blockquote className="text-slate-300 leading-relaxed italic group-hover:text-slate-200 transition-colors">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <motion.div
                    className="flex mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5 + index * 0.2 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Launch Command Center */}
      <motion.section 
        ref={ctaRef}
        className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated command line background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Terminal Interface */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Terminal header */}
                <div className="bg-slate-700/50 px-6 py-4 flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-slate-300 text-sm font-mono">thorx@universe:~$</div>
                </div>
                
                {/* Terminal content */}
                <div className="p-6 font-mono text-sm space-y-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-emerald-400"
                  >
                    $ ./initialize_earning_protocol.sh
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-slate-300"
                  >
                    <span className="text-cyan-400">→</span> Scanning digital opportunities...
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="text-slate-300"
                  >
                    <span className="text-cyan-400">→</span> AI optimization: <span className="text-green-400">ACTIVE</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="text-slate-300"
                  >
                    <span className="text-cyan-400">→</span> Revenue streams: <span className="text-purple-400">MULTIPLYING</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                    className="text-emerald-400 flex items-center"
                  >
                    ✓ System ready for launch
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-1"
                    >
                      _
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
                initial={{ scale: 0.9 }}
                animate={isCtaInView ? { scale: 1 } : { scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-white">Launch Your</span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                  Earning Universe
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Initialize your digital earning protocol with advanced AI assistance and unlock unlimited potential across multiple revenue galaxies.
              </motion.p>
              
              <motion.div 
                className="space-y-6 mb-10"
                initial={{ opacity: 0 }}
                animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  "Zero setup fees - Start immediately",
                  "AI-powered earning optimization",
                  "24/7 automated opportunity scanning"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex items-center text-slate-300"
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center mr-4 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                    {feature}
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden"
                >
                  <Link 
                    to="/register" 
                    className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 inline-flex items-center gap-3 group shadow-lg"
                  >
                    <Rocket className="w-6 h-6" />
                    <span>Initialize Launch</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    
                    {/* Animated shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{
                        x: [-100, 200],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 2,
                      }}
                    />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/login" 
                    className="border-2 border-slate-600 text-slate-200 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 inline-flex items-center gap-3"
                  >
                    <Activity className="w-6 h-6" />
                    <span>View Missions</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom stats row */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { number: "10K+", label: "Active Pilots", icon: Users },
              { number: "$2.5M+", label: "Universe Earnings", icon: DollarSign },
              { number: "99.9%", label: "Mission Success", icon: Target }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                className="group"
              >
                <motion.div
                  className="flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mr-3" />
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                </motion.div>
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold text-slate-200 mb-4">Thorx</div>
              <p className="text-slate-400">
                Navigate the digital universe with confidence
              </p>
            </motion.div>
            
            {[
              { title: "Product", links: ["Features", "Pricing", "Updates"] },
              { title: "Support", links: ["Help Center", "Contact", "Community"] },
              { title: "Company", links: ["About", "Blog", "Careers"] }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-slate-800 mt-8 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400">
              © 2025 Thorx. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;