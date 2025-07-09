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
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800/50 shadow-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced visibility */}
          <Link to="/" className="group">
            <div className="flex items-center space-x-2">
              <ThorxLogo size="sm" className="text-slate-200 group-hover:text-white transition-colors duration-200" />
              <span className="text-slate-300 font-medium text-sm hidden sm:block">Navigation</span>
            </div>
          </Link>

          {/* Desktop Navigation with enhanced visibility */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-slate-800 text-slate-100 shadow-lg border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" color="currentColor" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </motion.div>
                  {active && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-400 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu with enhanced visibility */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="font-medium text-sm">{user.firstName}</span>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 backdrop-blur-lg"
                  >
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-sm font-medium text-slate-200">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                    
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                    >
                      <CosmicSettings className="w-4 h-4" color="currentColor" />
                      <span className="text-sm">Settings</span>
                    </Link>
                    
                    <div className="border-t border-slate-700 mt-2 pt-2">
                      <motion.button
                        onClick={handleSignOutClick}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
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
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg font-medium border border-slate-600 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile menu button with enhanced visibility */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none transition-all duration-200"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with enhanced visibility */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-4 pb-3 space-y-2 bg-slate-800/50 rounded-lg mt-2 border border-slate-700/50 backdrop-blur-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    active
                      ? 'bg-slate-700 text-slate-100 border border-slate-600 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" color="currentColor" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="border-t border-slate-700 pt-3 mt-3">
                <div className="px-4 py-2 mb-2">
                  <p className="text-sm font-medium text-slate-200">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
                <motion.button
                  onClick={handleSignOutClick}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            ) : (
              <div className="border-t border-slate-700 pt-3 mt-3">
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium bg-slate-700 text-slate-200 hover:bg-slate-600 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
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