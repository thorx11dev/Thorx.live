import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Zap, Globe, Shield, Users, TrendingUp, DollarSign, Sparkles, Star, Orbit, Satellite, Rocket, Target, Award, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force dark theme styles for landing page only
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a'; // slate-900
    
    return () => {
      // Clean up when leaving landing page
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Cosmic SVG Illustrations
  const CosmicIllustration = ({ className = "w-64 h-64" }: { className?: string }) => (
    <svg viewBox="0 0 400 400" className={className}>
      <defs>
        <pattern id="starPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="#64748b" opacity="0.6"/>
          <circle cx="25" cy="15" r="0.5" fill="#64748b" opacity="0.4"/>
          <circle cx="35" cy="35" r="0.8" fill="#64748b" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#starPattern)" opacity="0.3"/>
      <circle cx="200" cy="200" r="80" fill="none" stroke="#475569" strokeWidth="1" opacity="0.5"/>
      <circle cx="200" cy="200" r="120" fill="none" stroke="#475569" strokeWidth="1" opacity="0.3"/>
      <circle cx="200" cy="200" r="160" fill="none" stroke="#475569" strokeWidth="1" opacity="0.2"/>
      <circle cx="200" cy="200" r="4" fill="#64748b"/>
      <circle cx="280" cy="200" r="2" fill="#64748b" opacity="0.8"/>
      <circle cx="120" cy="200" r="1.5" fill="#64748b" opacity="0.6"/>
      <circle cx="200" cy="120" r="1" fill="#64748b" opacity="0.7"/>
      <circle cx="200" cy="280" r="1.5" fill="#64748b" opacity="0.5"/>
    </svg>
  );

  const NetworkIllustration = ({ className = "w-48 h-48" }: { className?: string }) => (
    <svg viewBox="0 0 300 300" className={className}>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#475569" strokeWidth="0.5" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <circle cx="150" cy="150" r="6" fill="#64748b"/>
      <circle cx="100" cy="100" r="4" fill="#64748b" opacity="0.7"/>
      <circle cx="200" cy="100" r="4" fill="#64748b" opacity="0.7"/>
      <circle cx="100" cy="200" r="4" fill="#64748b" opacity="0.7"/>
      <circle cx="200" cy="200" r="4" fill="#64748b" opacity="0.7"/>
      <circle cx="80" cy="150" r="3" fill="#64748b" opacity="0.5"/>
      <circle cx="220" cy="150" r="3" fill="#64748b" opacity="0.5"/>
      <line x1="150" y1="150" x2="100" y2="100" stroke="#64748b" strokeWidth="1" opacity="0.4"/>
      <line x1="150" y1="150" x2="200" y2="100" stroke="#64748b" strokeWidth="1" opacity="0.4"/>
      <line x1="150" y1="150" x2="100" y2="200" stroke="#64748b" strokeWidth="1" opacity="0.4"/>
      <line x1="150" y1="150" x2="200" y2="200" stroke="#64748b" strokeWidth="1" opacity="0.4"/>
      <line x1="150" y1="150" x2="80" y2="150" stroke="#64748b" strokeWidth="1" opacity="0.4"/>
      <line x1="150" y1="150" x2="220" y2="150" stroke="#64748b" strokeWidth="1" opacity="0.4"/>
    </svg>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Minimalistic Dark Cosmic Background */}
        <div className="absolute inset-0 bg-slate-900">
          {/* Subtle constellation pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="constellation" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5"/>
                  <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3"/>
                  <circle cx="100" cy="150" r="1" fill="#64748b" opacity="0.4"/>
                  <circle cx="25" cy="125" r="1" fill="#64748b" opacity="0.6"/>
                  <circle cx="175" cy="25" r="1" fill="#64748b" opacity="0.2"/>
                  <line x1="50" y1="50" x2="150" y2="100" stroke="#64748b" strokeWidth="0.5" opacity="0.1"/>
                  <line x1="150" y1="100" x2="100" y2="150" stroke="#64748b" strokeWidth="0.5" opacity="0.1"/>
                  <line x1="100" y1="150" x2="25" y2="125" stroke="#64748b" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#constellation)"/>
            </svg>
          </div>
        </div>

        {/* Floating Cosmic Elements */}
        <div className="absolute inset-0 z-0">
          {/* Orbiting satellites */}
          <motion.div
            className="absolute top-1/4 left-1/4 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <Satellite className="w-8 h-8 text-slate-600" />
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 right-1/4 opacity-15"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <Orbit className="w-12 h-12 text-slate-600" />
          </motion.div>
          
          {/* Floating geometric shapes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${25 + (i * 10)}%`,
              }}
              initial={{ y: 0 }}
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 360]
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-6 h-6 border border-slate-600 rounded-sm transform rotate-45" />
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-50 flex justify-between items-center px-6 py-6">
          <div className="text-2xl font-bold text-slate-200">
            Thorx
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-slate-400 hover:text-slate-200 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 -mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-200 mb-6 leading-tight">
                Explore the
                <span className="block text-slate-400">
                  Digital Universe
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 max-w-lg">
                Navigate through cosmic earning opportunities with Thorx. A minimalist platform designed for the modern digital explorer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                  Sign In
                </Link>
              </div>
            </motion.div>

            {/* Right side - Cosmic Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <CosmicIllustration className="w-80 h-80 opacity-60" />
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
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
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
                description: "Organize and track your earning activities with precision",
                illustration: <NetworkIllustration className="w-32 h-32 mx-auto mb-6 opacity-40" />
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard",
                description: "Monitor your progress with detailed insights and reports",
                illustration: <CosmicIllustration className="w-32 h-32 mx-auto mb-6 opacity-40" />
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Your data and earnings are protected with enterprise-grade security",
                illustration: <NetworkIllustration className="w-32 h-32 mx-auto mb-6 opacity-40" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
              >
                {feature.illustration}
                <feature.icon className="w-8 h-8 text-slate-400 mx-auto mb-4" />
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
      </div>

      {/* Stats Section */}
      <div className="relative py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users", icon: Users },
              { value: "$2M+", label: "Total Earnings", icon: DollarSign },
              { value: "50K+", label: "Tasks Completed", icon: Activity },
              { value: "99.9%", label: "Uptime", icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <stat.icon className="w-8 h-8 text-slate-400 mx-auto mb-4" />
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
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-200">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of Thorx
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-slate-200 mb-4">Thorx</div>
              <p className="text-slate-400">
                Navigate the digital universe with confidence
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Careers</a></li>
              </ul>
            </div>
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