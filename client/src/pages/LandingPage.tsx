import { Link } from 'wouter';
import { ArrowRight, Globe, Shield, Users, TrendingUp, DollarSign, Activity, ChevronDown, Satellite, Rocket, Target, Star, Zap, Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

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
      <div className="relative py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200">
              Cosmic Features
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-slate-400">
              Discover the tools that make digital earning effortless
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Target,
                title: "Task Management",
                description: "Organize and track your earning activities with precision"
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard", 
                description: "Monitor your progress with detailed insights and reports"
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Your data and earnings are protected with enterprise-grade security"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-700 transition-colors">
                  <feature.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-200 mb-4 text-center group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-center leading-relaxed group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200">
              Why Choose Thorx?
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-slate-400">
              Experience the advantages that set us apart
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Complete tasks in record time with our optimized workflow"
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Access to high-paying, verified opportunities only"
              },
              {
                icon: Award,
                title: "Certified Success",
                description: "Join thousands of successful earners in our community"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock assistance whenever you need help"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all duration-300 group backdrop-blur-sm hover:scale-105 hover:-translate-y-1"
              >
                <div className="inline-block p-4 rounded-full bg-slate-800 mb-4 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <benefit.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300" />
                </div>
                
                <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-white transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200">
              Trusted by Thousands
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-slate-400">
              Join our growing community of successful earners
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users", icon: Users },
              { value: "$2M+", label: "Total Earnings", icon: DollarSign },
              { value: "50K+", label: "Tasks Completed", icon: Activity },
              { value: "99.9%", label: "Uptime", icon: Shield }
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 group hover:bg-slate-900 rounded-lg transition-all duration-300 border border-transparent hover:border-slate-700 backdrop-blur-sm hover:scale-105 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <stat.icon className="w-6 h-6 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                
                <div className="text-3xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
                  {stat.value}
                </div>
                
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-200">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of Thorx
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth" 
              className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center justify-center gap-2 group hover:scale-105"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/auth" 
              className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Link>
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