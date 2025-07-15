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
  ChevronRight,
  ChevronLeft,
  Settings,
  Briefcase
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
    const name = teamMember?.name;

    // Define all possible navigation items
    const allItems = [
      { path: '/team/dashboard', label: 'Dashboard', icon: Home },
      { path: '/team/users', label: 'User Care', icon: Users },
      { path: '/team/inbox', label: 'Inbox', icon: Mail },
      { path: '/team/chat', label: 'Linkage', icon: MessageCircle },
      { path: '/team/hub', label: 'Team Hub', icon: Settings },
      { path: '/team/work', label: 'Work', icon: Briefcase },
      { path: '/team/market', label: 'Digital Market', icon: TrendingUp }
    ];

    // Role-based access control
    let accessibleItems: string[] = [];

    if (name === 'Aon Imran') {
      // CEO: Dashboard, User Care, Inbox, Linkage, Team Hub, Work, Digital Market
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat', '/team/hub', '/team/work', '/team/market'];
    } else if (name === 'Zain Abbas') {
      // Marketing: Dashboard, User Care, Inbox, Linkage, Work
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat', '/team/work'];
    } else if (name === 'Zohaib Nadeem') {
      // Social Media: Dashboard, User Care, Inbox, Linkage, Work, Digital Market
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat', '/team/work', '/team/market'];
    } else if (name === 'Prof. Muhammad Jahangeer') {
      // Admin: Dashboard, User Care, Inbox, Linkage, Work
      accessibleItems = ['/team/dashboard', '/team/users', '/team/inbox', '/team/chat', '/team/work'];
    } else {
      // Default fallback for any other team member
      accessibleItems = ['/team/dashboard', '/team/inbox', '/team/chat'];
    }

    // Filter items based on access
    return allItems.filter(item => accessibleItems.includes(item.path));
  };

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-slate-800 h-screen flex flex-col transition-all duration-300 ease-in-out relative ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className={`flex items-center transition-all duration-300 ${
          isCollapsed ? 'justify-center w-full' : 'space-x-3'
        }`}>
          <div className="flex-shrink-0">
            <ThorxLogo size="sm" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 opacity-100 transition-opacity duration-300">
              <h1 className="text-lg font-bold text-slate-200 truncate">Team Portal</h1>
              <p className="text-xs text-slate-400 truncate">Thorx Management</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors flex-shrink-0"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Collapsed Expand Button */}
      {isCollapsed && (
        <div className="absolute top-4 -right-3 z-10">
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-100 transition-colors shadow-lg"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className={`flex items-center transition-all duration-300 ${
          isCollapsed ? 'justify-center' : 'space-x-3'
        }`}>
          <div className={`w-10 h-10 rounded-full ${getRoleColor(teamMember?.role || '')} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-bold text-sm">
              {teamMember?.name?.split(' ').map(n => n[0]).join('') || 'TM'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="min-w-0 opacity-100 transition-opacity duration-300">
              <p className="text-slate-200 font-medium truncate">{teamMember?.name}</p>
              <p className="text-xs text-slate-400 truncate">{getRoleTitle(teamMember?.role || '')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {getNavigationItems().map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center rounded-lg transition-all duration-200 ${
              isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2'
            } ${
              location === item.path
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700 hover:text-slate-200'
            }`}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full rounded-lg text-slate-300 hover:bg-slate-700 hover:text-slate-200 transition-all duration-200 ${
            isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2'
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-medium opacity-100 transition-opacity duration-300">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default TeamSidebar;