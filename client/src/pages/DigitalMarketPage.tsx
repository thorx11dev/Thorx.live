import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { TrendingUp, Package, Zap, Star, Clock, ShoppingCart, DollarSign, Eye, Users, Calendar } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';

const DigitalMarketPage = () => {
  const { teamMember } = useTeamAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <TeamSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <TeamSidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-200">Digital Market</h1>
          <p className="text-slate-400 mt-2">This feature is coming soon...</p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-slate-200 mb-2">Digital Marketplace</h2>
          <p className="text-slate-400 mb-6">
            We're working on an exciting digital marketplace where you can buy and sell digital products, 
            services, and more. Stay tuned for updates!
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Enhanced Features</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Fast & Secure</span>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Digital Products</h3>
            <p className="text-slate-400 text-sm">
              Buy and sell digital products including software, templates, courses, and more.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Secure Payments</h3>
            <p className="text-slate-400 text-sm">
              Integrated payment system with multiple payment options for seamless transactions.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Community Market</h3>
            <p className="text-slate-400 text-sm">
              Connect with other users in a vibrant marketplace community.
            </p>
          </div>
        </div>

        {/* Update Notice */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-200">Stay Updated</h3>
              <p className="text-blue-300 text-sm">
                We'll notify all team members when the Digital Market becomes available. 
                Expected launch in the coming weeks!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketPage;