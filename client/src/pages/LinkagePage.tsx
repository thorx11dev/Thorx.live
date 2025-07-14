import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { 
  Link2, 
  ExternalLink, 
  Globe, 
  Users, 
  TrendingUp, 
  Share2, 
  Copy, 
  CheckCircle,
  Eye,
  Calendar,
  BarChart3,
  Target,
  Zap,
  RefreshCw
} from 'lucide-react';

interface LinkageStats {
  totalLinks: number;
  activeLinks: number;
  totalClicks: number;
  todayClicks: number;
  conversionRate: number;
  topPerformingLink: string;
}

interface LinkData {
  id: number;
  title: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  conversions: number;
  createdAt: string;
  isActive: boolean;
  category: string;
}

const LinkagePage = () => {
  const { teamMember } = useTeamAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<LinkageStats>({
    totalLinks: 0,
    activeLinks: 0,
    totalClicks: 0,
    todayClicks: 0,
    conversionRate: 0,
    topPerformingLink: ''
  });
  const [links, setLinks] = useState<LinkData[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [newLinkModal, setNewLinkModal] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    originalUrl: '',
    category: 'general'
  });

  useEffect(() => {
    loadLinkageData();
  }, []);

  const loadLinkageData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with real API calls
      setStats({
        totalLinks: 24,
        activeLinks: 22,
        totalClicks: 15847,
        todayClicks: 342,
        conversionRate: 24.5,
        topPerformingLink: 'thorx.live/register'
      });

      setLinks([
        {
          id: 1,
          title: 'Thorx Registration',
          originalUrl: 'https://thorx.live/register',
          shortUrl: 'thorx.live/reg',
          clicks: 5240,
          conversions: 1456,
          createdAt: '2025-01-10',
          isActive: true,
          category: 'registration'
        },
        {
          id: 2,
          title: 'Feature Overview',
          originalUrl: 'https://thorx.live/features',
          shortUrl: 'thorx.live/feat',
          clicks: 3821,
          conversions: 892,
          createdAt: '2025-01-08',
          isActive: true,
          category: 'marketing'
        },
        {
          id: 3,
          title: 'Contact Support',
          originalUrl: 'https://thorx.live/contact',
          shortUrl: 'thorx.live/help',
          clicks: 2156,
          conversions: 634,
          createdAt: '2025-01-05',
          isActive: true,
          category: 'support'
        },
        {
          id: 4,
          title: 'WhatsApp Community',
          originalUrl: 'https://chat.whatsapp.com/J7Jvr6XBYs82rlF9RGGlTa',
          shortUrl: 'thorx.live/whatsapp',
          clicks: 1934,
          conversions: 1467,
          createdAt: '2025-01-03',
          isActive: true,
          category: 'community'
        },
        {
          id: 5,
          title: 'Updates Page',
          originalUrl: 'https://thorx.live/updates',
          shortUrl: 'thorx.live/news',
          clicks: 1543,
          conversions: 298,
          createdAt: '2025-01-01',
          isActive: true,
          category: 'updates'
        }
      ]);
    } catch (error) {
      console.error('Error loading linkage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(url);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleCreateLink = async () => {
    if (!newLink.title || !newLink.originalUrl) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockNewLink: LinkData = {
        id: Date.now(),
        title: newLink.title,
        originalUrl: newLink.originalUrl,
        shortUrl: `thorx.live/${newLink.title.toLowerCase().replace(/\s+/g, '-')}`,
        clicks: 0,
        conversions: 0,
        createdAt: new Date().toISOString().split('T')[0],
        isActive: true,
        category: newLink.category
      };

      setLinks(prev => [mockNewLink, ...prev]);
      setNewLinkModal(false);
      setNewLink({ title: '', originalUrl: '', category: 'general' });
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalLinks: prev.totalLinks + 1,
        activeLinks: prev.activeLinks + 1
      }));
    } catch (error) {
      console.error('Error creating link:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'registration': 'bg-blue-500/20 text-blue-400',
      'marketing': 'bg-green-500/20 text-green-400',
      'support': 'bg-yellow-500/20 text-yellow-400',
      'community': 'bg-purple-500/20 text-purple-400',
      'updates': 'bg-orange-500/20 text-orange-400',
      'general': 'bg-gray-500/20 text-gray-400'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center space-x-2">
            <Link2 className="w-6 h-6" />
            <span>Linkage</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage short links and track performance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={loadLinkageData}
            disabled={loading}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-200 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setNewLinkModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Link2 className="w-4 h-4" />
            <span>Create Link</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Links</p>
              <p className="text-2xl font-bold text-slate-200">{stats.totalLinks}</p>
            </div>
            <Link2 className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Links</p>
              <p className="text-2xl font-bold text-green-400">{stats.activeLinks}</p>
            </div>
            <Zap className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-400">{stats.totalClicks.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Today's Clicks</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.todayClicks}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-400">{stats.conversionRate}%</p>
            </div>
            <Target className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Top Performer</p>
              <p className="text-sm font-bold text-red-400 truncate">{stats.topPerformingLink}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200">Link Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-slate-200 font-medium">Link</th>
                <th className="px-4 py-3 text-left text-slate-200 font-medium">Category</th>
                <th className="px-4 py-3 text-left text-slate-200 font-medium">Short URL</th>
                <th className="px-4 py-3 text-left text-slate-200 font-medium">Clicks</th>
                <th className="px-4 py-3 text-left text-slate-200 font-medium">Conversions</th>
                <th className="px-4 py-3 text-left text-slate-200 font-medium">Created</th>
                <th className="px-4 py-3 text-left text-slate-200 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2">Loading links...</p>
                  </td>
                </tr>
              ) : links.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    <Link2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No links created yet.</p>
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-slate-200 font-medium">{link.title}</p>
                        <p className="text-slate-400 text-sm truncate max-w-xs">{link.originalUrl}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(link.category)}`}>
                        {link.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-200 font-mono text-sm">{link.shortUrl}</span>
                        <button
                          onClick={() => copyToClipboard(link.shortUrl)}
                          className="text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          {copiedLink === link.shortUrl ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-200">{link.clicks.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-200">{link.conversions.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-200">{formatDate(link.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(link.originalUrl, '_blank')}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(link.shortUrl)}
                          className="text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Link Modal */}
      {newLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Create New Link</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Link Title
                </label>
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter link title..."
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Original URL
                </label>
                <input
                  type="url"
                  value={newLink.originalUrl}
                  onChange={(e) => setNewLink(prev => ({ ...prev, originalUrl: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={newLink.category}
                  onChange={(e) => setNewLink(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General</option>
                  <option value="registration">Registration</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                  <option value="community">Community</option>
                  <option value="updates">Updates</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setNewLinkModal(false);
                    setNewLink({ title: '', originalUrl: '', category: 'general' });
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateLink}
                  disabled={!newLink.title || !newLink.originalUrl}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  Create Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkagePage;