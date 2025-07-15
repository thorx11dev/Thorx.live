import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Users, Mail, Shield, Settings, TrendingUp, Activity, MessageCircle, Bell } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';

const TeamDashboard = () => {
  const { teamMember } = useTeamAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    unreadMessages: 0,
    teamMessages: 0,
    onlineMembers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      
      // Load stats from various endpoints
      const [usersResponse, messagesResponse, teamResponse, chatResponse] = await Promise.all([
        fetch('/api/team/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/team/messages', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/team/members', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(() => ({ ok: false })), // CEO only, handle gracefully
        fetch('/api/team/chat', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const users = usersResponse.ok ? await usersResponse.json() : [];
      const messages = messagesResponse.ok ? await messagesResponse.json() : [];
      const teamMembers = teamResponse.ok ? await teamResponse.json() : [];
      const chats = chatResponse.ok ? await chatResponse.json() : [];

      setStats({
        totalUsers: users.length,
        activeUsers: users.filter((user: any) => user.isActive && !user.isBanned).length,
        bannedUsers: users.filter((user: any) => user.isBanned).length,
        unreadMessages: messages.filter((msg: any) => !msg.isRead).length,
        teamMessages: chats.length,
        onlineMembers: teamMembers.filter((member: any) => member.isActive).length
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'Chief Executive Officer';
      case 'marketing': return 'Marketing Specialist';
      case 'social_media': return 'Social Media Manager';
      case 'admin': return 'Administrator';
      default: return 'Team Member';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-500';
      case 'marketing': return 'bg-green-500';
      case 'social_media': return 'bg-pink-500';
      case 'admin': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getAccessiblePages = () => {
    const pages = [
      { name: 'Inbox', description: 'Contact messages', icon: Mail },
      { name: 'Linkage', description: 'Team chat', icon: MessageCircle },
      { name: 'Digital Market', description: 'Marketplace', icon: TrendingUp }
    ];

    if (teamMember?.role === 'ceo' || teamMember?.role === 'admin') {
      pages.push({ name: 'User Care', description: 'User management', icon: Users });
    }

    if (teamMember?.role === 'ceo') {
      pages.push({ name: 'Team Hub', description: 'Team settings', icon: Settings });
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <TeamSidebar />
      <div className="flex-1 p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">
              {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-200">
              Welcome, {teamMember?.name}
            </h2>
            <p className="text-slate-400">{getRoleTitle(teamMember?.role || '')}</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-slate-200">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-400">{stats.activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Banned Users</p>
              <p className="text-2xl font-bold text-red-400">{stats.bannedUsers}</p>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Unread Messages</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.unreadMessages}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Team Messages</p>
              <p className="text-2xl font-bold text-purple-400">{stats.teamMessages}</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Online Members</p>
              <p className="text-2xl font-bold text-blue-400">{stats.onlineMembers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getAccessiblePages().map((page) => (
            <div
              key={page.name}
              className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <page.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">{page.name}</h4>
                  <p className="text-sm text-slate-400">{page.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-300">Team dashboard loaded successfully</span>
            <span className="text-slate-500">Just now</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-slate-300">System statistics updated</span>
            <span className="text-slate-500">2 minutes ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-slate-300">New user registered</span>
            <span className="text-slate-500">1 hour ago</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TeamDashboard;