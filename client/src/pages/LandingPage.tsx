import { Link } from 'wouter';
import { ArrowRight, Rocket } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-white">
      {/* Basic Test Content */}
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Thorx Landing Page Test</h1>
        <p className="text-xl mb-8">Testing basic React rendering...</p>
        
        <div className="bg-slate-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Status Check</h2>
          <p>✅ React is rendering</p>
          <p>✅ Tailwind CSS is working</p>
          <p>✅ Components are loading</p>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/register" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            to="/login" 
            className="border border-slate-600 text-slate-200 px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;