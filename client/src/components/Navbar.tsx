import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Menu,
  X,
  Zap,
  LogOut,
  User,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { 
  CosmicHome, 
  CosmicBarChart, 
  CosmicDollarSign, 
  CosmicBriefcase, 
  CosmicCreditCard, 
  CosmicSettings 
} from './icons/CosmicIcons';
import AnimatedLogo from './AnimatedLogo';
import ThorxLogo from './ThorxLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', icon: CosmicHome, label: 'Home' },
    { path: '/dashboard', icon: CosmicBarChart, label: 'Dashboard' },
    { path: '/earnings', icon: CosmicDollarSign, label: 'Earnings' },
    { path: '/work', icon: CosmicBriefcase, label: 'Work' },
    { path: '/payout', icon: CosmicCreditCard, label: 'Payout' },
    { path: '/settings', icon: CosmicSettings, label: 'Settings' },
  ];

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    logout();
    setLocation('/');
    setShowUserMenu(false);
    setShowSignOutConfirm(false);
  };

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  const cancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-900/98 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Cosmic background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced logo section */}
          <Link to="/" className="group relative">
            <motion.div 
              className="flex items-center space-x-3 p-2 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <ThorxLogo size="md" className="text-slate-200 group-hover:text-white transition-colors duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-200 font-bold text-lg group-hover:text-white transition-colors duration-300">Thorx</span>
                <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Navigation Hub</div>
              </div>
            </motion.div>
          </Link>

          {/* Advanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-slate-800/70 to-slate-700/70 text-slate-100 shadow-lg border border-slate-600/50 backdrop-blur-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 hover:backdrop-blur-sm'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative">
                      <Icon className="w-4 h-4" color="currentColor" />
                      {active && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  
                  {active && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Notification badge for active item */}
                  {active && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Advanced User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-slate-800/70 hover:to-slate-700/70 border border-slate-600/50 text-slate-200 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-slate-600/50 backdrop-blur-sm"
                      animate={{ 
                        boxShadow: showUserMenu 
                          ? "0 0 20px rgba(59, 130, 246, 0.3)" 
                          : "0 0 0px rgba(59, 130, 246, 0)" 
                      }}
                    >
                      <User className="w-5 h-5 text-slate-300" />
                    </motion.div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="font-medium text-sm">{user.firstName}</div>
                    <div className="text-xs text-slate-400">Online</div>
                  </div>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-xl py-3 z-50"
                  >
                    {/* User Profile Header */}
                    <div className="px-4 py-4 border-b border-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center border border-slate-600/50">
                            <User className="w-6 h-6 text-slate-300" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-200">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-green-400">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="px-4 py-3 border-b border-slate-700/50">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                          <div className="text-lg font-bold text-slate-200">$127</div>
                          <div className="text-xs text-slate-400">Earnings</div>
                        </div>
                        <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                          <div className="text-lg font-bold text-slate-200">43</div>
                          <div className="text-xs text-slate-400">Tasks</div>
                        </div>
                        <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                          <div className="text-lg font-bold text-slate-200">8.2</div>
                          <div className="text-xs text-slate-400">Rating</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/30 transition-all duration-200 group"
                      >
                        <div className="relative">
                          <CosmicSettings className="w-5 h-5" color="currentColor" />
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-sm font-medium">Account Settings</span>
                        <div className="ml-auto">
                          <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </Link>
                      
                      <Link
                        to="/help"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/30 transition-all duration-200 group"
                      >
                        <div className="relative">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-sm font-medium">Help & Support</span>
                        <div className="ml-auto">
                          <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                    
                    {/* Sign Out Section */}
                    <div className="border-t border-slate-700/50 pt-3">
                      <motion.button
                        onClick={handleSignOutClick}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group rounded-lg mx-2"
                      >
                        <div className="relative">
                          <LogOut className="w-5 h-5" />
                          <div className="absolute -inset-1 bg-red-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-sm font-bold">Sign Out</span>
                        <div className="ml-auto">
                          <AlertTriangle className="w-4 h-4 text-red-500/70" />
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Sign Out Confirmation Modal */}
                {showSignOutConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={cancelSignOut}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-slate-800 max-w-sm mx-4 rounded-xl p-6 shadow-xl border border-slate-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                          <AlertTriangle className="w-8 h-8 text-red-400" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-200 mb-2">Confirm Sign Out</h3>
                        <p className="text-slate-400 mb-6">Are you sure you want to sign out of your Thorx account?</p>
                        
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={cancelSignOut}
                            className="flex-1 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-600 transition-all duration-200 border border-slate-600"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-200 flex items-center justify-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-slate-700/70 to-slate-600/70 hover:from-slate-700 hover:to-slate-600 text-slate-200 hover:text-white rounded-xl font-medium border border-slate-600/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Advanced Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-slate-800/70 hover:to-slate-700/70 text-slate-300 hover:text-white border border-slate-600/50 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Advanced Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="px-3 pt-4 pb-3 space-y-2 bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl mt-3 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-slate-700/70 to-slate-600/70 text-slate-100 border border-slate-600/50 shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/40'
                    }`}
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5" color="currentColor" />
                      {active && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur" />
                      )}
                    </div>
                    <span>{item.label}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
            
            {user ? (
              <div className="border-t border-slate-700/50 pt-4 mt-4">
                {/* Mobile User Profile Card */}
                <div className="px-4 py-3 mb-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-300" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  
                  {/* Mobile Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center p-2 bg-slate-800/40 rounded-lg">
                      <div className="text-sm font-bold text-slate-200">$127</div>
                      <div className="text-xs text-slate-400">Earned</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/40 rounded-lg">
                      <div className="text-sm font-bold text-slate-200">43</div>
                      <div className="text-xs text-slate-400">Tasks</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/40 rounded-lg">
                      <div className="text-sm font-bold text-slate-200">8.2</div>
                      <div className="text-xs text-slate-400">Rate</div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Settings Link */}
                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 mb-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/40 transition-all duration-200"
                >
                  <CosmicSettings className="w-5 h-5" color="currentColor" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
                
                {/* Mobile Sign Out */}
                <motion.button
                  onClick={handleSignOutClick}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                  <div className="ml-auto">
                    <AlertTriangle className="w-4 h-4 text-red-500/70" />
                  </div>
                </motion.button>
              </div>
            ) : (
              <div className="border-t border-slate-700/50 pt-4 mt-4">
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-4 rounded-xl text-base font-medium bg-gradient-to-r from-slate-700/70 to-slate-600/70 text-slate-200 hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg border border-slate-600/50"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                  <div className="ml-auto">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;