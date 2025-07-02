import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Zap, Globe, Shield, Users, TrendingUp, DollarSign, Sparkles, Star } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    if (isLightMode) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isLightMode]);

  return (
    <div className={`relative min-h-screen overflow-hidden ${isLightMode ? 'bg-gradient-to-br from-white via-soft-pink/5 to-pale-blue/10' : ''}`}>
      {/* Hero Section with Cosmic Background */}
      <div className="relative h-screen">
        {/* Background - Different for light/dark mode */}
        {!isLightMode && (
          <div className="absolute inset-0 cosmic-bg">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>
            <div className="cosmic-gradient"></div>
          </div>
        )}
        
        {/* Enhanced Cosmic Elements for Light Mode */}
        {isLightMode && (
          <>
            {/* Mouse-following gradient effect */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(250, 218, 221, 0.3), transparent 40%)`,
              }}
            />
            
            {/* Multiple Floating Cosmic Orbs */}
            <div className="absolute inset-0 z-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute cosmic-orb"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 10}%`,
                    width: `${100 + i * 30}px`,
                    height: `${100 + i * 30}px`,
                  }}
                  animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -30, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                  }}
                  transition={{
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                >
                  <div className="cosmic-orb-inner" />
                  <div className="cosmic-orb-glow" />
                </motion.div>
              ))}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="cosmic-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* 3D Cosmic Ring */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <motion.div
                className="cosmic-ring-container"
                animate={{ rotateY: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="cosmic-ring" />
                <div className="cosmic-ring cosmic-ring-2" />
                <div className="cosmic-ring cosmic-ring-3" />
              </motion.div>
            </div>

            {/* Animated Stars */}
            <div className="absolute inset-0 z-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="cosmic-star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  <Star className="w-4 h-4 text-light-teal" />
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {/* Dark Mode Background */}
        {!isLightMode && (
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <motion.div
              className="cosmic-sphere cosmic-sphere-dark"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="cosmic-sphere-inner"></div>
              <div className="cosmic-sphere-glow"></div>
            </motion.div>
          </div>
        )}
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className={`text-6xl md:text-8xl font-bold mb-4 leading-tight ${isLightMode ? '' : 'text-primary'}`}>
                {isLightMode ? (
                  <motion.span 
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="cosmic-text font-extrabold">
                      Thorx
                    </span>
                    <motion.div
                      className="absolute -inset-4 cosmic-text-glow opacity-50"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <Sparkles className="absolute -top-6 -right-6 w-8 h-8 text-muted-yellow animate-pulse" />
                  </motion.span>
                ) : (
                  <span className="font-extrabold bg-gradient-to-r from-soft-pink via-pale-blue to-light-teal bg-clip-text text-transparent">
                    Thorx
                  </span>
                )}
              </h1>
              <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-medium ${
                isLightMode ? 'text-gray-700' : 'text-secondary'
              }`}>
                The next-generation earning platform designed for the cosmic age. 
                Join 100,000+ users in the future of digital income.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/dashboard">
                <motion.button
                  className={`relative font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 overflow-hidden ${
                    isLightMode 
                      ? 'cosmic-button-light' 
                      : 'bg-gradient-to-r from-soft-pink to-pale-blue'
                  }`}
                  style={{ 
                    color: isLightMode ? '#FFFFFF' : '#000000',
                    fontWeight: '800',
                    textShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(255,255,255,0.8)'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: isLightMode ? "0 20px 40px rgba(250, 218, 221, 0.4)" : "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLightMode && (
                    <motion.div
                      className="absolute inset-0 cosmic-button-shimmer"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  )}
                  <span className="relative z-10">Launch Dashboard</span>
                  <motion.div
                    animate={isLightMode ? { x: [0, 5, 0] } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5 relative z-10" />
                  </motion.div>
                </motion.button>
              </Link>
              
              <motion.button
                className={`backdrop-blur-lg border-2 font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  isLightMode 
                    ? 'bg-white/60 border-gray-300 text-gray-800 hover:bg-white/80' 
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                }`}
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  fontWeight: '700',
                  textShadow: isLightMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Watch Demo</span>
                <Zap className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`relative py-24 ${isLightMode ? 'bg-gray-50' : 'bg-secondary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isLightMode ? 'text-gray-800' : 'text-primary'}`}>
              Cosmic Features
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isLightMode ? 'text-gray-600' : 'text-secondary'}`}>
              Experience the future of digital earning with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                description: "Connect with opportunities worldwide through our cosmic network",
                color: "from-soft-pink to-pale-blue"
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description: "Bank-grade security with end-to-end encryption for all transactions",
                color: "from-pale-blue to-light-teal"
              },
              {
                icon: Users,
                title: "100K+ Users",
                description: "Join our thriving community of digital entrepreneurs",
                color: "from-light-teal to-muted-yellow"
              },
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                description: "Track your performance with advanced 3D visualizations",
                color: "from-muted-yellow to-peach-coral"
              },
              {
                icon: DollarSign,
                title: "Instant Payouts",
                description: "Get paid instantly with our JazzCash integration",
                color: "from-peach-coral to-soft-pink"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Experience sub-100ms response times for all operations",
                color: "from-cosmic-purple to-cosmic-blue"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className={`relative rounded-2xl p-8 transition-all duration-300 h-full overflow-hidden ${
                  isLightMode 
                    ? 'cosmic-feature-card' 
                    : 'bg-secondary shadow-primary hover:shadow-secondary border border-primary'
                }`}>
                  {isLightMode && (
                    <motion.div
                      className="absolute inset-0 cosmic-feature-gradient opacity-0"
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-6 transition-transform duration-300 relative z-10`}
                    whileHover={isLightMode ? { rotate: 360, scale: 1.2 } : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className={`text-xl font-bold mb-4 relative z-10 ${isLightMode ? 'text-gray-800' : 'text-primary'}`}>{feature.title}</h3>
                  <p className={`leading-relaxed relative z-10 ${isLightMode ? 'text-gray-600' : 'text-secondary'}`}>{feature.description}</p>
                  {isLightMode && (
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-20 h-20 cosmic-feature-orb"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`py-20 ${
        isLightMode 
          ? 'bg-gradient-to-r from-cosmic-purple/10 via-cosmic-blue/10 to-cosmic-teal/10' 
          : 'bg-gradient-to-r from-soft-pink/10 via-pale-blue/10 to-light-teal/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100K+", label: "Active Users" },
              { number: "$2M+", label: "Earned Total" },
              { number: "99.9%", label: "Uptime" },
              { number: "<100ms", label: "Response Time" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${isLightMode ? 'text-gray-800' : 'text-primary'}`}>
                  {stat.number}
                </div>
                <div className={`font-medium ${isLightMode ? 'text-gray-600' : 'text-secondary'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 ${isLightMode ? 'bg-white' : 'bg-secondary'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isLightMode ? 'text-gray-800' : 'text-primary'}`}>
              Ready to Launch Your Cosmic Journey?
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isLightMode ? 'text-gray-600' : 'text-secondary'}`}>
              Join thousands of users who are already earning with Thorx. 
              Start your journey to financial freedom today.
            </p>
            <Link to="/dashboard">
              <motion.button
                className={`font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg border-2 border-transparent ${
                  isLightMode 
                    ? 'bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-teal text-white' 
                    : 'bg-gradient-to-r from-soft-pink via-pale-blue to-light-teal'
                }`}
                style={{ 
                  color: isLightMode ? '#FFFFFF' : '#000000',
                  fontWeight: '800',
                  textShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(255,255,255,0.8)'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;