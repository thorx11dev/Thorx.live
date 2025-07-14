import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { apiRequest } from '@/lib/queryClient';
import { 
  Users, 
  Database, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  totalEarnings: string;
  isActive: boolean;
  isBanned: boolean;
  banReason?: string;
  bannedAt?: string;
  createdAt: string;
}

const UserCarePage = () => {
  const { teamMember } = useTeamAuth();
  const [activeTab, setActiveTab] = useState<'database' | 'report'>('database');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'banned'>('all');
  const [showPasswords, setShowPasswords] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [actionType, setActionType] = useState<'ban' | 'unban'>('ban');
  const [actionLoading, setActionLoading] = useState(false);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await apiRequest('/api/team/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUnban = async () => {
    if (!selectedUser || !banReason.trim()) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const endpoint = actionType === 'ban' ? 'ban' : 'unban';
      
      const response = await apiRequest(`/api/team/users/${selectedUser.id}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: banReason }),
      });

      if (response.ok) {
        // Refresh users list
        await loadUsers();
        setBanModalOpen(false);
        setBanReason('');
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const openBanModal = (user: User, type: 'ban' | 'unban') => {
    setSelectedUser(user);
    setActionType(type);
    setBanModalOpen(true);
    setBanReason('');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && !user.isBanned) ||
                         (filterStatus === 'banned' && user.isBanned);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span>User Care</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage user accounts and handle reports</p>
        </div>
        <button
          onClick={loadUsers}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'database'
              ? 'bg-slate-700 text-white border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Database</span>
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'report'
              ? 'bg-slate-700 text-white border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Report</span>
        </button>
      </div>

      {/* Database Tab */}
      {activeTab === 'database' && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'banned')}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Users</option>
                <option value="active">Active Only</option>
                <option value="banned">Banned Only</option>
              </select>
            </div>
            <button
              onClick={() => setShowPasswords(!showPasswords)}
              className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg transition-colors"
            >
              {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPasswords ? 'Hide' : 'Show'} Passwords</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">User</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Email</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Password</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Earnings</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-slate-200 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-2">Loading users...</p>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                        No users found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-slate-200 font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-slate-400 text-sm">@{user.username}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-200">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm font-mono">
                            {showPasswords ? '••••••••' : '••••••••'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-200">${user.totalEarnings}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            {user.isBanned ? (
                              <div className="flex items-center space-x-1 text-red-400">
                                <XCircle className="w-4 h-4" />
                                <span className="text-sm">Banned</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 text-green-400">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm">Active</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            {user.isBanned ? (
                              <button
                                onClick={() => openBanModal(user, 'unban')}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                Unban
                              </button>
                            ) : (
                              <button
                                onClick={() => openBanModal(user, 'ban')}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                Ban
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-slate-200">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-green-400">{users.filter(u => !u.isBanned).length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Banned Users</p>
                  <p className="text-2xl font-bold text-red-400">{users.filter(u => u.isBanned).length}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Tab */}
      {activeTab === 'report' && (
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span>User Management Actions</span>
            </h3>
            <p className="text-slate-400 mb-4">
              Use this section to manage user accounts. All actions require a detailed reason and are logged for audit purposes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="font-medium text-slate-200 mb-2">Ban User Account</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Temporarily restrict user access to the platform. User will see ban reason when attempting to log in.
                </p>
                <p className="text-yellow-400 text-sm">
                  ⚠️ Use the Database tab to select and ban specific users
                </p>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="font-medium text-slate-200 mb-2">Unban User Account</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Restore user access to the platform. User will regain full access to all features.
                </p>
                <p className="text-green-400 text-sm">
                  ✅ Use the Database tab to select and unban specific users
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ban/Unban Modal */}
      {banModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              {actionType === 'ban' ? 'Ban User' : 'Unban User'}
            </h3>
            <p className="text-slate-400 mb-4">
              You are about to {actionType} <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>. 
              Please provide a reason for this action.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Reason for {actionType} (required)
                </label>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder={`Enter reason for ${actionType}...`}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setBanModalOpen(false);
                    setSelectedUser(null);
                    setBanReason('');
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBanUnban}
                  disabled={!banReason.trim() || actionLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    actionType === 'ban'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {actionLoading ? 'Processing...' : `${actionType === 'ban' ? 'Ban' : 'Unban'} User`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCarePage;