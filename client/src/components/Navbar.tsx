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
      className="fixed top-0 left-0 right-0 z-50 navbar-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Enhanced for Dark Mode */}
          <AnimatedLogo size="medium" showText={true} linkTo="/" />

          {/* Desktop Navigation - Enhanced for Dark Mode */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 navbar-desktop-item ${
                      isActive(item.path)
                        ? 'navbar-desktop-item-active'
                        : 'navbar-desktop-item-inactive'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" color="currentColor" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-soft-pink to-pale-blue rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu / Sign Out Button - Enhanced for Dark Mode */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg navbar-user-button transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium navbar-user-name">{user.firstName}</span>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 navbar-dropdown rounded-lg shadow-lg border py-2"
                  >
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-2 px-4 py-2 navbar-dropdown-item transition-colors duration-200"
                    >
                      <CosmicSettings className="w-4 h-4" color="currentColor" />
                      <span>Settings</span>
                    </Link>
                    
                    {/* Danger Sign Out Button */}
                    <motion.button
                      onClick={handleSignOutClick}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(239, 68, 68, 0.05)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-2 px-4 py-2 navbar-signout-button transition-all duration-200 group"
                    >
                      <motion.div
                        animate={{ 
                          rotate: showSignOutConfirm ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ 
                          duration: 0.5,
                          repeat: showSignOutConfirm ? Infinity : 0,
                          repeatDelay: 2
                        }}
                      >
                        <LogOut className="w-4 h-4 group-hover:text-red-700" />
                      </motion.div>
                      <span className="font-medium group-hover:text-red-700">Sign Out</span>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 1, 
                          scale: [0, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 0.3,
                          delay: 0.1
                        }}
                        className="ml-auto"
                      >
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                )}

                {/* Sign Out Confirmation Modal */}
                {showSignOutConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={cancelSignOut}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="navbar-modal max-w-sm mx-4 rounded-xl p-6 shadow-xl border"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4"
                        >
                          <AlertTriangle className="w-8 h-8 text-red-500" />
                        </motion.div>
                        
                        <h3 className="text-lg font-bold navbar-modal-title mb-2">Confirm Sign Out</h3>
                        <p className="navbar-modal-text mb-6">Are you sure you want to sign out of your Thorx account?</p>
                        
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={cancelSignOut}
                            className="flex-1 px-4 py-2 navbar-modal-cancel rounded-lg font-medium transition-all duration-200 border"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "rgba(239, 68, 68, 0.9)"
                            }}
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
                  className="navbar-signin-button px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile menu button - Enhanced for Dark Mode */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md navbar-mobile-toggle focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced for Dark Mode */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 navbar-mobile-menu rounded-lg mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 navbar-mobile-item ${
                    isActive(item.path)
                      ? 'navbar-mobile-item-active'
                      : 'navbar-mobile-item-inactive'
                  }`}
                >
                  <Icon className="w-5 h-5" color="currentColor" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <motion.button
                onClick={handleSignOutClick}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(239, 68, 68, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium navbar-mobile-signout transition-all duration-200 group"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <LogOut className="w-5 h-5 group-hover:text-red-700" />
                </motion.div>
                <span className="group-hover:text-red-700 font-medium">Sign Out</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="ml-auto"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </motion.div>
              </motion.button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium navbar-mobile-signin"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;