import { ShoppingCart, Package, TrendingUp, Users, Star } from 'lucide-react';

const DigitalMarketPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-200">Digital Market</h3>
        <p className="text-slate-400 text-sm">Manage digital products and marketplace operations</p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-semibold text-slate-200 mb-2">Digital Market Coming Soon</h4>
          <p className="text-slate-400 mb-6">
            We're building an amazing digital marketplace experience. Stay tuned for exciting features!
          </p>
          
          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-slate-700 rounded-lg p-4">
              <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h5 className="text-sm font-medium text-slate-200 mb-1">Product Management</h5>
              <p className="text-xs text-slate-400">Create and manage digital products</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h5 className="text-sm font-medium text-slate-200 mb-1">Sales Analytics</h5>
              <p className="text-xs text-slate-400">Track sales performance and trends</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h5 className="text-sm font-medium text-slate-200 mb-1">Customer Management</h5>
              <p className="text-xs text-slate-400">Manage customer relationships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketPage;