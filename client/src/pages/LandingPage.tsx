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

  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      document.body.style.backgroundColor = '';
      clearTimeout(timer);
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
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="constellation" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5" />
                  <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3" />
                  <circle cx="100" cy="150" r="1" fill="#64748b" opacity="0.4" />
                  <line x1="50" y1="50" x2="150" y2="100" stroke="#64748b" strokeWidth="0.5" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#constellation)"/>
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <Satellite className="w-8 h-8 text-slate-600" />
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 right-1/4 opacity-15"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="w-12 h-12 text-slate-600" />
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="relative z-50 flex justify-between items-center px-6 py-6">
          <motion.div 
            className="text-2xl font-bold text-slate-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Thorx
          </motion.div>
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link 
                to="/login" 
                className="text-slate-400 hover:text-slate-200 transition-colors relative group"
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
                className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-slate-600"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 -mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-slate-200 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span>Explore the</span>
                <span className="block text-slate-400">Digital Universe</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-slate-400 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Navigate through cosmic earning opportunities with Thorx. A minimalist platform designed for the modern digital explorer.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Link 
                  to="/register" 
                  className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  to="/login" 
                  className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300"
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-80 h-80 opacity-60">
                  <defs>
                    <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="80" 
                    fill="none" 
                    stroke="#475569" 
                    strokeWidth="1" 
                    opacity="0.5"
                    strokeDasharray="20 10"
                  />
                  
                  <circle cx="200" cy="200" r="4" fill="url(#centralGlow)" />
                  
                  <circle cx="280" cy="200" r="2" fill="#64748b" opacity="0.8"/>
                  <circle cx="120" cy="200" r="1.5" fill="#64748b" opacity="0.6"/>
                  <circle cx="200" cy="120" r="1" fill="#64748b" opacity="0.7"/>
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

      {/* Features Section */}
      <motion.div 
        ref={featuresRef}
        className="relative py-24 bg-slate-800"
        initial={{ opacity: 0 }}
        animate={isFeaturesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200">
              Cosmic Features
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-slate-400">
              Discover the tools that make digital earning effortless
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Task Management",
                description: "Organize and track your earning activities with precision. Complete tasks efficiently and monitor your progress in real-time with our advanced dashboard."
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard", 
                description: "Monitor your progress with detailed insights and reports. Track your earnings, completion rates, and optimize your workflow for maximum efficiency."
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Your data and earnings are protected with enterprise-grade security. We use advanced encryption and secure payment processing for your peace of mind."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group"
              >
                <feature.icon className="w-12 h-12 text-slate-400 mx-auto mb-6 group-hover:text-slate-300 transition-colors" />
                
                <h3 className="text-xl font-semibold text-slate-200 mb-3 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        ref={statsRef}
        className="relative py-24 bg-slate-900"
        initial={{ opacity: 0 }}
        animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200">
              Trusted by Thousands
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-slate-400">
              Join our growing community of successful digital earners worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users", icon: Users },
              { value: "$2M+", label: "Total Earnings", icon: DollarSign },
              { value: "50K+", label: "Tasks Completed", icon: Activity },
              { value: "99.9%", label: "Uptime", icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 group hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-slate-400 mx-auto mb-4 group-hover:text-slate-300 transition-colors" />
                
                <div className="text-3xl font-bold text-slate-200 mb-2">
                  {stat.value}
                </div>
                
                <div className="text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        ref={ctaRef}
        className="relative py-24 bg-slate-800 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-200">
              Ready to Start Your Journey?
            </h2>
            
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of Thorx. Start earning today with our proven platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/register" 
                  className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login" 
                  className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

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
                Navigate the digital universe with confidence. Your trusted partner for cosmic earning opportunities.
              </p>
            </motion.div>
            
            {[
              { title: "Product", links: ["Features", "Pricing", "Updates", "Roadmap"] },
              { title: "Support", links: ["Help Center", "Contact", "Community", "Documentation"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] }
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
              © 2025 Thorx. All rights reserved. Built for the cosmic age of digital earning.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;