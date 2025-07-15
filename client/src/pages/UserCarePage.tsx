import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Search, Eye, EyeOff, Ban, CheckCircle, AlertCircle, UserX, Shield, Clock, User } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';

interface UserAccount {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  totalEarnings: string;
  isActive: boolean;
  isBanned: boolean;
  banReason?: string;
  bannedBy?: number;
  bannedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const UserCarePage = () => {
  const { teamMember } = useTeamAuth();
  const [activeTab, setActiveTab] = useState<'database' | 'report'>('database');
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState<{[key: number]: boolean}>({});
  
  // Report section state
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [actionType, setActionType] = useState<'ban' | 'unban'>('ban');
  const [banReason, setBanReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users', {
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

  const handleBanAction = async () => {
    if (!selectedUser || !banReason.trim()) return;
    
    setProcessing(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const endpoint = actionType === 'ban' ? `/api/team/users/${selectedUser.id}/ban` : `/api/team/users/${selectedUser.id}/unban`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reason: banReason,
        }),
      });
      
      if (response.ok) {
        // Refresh user list
        await loadUsers();
        setSelectedUser(null);
        setBanReason('');
        alert(`User ${actionType === 'ban' ? 'banned' : 'unbanned'} successfully`);
      } else {
        alert('Failed to process request');
      }
    } catch (error) {
      console.error('Error processing ban action:', error);
      alert('Error processing request');
    } finally {
      setProcessing(false);
    }
  };

  const togglePasswordVisibility = (userId: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex-1 p-6">
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'database'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Database
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'report'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Report
          </button>
        </div>
      </div>

      {/* Database Tab */}
      {activeTab === 'database' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-200">User Database</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Password</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Earnings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-200">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-slate-400">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-300">
                            {showPasswords[user.id] ? '••••••••' : '••••••••'}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="text-slate-400 hover:text-slate-300"
                          >
                            {showPasswords[user.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        N/A
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        ${user.totalEarnings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.isBanned ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <UserX className="w-3 h-3 mr-1" />
                            Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Report Tab */}
      {activeTab === 'report' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">User Management Actions</h3>
            <p className="text-slate-400 text-sm">Ban or unban user accounts with mandatory reason documentation.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Selection */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h4 className="text-md font-medium text-slate-200 mb-4">Select User</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedUser?.id === user.id
                        ? 'border-blue-500 bg-blue-900/20'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-200">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-slate-400">@{user.username}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.isBanned ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <UserX className="w-3 h-3 mr-1" />
                            Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Panel */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h4 className="text-md font-medium text-slate-200 mb-4">Take Action</h4>
              
              {selectedUser ? (
                <div className="space-y-4">
                  {/* Selected User Info */}
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="text-sm font-medium text-slate-200">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </div>
                    <div className="text-xs text-slate-400">{selectedUser.email}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      Current Status: {selectedUser.isBanned ? 'Banned' : 'Active'}
                    </div>
                  </div>

                  {/* Action Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Action Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setActionType('ban')}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          actionType === 'ban'
                            ? 'border-red-500 bg-red-900/20 text-red-300'
                            : 'border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <Ban className="w-4 h-4 inline mr-2" />
                        Ban User
                      </button>
                      <button
                        onClick={() => setActionType('unban')}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          actionType === 'unban'
                            ? 'border-green-500 bg-green-900/20 text-green-300'
                            : 'border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <Shield className="w-4 h-4 inline mr-2" />
                        Unban User
                      </button>
                    </div>
                  </div>

                  {/* Reason Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Reason (Required)
                    </label>
                    <textarea
                      value={banReason}
                      onChange={(e) => setBanReason(e.target.value)}
                      placeholder={`Enter reason for ${actionType}ning this user...`}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleBanAction}
                    disabled={processing || !banReason.trim()}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      actionType === 'ban'
                        ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-800'
                        : 'bg-green-600 hover:bg-green-700 disabled:bg-green-800'
                    } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {processing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        {actionType === 'ban' ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                        <span>{actionType === 'ban' ? 'Ban User' : 'Unban User'}</span>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Select a user to take action</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserCarePage;