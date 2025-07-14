import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Star,
  Filter,
  Search,
  Plus,
  Edit3,
  Trash2,
  ShoppingBag,
  BarChart3,
  Tags,
  Calendar,
  RefreshCw,
  Download,
  Upload,
  Users,
  Target
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: 'active' | 'inactive' | 'pending';
  sales: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

interface MarketStats {
  totalProducts: number;
  activeProducts: number;
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  pendingProducts: number;
}

const DigitalMarketPage = () => {
  const { teamMember } = useTeamAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'analytics' | 'orders' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<MarketStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    averageRating: 0,
    pendingProducts: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    status: 'active' as 'active' | 'inactive' | 'pending'
  });

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Thorx Premium Account',
          description: 'Unlock premium features and higher earning potential',
          price: 29.99,
          category: 'Subscriptions',
          image: '/api/placeholder/300/200',
          status: 'active',
          sales: 156,
          rating: 4.8,
          reviews: 89,
          createdAt: '2025-01-10',
          updatedAt: '2025-01-14'
        },
        {
          id: 2,
          name: 'Cosmic Earning Guide',
          description: 'Complete guide to maximize your earnings on Thorx',
          price: 19.99,
          category: 'Digital Products',
          image: '/api/placeholder/300/200',
          status: 'active',
          sales: 234,
          rating: 4.6,
          reviews: 167,
          createdAt: '2025-01-08',
          updatedAt: '2025-01-12'
        },
        {
          id: 3,
          name: 'Task Automation Tools',
          description: 'Automated tools to complete tasks more efficiently',
          price: 39.99,
          category: 'Software',
          image: '/api/placeholder/300/200',
          status: 'pending',
          sales: 45,
          rating: 4.9,
          reviews: 23,
          createdAt: '2025-01-05',
          updatedAt: '2025-01-14'
        },
        {
          id: 4,
          name: 'Referral Marketing Course',
          description: 'Learn advanced referral strategies for better conversions',
          price: 49.99,
          category: 'Education',
          image: '/api/placeholder/300/200',
          status: 'active',
          sales: 78,
          rating: 4.7,
          reviews: 45,
          createdAt: '2025-01-03',
          updatedAt: '2025-01-10'
        },
        {
          id: 5,
          name: 'Analytics Dashboard Pro',
          description: 'Advanced analytics and insights for your Thorx account',
          price: 24.99,
          category: 'Software',
          image: '/api/placeholder/300/200',
          status: 'inactive',
          sales: 12,
          rating: 4.3,
          reviews: 8,
          createdAt: '2025-01-01',
          updatedAt: '2025-01-08'
        }
      ];

      setProducts(mockProducts);
      
      // Calculate stats
      const activeProducts = mockProducts.filter(p => p.status === 'active').length;
      const totalSales = mockProducts.reduce((sum, p) => sum + p.sales, 0);
      const totalRevenue = mockProducts.reduce((sum, p) => sum + (p.sales * p.price), 0);
      const averageRating = mockProducts.reduce((sum, p) => sum + p.rating, 0) / mockProducts.length;
      const pendingProducts = mockProducts.filter(p => p.status === 'pending').length;

      setStats({
        totalProducts: mockProducts.length,
        activeProducts,
        totalSales,
        totalRevenue,
        averageRating,
        pendingProducts
      });
    } catch (error) {
      console.error('Error loading market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) return;

    try {
      const productData: Product = {
        id: Date.now(),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        image: newProduct.image || '/api/placeholder/300/200',
        status: newProduct.status,
        sales: 0,
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setProducts(prev => [productData, ...prev]);
      setShowProductModal(false);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        status: 'active'
      });
      
      // Recalculate stats
      await loadMarketData();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      status: product.status
    });
    setShowProductModal(true);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const updatedProduct: Product = {
        ...editingProduct,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        image: newProduct.image,
        status: newProduct.status,
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setProducts(prev => 
        prev.map(p => p.id === editingProduct.id ? updatedProduct : p)
      );
      setShowProductModal(false);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        status: 'active'
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      setProducts(prev => prev.filter(p => p.id !== productId));
      await loadMarketData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-500/20 text-green-400',
      'inactive': 'bg-gray-500/20 text-gray-400',
      'pending': 'bg-yellow-500/20 text-yellow-400'
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <span>Digital Market</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage digital products and marketplace</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={loadMarketData}
            disabled={loading}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-200 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowProductModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-slate-200">{stats.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Products</p>
              <p className="text-2xl font-bold text-green-400">{stats.activeProducts}</p>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Sales</p>
              <p className="text-2xl font-bold text-purple-400">{stats.totalSales}</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-yellow-400">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Avg Rating</p>
              <p className="text-2xl font-bold text-orange-400">{stats.averageRating.toFixed(1)}</p>
            </div>
            <Star className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-red-400">{stats.pendingProducts}</p>
            </div>
            <Target className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-700">
        {[
          { id: 'products', label: 'Products', icon: Package },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'orders', label: 'Orders', icon: ShoppingCart },
          { id: 'categories', label: 'Categories', icon: Tags }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-700 text-white border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="bg-slate-800 rounded-lg border border-slate-700 p-4 animate-pulse">
                  <div className="bg-slate-700 rounded-lg h-48 mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-slate-700 rounded h-4"></div>
                    <div className="bg-slate-700 rounded h-3 w-3/4"></div>
                  </div>
                </div>
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No products found matching your criteria.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
                  <div className="aspect-video bg-slate-700 flex items-center justify-center">
                    <Package className="w-12 h-12 text-slate-500" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-200 truncate">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-slate-200">${product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-300">{product.rating.toFixed(1)}</span>
                        <span className="text-xs text-slate-500">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-400">{product.sales} sales</span>
                      <span className="text-sm text-slate-400">{product.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Sales Performance</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Revenue</span>
                  <span className="text-slate-200 font-medium">${stats.totalRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Average Order Value</span>
                  <span className="text-slate-200 font-medium">
                    ${stats.totalSales > 0 ? (stats.totalRevenue / stats.totalSales).toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Conversion Rate</span>
                  <span className="text-green-400 font-medium">24.3%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Product Performance</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Best Seller</span>
                  <span className="text-slate-200 font-medium">
                    {products.sort((a, b) => b.sales - a.sales)[0]?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Highest Rated</span>
                  <span className="text-slate-200 font-medium">
                    {products.sort((a, b) => b.rating - a.rating)[0]?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Most Expensive</span>
                  <span className="text-slate-200 font-medium">
                    {products.sort((a, b) => b.price - a.price)[0]?.name || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
          <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-400 mb-2">Orders Management</h3>
          <p className="text-slate-500">Order management functionality will be implemented here.</p>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
            <Tags className="w-5 h-5" />
            <span>Product Categories</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.category === category);
              const categoryRevenue = categoryProducts.reduce((sum, p) => sum + (p.sales * p.price), 0);
              
              return (
                <div key={category} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <h4 className="font-medium text-slate-200 mb-2">{category}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Products</span>
                      <span className="text-slate-200">{categoryProducts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sales</span>
                      <span className="text-slate-200">{categoryProducts.reduce((sum, p) => sum + p.sales, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Revenue</span>
                      <span className="text-slate-200">${categoryRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={newProduct.status}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'pending' }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                    setNewProduct({
                      name: '',
                      description: '',
                      price: 0,
                      category: '',
                      image: '',
                      status: 'active'
                    });
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                  disabled={!newProduct.name || !newProduct.price || !newProduct.category}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalMarketPage;