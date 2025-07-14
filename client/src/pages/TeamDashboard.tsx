import { useState } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { ThorxLogo } from '@/components/ThorxLogo';
import UserCarePage from './UserCarePage';
import InboxPage from './InboxPage';
import LinkagePage from './LinkagePage';
import TeamHubPage from './TeamHubPage';
import DigitalMarketPage from './DigitalMarketPage';
import { 
  BarChart3, 
  Users, 
  MessageCircle, 
  Settings, 
  LogOut,
  Shield,
  Globe,
  Briefcase,
  Activity,
  Link2,
  ShoppingCart
} from 'lucide-react';

const TeamDashboard = () => {
  const { teamMember, logout, getAccessiblePages } = useTeamAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    window.location.href = '/team/login';
  };

  const getNavigationItems = () => {
    const accessiblePages = getAccessiblePages();
    const allNavItems = [
      { id: 'overview', label: 'Overview', icon: BarChart3, page: 'dashboard' },
      { id: 'user-care', label: 'User Care', icon: Users, page: 'user-care' },
      { id: 'inbox', label: 'Inbox', icon: MessageCircle, page: 'inbox' },
      { id: 'linkage', label: 'Linkage', icon: Link2, page: 'linkage' },
      { id: 'team-hub', label: 'Team Hub', icon: Shield, page: 'team-hub' },
      { id: 'digital-market', label: 'Digital Market', icon: ShoppingCart, page: 'digital-market' },
      { id: 'work', label: 'Work', icon: Briefcase, page: 'work' },
      { id: 'settings', label: 'Settings', icon: Settings, page: 'settings' }
    ];

    return allNavItems.filter(item => accessiblePages.includes(item.page));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'marketing': return 'bg-gradient-to-r from-green-500 to-teal-500';
      case 'social_media': return 'bg-gradient-to-r from-pink-500 to-purple-500';
      case 'admin': return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
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

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700">
        {/* Logo and Brand */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <ThorxLogo size="md" className="text-slate-200" />
            <div>
              <h1 className="text-lg font-bold text-slate-200">Team Portal</h1>
              <p className="text-xs text-slate-400">Management Hub</p>
            </div>
          </div>
        </div>

        {/* Team Member Info */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
              </span>
            </div>
            <div>
              <h3 className="text-slate-200 font-medium">{teamMember?.name}</h3>
              <p className="text-xs text-slate-400">{getRoleTitle(teamMember?.role || '')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {getNavigationItems().map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-200">
                {getNavigationItems().find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-slate-400 text-sm">
                Welcome back, {teamMember?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-300">{new Date().toLocaleDateString()}</p>
                <p className="text-xs text-slate-400">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 bg-slate-900">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-slate-200">1,234</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Tasks</p>
                      <p className="text-2xl font-bold text-slate-200">567</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Unread Messages</p>
                      <p className="text-2xl font-bold text-slate-200">23</p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">System Status</p>
                      <p className="text-2xl font-bold text-green-400">Online</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-slate-200 text-sm">New user registered</p>
                          <p className="text-slate-400 text-xs">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'user-care' && <UserCarePage />}
          {activeTab === 'inbox' && <InboxPage />}
          {activeTab === 'linkage' && <LinkagePage />}
          {activeTab === 'team-hub' && <TeamHubPage />}
          {activeTab === 'digital-market' && <DigitalMarketPage />}
          
          {activeTab !== 'overview' && activeTab !== 'user-care' && activeTab !== 'inbox' && 
           activeTab !== 'linkage' && activeTab !== 'team-hub' && activeTab !== 'digital-market' && (
            <div className="p-6">
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">
                  {getNavigationItems().find(item => item.id === activeTab)?.label}
                </h3>
                <p className="text-slate-400">
                  This section is under development. Full functionality coming soon.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeamDashboard;