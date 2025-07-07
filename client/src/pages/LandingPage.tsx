import { Link } from 'wouter';
import { ArrowRight, Globe, Shield, Users, TrendingUp, DollarSign, Activity, ChevronDown, Satellite, Rocket, Target, Star, Zap, Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedClouds from '../components/3d/AnimatedClouds';
import EnhancedAnimatedClouds from '../components/3d/EnhancedAnimatedClouds';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    window.scrollTo(0, 0);
    
    return () => {
      clearTimeout(timer);
    };
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
      {/* 3D Animated Clouds with Parallax Effect */}
      <EnhancedAnimatedClouds 
        density="medium" 
        scrollFactor={0.4} 
        className="z-5" 
        enableInteraction={true} 
      />
      
      {/* Hero Section */}
      <div className="relative h-screen bg-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-slate-900">
          {/* Static background gradient */}
          <div
            className="absolute w-96 h-96 rounded-full pointer-events-none opacity-20 top-1/4 left-1/4"
            style={{
              background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
            }}
          />
          
          {/* Constellation Background */}
          <div className="absolute inset-0 opacity-20">
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
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 opacity-20 animate-spin" style={{ animationDuration: '60s' }}>
            <Satellite className="w-8 h-8 text-slate-600" />
          </div>
          
          <div className="absolute top-3/4 right-1/4 opacity-15 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
            <Globe className="w-12 h-12 text-slate-600" />
          </div>
          
          {/* Geometric shapes */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute opacity-10 animate-pulse"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i * 15)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            >
              <div className="w-4 h-4 border border-slate-600 rounded-sm" />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors">
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-200">Thorx</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link 
              to="/auth" 
              className="text-slate-400 hover:text-slate-200 transition-colors relative group text-sm sm:text-base"
            >
              Sign In
              <span className="absolute bottom-0 left-0 h-0.5 bg-slate-400 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              to="/auth" 
              className="bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-slate-600 hover:to-slate-500 transition-all duration-300 text-sm sm:text-base hover:scale-105 transform active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 -mt-16 sm:-mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left px-2 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-200 mb-4 sm:mb-6 leading-tight">
                <span>Explore the</span>
                <span className="block text-slate-400">Digital Universe</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                Navigate through cosmic earning opportunities with Thorx. A minimalist platform designed for the modern digital explorer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link 
                  to="/auth" 
                  className="bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 inline-flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
                </Link>
                
                <Link 
                  to="/auth" 
                  className="bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:from-slate-600 hover:to-slate-500 transition-all duration-300 text-sm sm:text-base text-center hover:scale-105 hover:shadow-lg hover:shadow-slate-700/30 transform active:scale-95"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="hidden lg:flex justify-center">
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '60s' }}>
                  <Rocket className="w-8 h-8 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer">
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-slate-800 overflow-hidden">
        {/* Additional clouds for this section */}
        <AnimatedClouds density="low" scrollFactor={0.2} className="z-0 opacity-60" />
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-64 h-64 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-spin" style={{ animationDuration: '45s' }}>
              <polygon points="100,20 180,180 20,180" fill="#e2e8f0" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 w-48 h-48 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-pulse">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="2" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.6" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-slate-600/15 to-slate-500/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200 relative">
                <span className="relative z-10">Cosmic Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 via-slate-600/20 to-slate-700/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </h2>
            </div>
            <p className="text-xl max-w-2xl mx-auto text-slate-400 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
              Discover the tools that make digital earning effortless
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Target,
                title: "Task Management",
                description: "Organize and track your earning activities with precision",
                delay: "0.6s"
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard", 
                description: "Monitor your progress with detailed insights and reports",
                delay: "0.8s"
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Your data and earnings are protected with enterprise-grade security",
                delay: "1s"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="opacity-0 animate-[fadeInUp_1s_ease-out_var(--delay)_forwards] relative group"
                style={{ '--delay': feature.delay } as React.CSSProperties}
              >
                {/* 3D Card Container */}
                <div className="relative perspective-1000">
                  <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 
                                transition-all duration-500 group-hover:border-slate-500/50 
                                group-hover:shadow-2xl group-hover:shadow-slate-900/70
                                transform-gpu group-hover:scale-105 group-hover:-translate-y-2
                                group-hover:rotate-x-2 group-hover:rotate-y-1
                                before:absolute before:inset-0 before:bg-gradient-to-br before:from-slate-700/10 before:to-slate-800/10 
                                before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500 before:rounded-2xl">
                    
                    {/* Floating Icon Container */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl 
                                    flex items-center justify-center mx-auto 
                                    group-hover:bg-gradient-to-br group-hover:from-slate-700 group-hover:to-slate-800 
                                    transition-all duration-500 transform-gpu
                                    group-hover:scale-110 group-hover:rotate-12
                                    shadow-lg group-hover:shadow-xl group-hover:shadow-slate-700/50
                                    relative overflow-hidden">
                        
                        {/* Icon glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/20 to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        
                        <feature.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-200 
                                                transition-all duration-500 relative z-10
                                                group-hover:scale-110 group-hover:drop-shadow-lg" />
                        
                        {/* Rotating border effect */}
                        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-slate-600/30 via-slate-500/30 to-slate-600/30 
                                      rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-spin 
                                      transition-opacity duration-500" style={{ animationDuration: '8s' }}></div>
                      </div>
                      
                      {/* Floating particles around icon */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-slate-500 rounded-full opacity-0 group-hover:opacity-60 
                                     group-hover:animate-ping transition-opacity duration-500"
                            style={{
                              left: `${(i - 1) * 20}px`,
                              top: `${-10 - i * 5}px`,
                              animationDelay: `${i * 0.5}s`,
                              animationDuration: '2s'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-200 mb-4 text-center 
                                 group-hover:text-white transition-all duration-500
                                 group-hover:scale-105 group-hover:tracking-wide">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-400 text-center leading-relaxed 
                                group-hover:text-slate-300 transition-all duration-500
                                group-hover:scale-105">
                      {feature.description}
                    </p>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                                  w-0 h-0.5 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 
                                  group-hover:w-3/4 transition-all duration-700 ease-out"></div>
                  </div>
                </div>
                
                {/* Card reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-700/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl 
                              transform translate-y-full group-hover:translate-y-8 scale-90 blur-sm"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        {/* Enhanced Background with Cosmic Elements */}
        <div className="absolute inset-0">
          {/* Animated constellation pattern */}
          <div className="stars absolute inset-0 opacity-20"></div>
          <div className="stars2 absolute inset-0 opacity-15"></div>
          
          {/* Floating cosmic debris */}
          <div className="absolute top-10 right-20 w-2 h-2 bg-slate-500 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-slate-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
          
          {/* Large cosmic ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-spin" style={{ animationDuration: '60s' }}>
              <circle cx="100" cy="100" r="90" fill="none" stroke="#64748b" strokeWidth="0.5" strokeDasharray="5,5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#64748b" strokeWidth="0.3" strokeDasharray="3,3" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200 relative">
                Why Choose Thorx?
                {/* Cosmic glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400/10 to-transparent 
                              animate-pulse blur-lg scale-150 opacity-50"></div>
              </h2>
            </div>
            <p className="text-xl max-w-2xl mx-auto text-slate-400 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
              Experience the advantages that set us apart
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Complete tasks in record time with our optimized workflow",
                delay: "0.6s",
                color: "from-yellow-500/20 to-orange-500/20"
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Access to high-paying, verified opportunities only",
                delay: "0.8s",
                color: "from-blue-500/20 to-purple-500/20"
              },
              {
                icon: Award,
                title: "Certified Success",
                description: "Join thousands of successful earners in our community",
                delay: "1s",
                color: "from-green-500/20 to-emerald-500/20"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock assistance whenever you need help",
                delay: "1.2s",
                color: "from-purple-500/20 to-pink-500/20"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="opacity-0 animate-[fadeInUp_1s_ease-out_var(--delay)_forwards] group"
                style={{ '--delay': benefit.delay } as React.CSSProperties}
              >
                {/* Magnetic hover container */}
                <div className="relative perspective-1000 transform-gpu transition-transform duration-500 
                              group-hover:scale-110 group-hover:-translate-y-4">
                  
                  {/* Main card */}
                  <div className="text-center p-8 rounded-2xl relative overflow-hidden
                                border border-slate-700/30 bg-slate-800/30 backdrop-blur-xl
                                group-hover:border-slate-500/50 group-hover:bg-slate-800/50
                                transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-slate-900/80
                                before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 
                                before:group-hover:opacity-100 before:transition-opacity before:duration-700 before:rounded-2xl"
                       style={{ '--gradient': `${benefit.color}` } as React.CSSProperties}>
                    
                    {/* Dynamic gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-700 rounded-2xl`}></div>
                    
                    {/* Floating icon with orbital animation */}
                    <div className="relative mb-6">
                      <div className="inline-block p-6 rounded-full bg-slate-800/80 backdrop-blur-sm
                                    group-hover:bg-slate-700/80 transition-all duration-500 
                                    shadow-lg group-hover:shadow-xl group-hover:shadow-slate-700/50
                                    transform-gpu group-hover:scale-125 group-hover:rotate-12
                                    relative overflow-hidden border border-slate-600/30">
                        
                        {/* Icon inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 via-transparent to-slate-700/20 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                        
                        <benefit.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-200 
                                                transition-all duration-500 relative z-10
                                                group-hover:scale-110 group-hover:drop-shadow-lg 
                                                filter group-hover:brightness-125" />
                        
                        {/* Pulsing ring effect */}
                        <div className="absolute inset-0 border-2 border-slate-500/30 rounded-full 
                                      scale-100 group-hover:scale-150 opacity-100 group-hover:opacity-0 
                                      transition-all duration-1000"></div>
                      </div>
                      
                      {/* Orbital particles */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-slate-400 rounded-full opacity-0 
                                     group-hover:opacity-60 group-hover:animate-ping"
                            style={{
                              left: `${Math.cos((i * Math.PI) / 2) * 40}px`,
                              top: `${Math.sin((i * Math.PI) / 2) * 40}px`,
                              animationDelay: `${i * 0.3}s`,
                              animationDuration: '2s'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 relative z-10
                                 group-hover:text-white transition-all duration-500
                                 group-hover:scale-105 group-hover:tracking-wide">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10
                                group-hover:text-slate-300 transition-all duration-500">
                      {benefit.description}
                    </p>
                    
                    {/* Scanning line effect */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent 
                                  transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </div>
                  
                  {/* Shadow reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-700/20 
                                rounded-2xl transform translate-y-8 scale-95 opacity-0 
                                group-hover:opacity-100 group-hover:translate-y-12 group-hover:scale-90 
                                transition-all duration-700 blur-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-24 bg-slate-800 overflow-hidden">
        {/* Additional clouds for stats section */}
        <AnimatedClouds density="low" scrollFactor={0.15} className="z-0 opacity-40" />
        {/* Enhanced Background with Data Visualization Effects */}
        <div className="absolute inset-0">
          {/* Matrix-style data streams */}
          <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-transparent via-slate-600/30 to-transparent"></div>
          <div className="absolute top-0 left-32 w-px h-full bg-gradient-to-b from-transparent via-slate-500/20 to-transparent" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 right-20 w-px h-full bg-gradient-to-b from-transparent via-slate-600/25 to-transparent" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating data points */}
          <div className="absolute top-16 left-1/4 w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-24 left-1/3 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(90deg, #64748b 1px, transparent 1px),
              linear-gradient(#64748b 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
          
          {/* Animated bar chart silhouette */}
          <div className="absolute bottom-10 left-20 opacity-10">
            <svg width="100" height="40" viewBox="0 0 100 40">
              <rect x="10" y="20" width="8" height="20" fill="#64748b" className="animate-pulse" />
              <rect x="25" y="10" width="8" height="30" fill="#64748b" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <rect x="40" y="15" width="8" height="25" fill="#64748b" className="animate-pulse" style={{ animationDelay: '1s' }} />
              <rect x="55" y="5" width="8" height="35" fill="#64748b" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
              <rect x="70" y="12" width="8" height="28" fill="#64748b" className="animate-pulse" style={{ animationDelay: '2s' }} />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200 relative">
                Trusted by Thousands
                {/* Data-inspired glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 
                              animate-pulse blur-lg scale-125 opacity-30"></div>
              </h2>
            </div>
            <p className="text-xl max-w-2xl mx-auto text-slate-400 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
              Join our growing community of successful earners
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { 
                value: "10K+", 
                label: "Active Users", 
                icon: Users, 
                delay: "0.6s",
                color: "from-emerald-500/20 to-green-500/20",
                accentColor: "emerald"
              },
              { 
                value: "$2M+", 
                label: "Total Earnings", 
                icon: DollarSign, 
                delay: "0.8s",
                color: "from-yellow-500/20 to-orange-500/20",
                accentColor: "yellow"
              },
              { 
                value: "50K+", 
                label: "Tasks Completed", 
                icon: Activity, 
                delay: "1s",
                color: "from-blue-500/20 to-cyan-500/20",
                accentColor: "blue"
              },
              { 
                value: "99.9%", 
                label: "Uptime", 
                icon: Shield, 
                delay: "1.2s",
                color: "from-purple-500/20 to-pink-500/20",
                accentColor: "purple"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="opacity-0 animate-[fadeInUp_1s_ease-out_var(--delay)_forwards] group"
                style={{ '--delay': stat.delay } as React.CSSProperties}
              >
                {/* Enhanced stat card with data-theme styling */}
                <div className="relative perspective-1000 transform-gpu transition-all duration-700 
                              group-hover:scale-110 group-hover:-translate-y-6">
                  
                  {/* Main card container */}
                  <div className="p-8 rounded-2xl relative overflow-hidden
                                border border-slate-700/40 bg-slate-900/60 backdrop-blur-xl
                                group-hover:border-slate-500/60 group-hover:bg-slate-900/80
                                transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-slate-900/90
                                before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 
                                before:group-hover:opacity-100 before:transition-opacity before:duration-700 before:rounded-2xl">
                    
                    {/* Dynamic gradient overlay with stat-specific colors */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-700 rounded-2xl`}></div>
                    
                    {/* Animated icon with counter effect */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-slate-800/80 backdrop-blur-sm rounded-2xl 
                                    flex items-center justify-center mx-auto 
                                    group-hover:bg-slate-700/80 transition-all duration-500 
                                    shadow-lg group-hover:shadow-xl group-hover:shadow-slate-700/60
                                    transform-gpu group-hover:scale-125 group-hover:rotate-12
                                    relative overflow-hidden border border-slate-600/30">
                        
                        {/* Icon background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 via-transparent to-slate-700/20 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        
                        <stat.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-200 
                                           transition-all duration-500 relative z-10
                                           group-hover:scale-110 group-hover:drop-shadow-lg" />
                        
                        {/* Pulse ring indicator */}
                        <div className="absolute inset-0 border-2 border-slate-500/30 rounded-2xl 
                                      scale-100 group-hover:scale-150 opacity-100 group-hover:opacity-0 
                                      transition-all duration-1000"></div>
                        
                        {/* Data connection lines */}
                        <div className="absolute top-1/2 left-full w-4 h-px bg-gradient-to-r from-slate-500/50 to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      
                      {/* Floating data indicators */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        {[...Array(2)].map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-1 h-1 bg-${stat.accentColor}-400 rounded-full opacity-0 
                                      group-hover:opacity-60 group-hover:animate-ping`}
                            style={{
                              left: `${(i - 0.5) * 30}px`,
                              top: `${-15 - i * 8}px`,
                              animationDelay: `${i * 0.7}s`,
                              animationDuration: '2s'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Counter-style value display */}
                    <div className="text-3xl font-bold text-slate-200 mb-3 relative z-10
                                  group-hover:text-white transition-all duration-500
                                  group-hover:scale-110 group-hover:tracking-wider
                                  filter group-hover:drop-shadow-lg">
                      {stat.value}
                    </div>
                    
                    <div className="text-slate-400 group-hover:text-slate-300 transition-all duration-500 relative z-10
                                  group-hover:scale-105">
                      {stat.label}
                    </div>
                    
                    {/* Progress bar indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/30 rounded-b-2xl overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${stat.color} transform -translate-x-full 
                                     group-hover:translate-x-0 transition-transform duration-1000 ease-out`}></div>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-600/50 
                                  group-hover:bg-slate-400/70 group-hover:scale-150 transition-all duration-500"></div>
                  </div>
                  
                  {/* Enhanced reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-700/30 
                                rounded-2xl transform translate-y-8 scale-95 opacity-0 
                                group-hover:opacity-100 group-hover:translate-y-16 group-hover:scale-85 
                                transition-all duration-700 blur-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        {/* Enhanced Background with Call-to-Action Energy */}
        <div className="absolute inset-0">
          {/* Radial energy waves */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 border border-slate-700/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-4 border border-slate-600/15 rounded-full animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
            <div className="absolute inset-8 border border-slate-500/10 rounded-full animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Floating action indicators */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-emerald-500/40 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-32 right-24 w-2 h-2 bg-blue-500/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-24 left-32 w-2.5 h-2.5 bg-purple-500/35 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-20 w-1.5 h-1.5 bg-yellow-500/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Gradient spotlight effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] 
                        bg-gradient-radial from-slate-800/20 via-slate-700/10 to-transparent rounded-full blur-3xl 
                        animate-pulse opacity-60"></div>
          
          {/* Cosmic particle trails */}
          <div className="absolute top-1/4 left-10 w-px h-20 bg-gradient-to-b from-slate-500/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 right-10 w-px h-16 bg-gradient-to-t from-slate-400/25 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Enhanced heading with energy effect */}
          <div className="mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-200 relative">
              Ready to Start Your Journey?
              {/* Multi-layered glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-blue-400/10 via-purple-400/10 to-yellow-400/10 
                            animate-pulse blur-xl scale-125 opacity-40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/5 to-transparent 
                            animate-pulse blur-lg scale-110 opacity-60"></div>
            </h2>
          </div>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            Join thousands of users who have already discovered the power of Thorx
          </p>
          
          {/* Enhanced CTA buttons with magnetic hover effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            {/* Primary CTA Button */}
            <div className="relative group">
              {/* Button glow container */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-300 to-slate-100 rounded-2xl blur-lg 
                            opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-110"></div>
              
              <Link 
                to="/auth" 
                className="relative bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 
                         px-10 py-4 rounded-2xl font-bold 
                         transition-all duration-500 inline-flex items-center justify-center gap-3 
                         group-hover:scale-110 group-hover:-translate-y-1
                         group-hover:shadow-2xl group-hover:shadow-slate-300/20
                         transform-gpu perspective-1000
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent 
                         before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500 before:rounded-2xl
                         overflow-hidden border-2 border-transparent group-hover:border-slate-300/30"
              >
                {/* Button shimmer effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                  Get Started Free
                </span>
                
                {/* Enhanced arrow with trail effect */}
                <div className="relative">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  <ArrowRight className="w-5 h-5 absolute top-0 left-0 opacity-30 group-hover:translate-x-1 group-hover:opacity-0 transition-all duration-300" />
                </div>
                
                {/* Success particles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0 
                               group-hover:opacity-60 group-hover:animate-ping"
                      style={{
                        left: `${Math.cos((i * Math.PI) / 3) * 50}px`,
                        top: `${Math.sin((i * Math.PI) / 3) * 30}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '2s'
                      }}
                    ></div>
                  ))}
                </div>
              </Link>
            </div>
            
            {/* Secondary CTA Button */}
            <div className="relative group">
              {/* Button outline glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-500 rounded-2xl blur-md 
                            opacity-0 group-hover:opacity-20 transition-opacity duration-500 scale-105"></div>
              
              <Link 
                to="/features" 
                className="relative border-2 border-slate-600 bg-slate-900/60 backdrop-blur-xl text-slate-200 
                         px-10 py-4 rounded-2xl font-semibold 
                         transition-all duration-500 inline-flex items-center justify-center gap-3
                         group-hover:scale-105 group-hover:-translate-y-1
                         group-hover:border-slate-400 group-hover:bg-slate-800/80 group-hover:text-white
                         group-hover:shadow-xl group-hover:shadow-slate-700/50
                         transform-gpu perspective-1000
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-slate-700/20 before:to-slate-600/20 
                         before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500 before:rounded-2xl
                         overflow-hidden"
              >
                {/* Button scanning line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent 
                              transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                  Learn More
                </span>
                
                {/* Info particles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 
                               group-hover:opacity-40 group-hover:animate-ping"
                      style={{
                        left: `${Math.cos((i * Math.PI) / 2) * 40}px`,
                        top: `${Math.sin((i * Math.PI) / 2) * 25}px`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '2s'
                      }}
                    ></div>
                  ))}
                </div>
              </Link>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Start in 2 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="inline-block group">
                <div className="text-2xl font-bold text-slate-200 mb-4 group-hover:text-white transition-all duration-300 hover:scale-105 relative">
                  <span className="relative z-10">Thorx</span>
                  <span className="absolute inset-0 bg-slate-700/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -inset-2"></span>
                </div>
              </Link>
              <p className="text-slate-400">
                Navigate the digital universe with confidence
              </p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Updates"] },
              { title: "Support", links: ["Help Center", "Contact"] },
              { title: "Company", links: ["About", "Blog"] }
            ].map((section, index) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-slate-200 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => {
                    const linkMap = {
                      "Features": "/features",
                      "Updates": "/updates",
                      "Help Center": "/help",
                      "Contact": "/contact",
                      "About": "/about",
                      "Blog": "/blog"
                    };
                    const linkPath = linkMap[link] || "#";
                    
                    return (
                      <li key={link}>
                        <Link 
                          to={linkPath} 
                          className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:translate-x-1 hover:scale-105 inline-block relative group"
                        >
                          <span className="relative z-10">{link}</span>
                          <span className="absolute inset-0 bg-slate-700/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -inset-1"></span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 Thorx. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;