import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { ThorxLogo } from './ThorxLogo';
import { 
  Home, 
  Users, 
  Mail, 
  MessageCircle, 
  TrendingUp, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Settings,
  Shield
} from 'lucide-react';

export const TeamSidebar = () => {
  const { teamMember, logout } = useTeamAuth();
  const [location] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-500';
      case 'marketing': return 'bg-green-500';
      case 'social_media': return 'bg-pink-500';
      case 'admin': return 'bg-blue-500';
      default: return 'bg-gray-500';
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

  const getNavigationItems = () => {
    const role = teamMember?.role;
    
    // Base navigation items for all users
    const baseItems = [
      { path: '/team/dashboard', label: 'Dashboard', icon: Home }
    ];

    // Role-specific navigation assignments
    const roleSpecificItems = {
      'ceo': [
        { path: '/team/users', label: 'User Care', icon: Users },
        { path: '/team/inbox', label: 'Inbox', icon: Mail },
        { path: '/team/chat', label: 'Linkage', icon: MessageCircle },
        { path: '/team/hub', label: 'Team Hub', icon: Shield },
        { path: '/team/work', label: 'Work', icon: Briefcase },
        { path: '/team/market', label: 'Digital Market', icon: TrendingUp },
        { path: '/team/settings', label: 'Settings', icon: Settings }
      ],
      'marketing': [
        { path: '/team/users', label: 'User Care', icon: Users },
        { path: '/team/inbox', label: 'Inbox', icon: Mail },
        { path: '/team/chat', label: 'Linkage', icon: MessageCircle },
        { path: '/team/work', label: 'Work', icon: Briefcase },
        { path: '/team/settings', label: 'Settings', icon: Settings }
      ],
      'social_media': [
        { path: '/team/users', label: 'User Care', icon: Users },
        { path: '/team/inbox', label: 'Inbox', icon: Mail },
        { path: '/team/chat', label: 'Linkage', icon: MessageCircle },
        { path: '/team/work', label: 'Work', icon: Briefcase },
        { path: '/team/market', label: 'Digital Market', icon: TrendingUp },
        { path: '/team/settings', label: 'Settings', icon: Settings }
      ],
      'admin': [
        { path: '/team/users', label: 'User Care', icon: Users },
        { path: '/team/inbox', label: 'Inbox', icon: Mail },
        { path: '/team/chat', label: 'Linkage', icon: MessageCircle },
        { path: '/team/work', label: 'Work', icon: Briefcase },
        { path: '/team/settings', label: 'Settings', icon: Settings }
      ]
    };

    return [...baseItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])];
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-slate-800 h-screen flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <ThorxLogo size="sm" />
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-slate-200">Team Portal</h1>
              <p className="text-xs text-slate-400">Thorx Management</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-bold text-sm">
              {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-slate-200 font-medium truncate">{teamMember?.name}</p>
              <p className="text-xs text-slate-400 truncate">{getRoleTitle(teamMember?.role || '')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {getNavigationItems().map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              location === item.path
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-slate-200 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default TeamSidebar;