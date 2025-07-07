import { Link } from 'wouter';
import { ArrowLeft, Target, TrendingUp, Shield, Zap, Star, Award, Clock, Globe, Users, Activity, DollarSign, Rocket, Satellite, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const FeaturesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Advanced Task Management",
      description: "Organize, prioritize, and track your earning activities with precision. Our intelligent system learns from your patterns to suggest optimal task sequences.",
      benefits: ["Smart task prioritization", "Progress tracking", "Deadline management", "Performance analytics"]
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics Dashboard",
      description: "Monitor your progress with detailed insights, comprehensive reports, and predictive analytics that help you maximize your earning potential.",
      benefits: ["Live performance metrics", "Earning predictions", "Market trend analysis", "Custom reports"]
    },
    {
      icon: Shield,
      title: "Enterprise-grade Security",
      description: "Your data and earnings are protected with military-grade encryption, secure payment processing, and comprehensive fraud protection.",
      benefits: ["256-bit encryption", "Secure payments", "Fraud detection", "Data backup"]
    },
    {
      icon: Zap,
      title: "Lightning-fast Performance",
      description: "Experience blazing-fast load times, instant updates, and seamless navigation powered by cutting-edge technology and optimized infrastructure.",
      benefits: ["Sub-second load times", "Real-time updates", "Global CDN", "99.9% uptime"]
    },
    {
      icon: Star,
      title: "Premium Opportunities",
      description: "Access exclusive, high-paying opportunities that are carefully vetted and verified for authenticity and profitability.",
      benefits: ["Verified opportunities", "Higher pay rates", "Exclusive access", "Quality assurance"]
    },
    {
      icon: Award,
      title: "Achievement System",
      description: "Unlock badges, reach milestones, and climb leaderboards while earning rewards for consistent performance and dedication.",
      benefits: ["Progress badges", "Milestone rewards", "Leaderboards", "Recognition system"]
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-primary">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/4 right-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-features" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-features)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-3/4 right-1/4 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
          <Globe className="w-12 h-12 text-slate-600" />
        </div>
        
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute opacity-5 animate-pulse"
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${40 + (i * 20)}%`,
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
            <span className="block text-secondary">Cosmic</span>
            <span>Features</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Discover the powerful tools and capabilities that make Thorx the ultimate platform for digital earning and productivity.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-secondary/50 p-8 rounded-2xl border border-primary hover:border-secondary transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:bg-tertiary transition-colors shadow-lg">
                      <feature.icon className="w-8 h-8 text-secondary group-hover:text-tertiary transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-secondary mb-6 leading-relaxed group-hover:text-tertiary transition-colors">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300 transition-colors">
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Ready to Experience These Features?
          </h2>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already maximizing their earning potential with Thorx's powerful features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth" 
              className="bg-gradient-to-r from-slate-200 to-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold hover:from-slate-100 hover:to-white transition-all duration-300 inline-flex items-center justify-center gap-3 group hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 transform active:scale-95"
            >
              <span>Get Started Free</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
            </Link>
            
            <Link 
              to="/" 
              className="bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 px-8 py-4 rounded-xl font-bold hover:from-slate-600 hover:to-slate-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-700/30 transform active:scale-95"
            >
              Learn More
            </Link>
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

export default FeaturesPage;