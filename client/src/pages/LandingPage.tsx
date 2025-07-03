import { Link } from 'wouter';
import { ArrowRight, Globe, Shield, Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-6 border-b border-slate-800">
        <div className="text-2xl font-bold text-slate-200">
          Thorx
        </div>
        <div className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 border border-slate-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-slate-200 mb-6">
            Explore the Digital Universe
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Navigate through cosmic earning opportunities with Thorx. A minimalist platform designed for the modern digital explorer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/login" 
              className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-200">
              Cosmic Features
            </h2>
            <p className="text-xl text-slate-400">
              Discover the tools that make digital earning effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-200 mb-3 text-center">
                Task Management
              </h3>
              <p className="text-slate-400 text-center">
                Organize and track your earning activities with precision and monitor your progress in real-time.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700">
              <Activity className="w-12 h-12 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-200 mb-3 text-center">
                Analytics Dashboard
              </h3>
              <p className="text-slate-400 text-center">
                Monitor your progress with detailed insights and reports to optimize your workflow.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700">
              <Shield className="w-12 h-12 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-200 mb-3 text-center">
                Secure Platform
              </h3>
              <p className="text-slate-400 text-center">
                Your data and earnings are protected with enterprise-grade security and encryption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-200">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-slate-400">
              Join our growing community of successful digital earners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <Users className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-200 mb-2">10K+</div>
              <div className="text-slate-400">Active Users</div>
            </div>

            <div className="p-6">
              <DollarSign className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-200 mb-2">$2M+</div>
              <div className="text-slate-400">Total Earnings</div>
            </div>

            <div className="p-6">
              <Activity className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-200 mb-2">50K+</div>
              <div className="text-slate-400">Tasks Completed</div>
            </div>

            <div className="p-6">
              <Shield className="w-8 h-8 text-slate-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-200 mb-2">99.9%</div>
              <div className="text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-200">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of users who have already discovered the power of Thorx. Start earning today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/login" 
              className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-slate-200 mb-4">Thorx</div>
              <p className="text-slate-400">
                Navigate the digital universe with confidence. Your trusted partner for cosmic earning opportunities.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Updates</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Community</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-slate-200">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-200">Careers</a></li>
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