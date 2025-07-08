import { Link } from 'wouter';
import { ArrowLeft, Calendar, Tag, Rocket, Satellite, Globe, ChevronRight, Star, Zap, Shield } from 'lucide-react';
import { useEffect } from 'react';

const UpdatesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updates = [
    {
      version: "v2.4.0",
      date: "January 15, 2025",
      type: "Major Update",
      title: "Enhanced Analytics Dashboard",
      description: "Introducing advanced analytics with real-time insights, predictive modeling, and customizable reporting tools to help you maximize your earning potential.",
      features: [
        "Real-time performance metrics",
        "Predictive earning analytics",
        "Custom report builder",
        "Export capabilities"
      ],
      icon: Star
    },
    {
      version: "v2.3.5",
      date: "January 8, 2025",
      type: "Security Update",
      title: "Advanced Security Enhancements",
      description: "Major security improvements including enhanced encryption, two-factor authentication, and advanced fraud detection systems.",
      features: [
        "Enhanced encryption protocols",
        "Two-factor authentication",
        "Advanced fraud detection",
        "Security audit improvements"
      ],
      icon: Shield
    },
    {
      version: "v2.3.0",
      date: "December 28, 2024",
      type: "Feature Release",
      title: "Lightning-Fast Performance Boost",
      description: "Significant performance improvements with faster load times, optimized algorithms, and enhanced user experience across all platforms.",
      features: [
        "50% faster load times",
        "Optimized task algorithms",
        "Enhanced mobile experience",
        "Improved server response"
      ],
      icon: Zap
    },
    {
      version: "v2.2.8",
      date: "December 20, 2024",
      type: "Bug Fix",
      title: "UI/UX Improvements",
      description: "Various interface improvements and bug fixes to enhance user experience and platform stability.",
      features: [
        "Interface refinements",
        "Navigation improvements",
        "Bug fixes and stability",
        "Mobile optimization"
      ],
      icon: Rocket
    },
    {
      version: "v2.2.0",
      date: "December 12, 2024",
      type: "Major Update",
      title: "Task Management Revolution",
      description: "Complete overhaul of task management system with smart prioritization, automated scheduling, and enhanced productivity tools.",
      features: [
        "Smart task prioritization",
        "Automated scheduling",
        "Progress tracking",
        "Productivity insights"
      ],
      icon: Star
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Major Update':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Feature Release':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Security Update':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Bug Fix':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-primary">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/3 left-1/3"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-updates" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-updates)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-2/3 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
          <Globe className="w-12 h-12 text-slate-600" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-xl border border-primary group-hover:bg-tertiary transition-colors">
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-primary group-hover:text-white transition-colors">Thorx</span>
          </Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link 
            to="/" 
            className="text-secondary hover:text-primary transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            <span className="block text-secondary">Latest</span>
            <span>Updates</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Stay up to date with the latest features, improvements, and enhancements to the Thorx platform.
          </p>
        </div>
      </div>

      {/* Updates Timeline */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {updates.map((update, index) => (
              <div
                key={index}
                className="bg-secondary/50 p-8 rounded-2xl border border-primary hover:border-secondary transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/50 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:bg-tertiary transition-colors shadow-lg">
                      <update.icon className="w-8 h-8 text-secondary group-hover:text-tertiary transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                        {update.version}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(update.type)}`}>
                        {update.type}
                      </span>
                      <div className="flex items-center text-secondary text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {update.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-white transition-colors">
                      {update.title}
                    </h3>
                    
                    <p className="text-secondary mb-6 leading-relaxed group-hover:text-tertiary transition-colors">
                      {update.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {update.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300 transition-colors">
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Stay Updated
          </h2>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Never miss an update. Get notified about new features, improvements, and important announcements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
            />
            <button className="bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-800/50 py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-4 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 group-hover:bg-slate-700 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-slate-700/30">
                <Rocket className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors group-hover:rotate-12" />
              </div>
              <span className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors">Thorx</span>
            </Link>
            <p className="text-slate-400">Navigate the digital universe with confidence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpdatesPage;