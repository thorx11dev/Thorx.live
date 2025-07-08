import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader,
  Shield,
  Zap,
  Chrome,
  Facebook,
  Twitter
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import AnimatedLogo from '../components/AnimatedLogo';
import ThorxLogo from '../components/ThorxLogo';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  general?: string;
}

const AuthPage = () => {
  const [location] = useLocation();
  const [isLogin, setIsLogin] = useState(location === '/login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();

  // Update form mode based on route
  useEffect(() => {
    setIsLogin(location === '/login' || location === '/auth');
  }, [location]);

  // Force dark mode for Auth page
  // Removed forced dark mode - now respects user theme preference

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // Password strength calculation
  useEffect(() => {
    if (!isLogin && formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength += 25;
      if (/[A-Z]/.test(formData.password)) strength += 25;
      if (/[0-9]/.test(formData.password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
      setPasswordStrength(strength);
    }
  }, [formData.password, isLogin]);

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
      }
    }

    // Registration-specific validation
    if (!isLogin) {
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Rate limiting check
    if (attemptCount >= 3) {
      setShowCaptcha(true);
      setNotification({
        type: 'error',
        message: 'Too many attempts. Please complete the security check.'
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password, formData.rememberMe);
      } else {
        success = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName || '',
          lastName: formData.lastName || ''
        });
      }
      
      if (success) {
        setNotification({
          type: 'success',
          message: isLogin ? 'Welcome back to Thorx!' : 'Account created successfully!'
        });
        
        setTimeout(() => {
          setLocation('/dashboard');
        }, 1500);
      } else {
        setAttemptCount(prev => prev + 1);
        setNotification({
          type: 'error',
          message: isLogin ? 'Invalid credentials. Please try again.' : 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setNotification({
      type: 'success',
      message: `Redirecting to ${provider}...`
    });
    
    // Simulate social login redirect
    setTimeout(() => {
      setIsLoading(false);
      setLocation('/dashboard');
    }, 2000);
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address first' });
      return;
    }
    
    setNotification({
      type: 'success',
      message: 'Password reset link sent to your email!'
    });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-yellow-500';
    if (passwordStrength < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-slate-700/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-slate-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-slate-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Constellation background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="authConstellation" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle cx="100" cy="150" r="1" fill="#64748b" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#authConstellation)"/>
          </svg>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 right-4 z-50 max-w-md"
          >
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              notification.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
            style={{
              boxShadow: "0 8px 20px rgba(45, 58, 74, 0.08)"
            }}
            >
              <div className="flex items-center space-x-3">
                {notification.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <p className="font-medium">{notification.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-md px-4 sm:px-0">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link to="/">
            <ThorxLogo size="lg" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />
          </Link>
          <p className="text-slate-400 mt-2">
            {isLogin ? 'Welcome back to the cosmic earning platform' : 'Join the cosmic earning revolution'}
          </p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ 
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}
          className="bg-slate-800 rounded-xl p-8 border border-slate-700 transition-all duration-300 backdrop-blur-sm"
          style={{
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Form Toggle */}
          <div className="flex bg-slate-900/50 rounded-xl p-1 mb-8 backdrop-blur-md border border-slate-700/50">
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-100 shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              whileHover={{ scale: isLogin ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-100 shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              whileHover={{ scale: !isLogin ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input
                        type="text"
                        value={formData.firstName || ''}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                          errors.firstName 
                            ? 'border-red-400 focus:ring-red-400/50' 
                            : 'border-slate-600 focus:ring-slate-400/50 focus:border-slate-400'
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input
                        type="text"
                        value={formData.lastName || ''}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                          errors.lastName 
                            ? 'border-red-400 focus:ring-red-400/50' 
                            : 'border-slate-600 focus:ring-slate-400/50 focus:border-slate-400'
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                    errors.email 
                      ? 'border-red-400 focus:ring-red-400/50' 
                      : 'border-slate-600 focus:ring-slate-400/50 focus:border-slate-400'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                    errors.password 
                      ? 'border-red-400 focus:ring-red-400/50' 
                      : 'border-slate-600 focus:ring-slate-400/50 focus:border-slate-400'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
              
              {/* Password Strength Indicator */}
              {!isLogin && formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-400">Password Strength</span>
                    <span className={`font-medium ${
                      passwordStrength < 50 ? 'text-red-400' : 
                      passwordStrength < 75 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirm Password Field */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword || ''}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                        errors.confirmPassword 
                          ? 'border-red-400 focus:ring-red-400/50' 
                          : 'border-slate-600 focus:ring-slate-400/50 focus:border-slate-400'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Remember Me & Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    className="w-4 h-4 text-soft-pink bg-gray-100 border-gray-300 rounded focus:ring-soft-pink/50 focus:ring-2"
                  />
                  <span className="text-sm text-deep-navy/70">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-soft-pink hover:text-pale-blue transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* CAPTCHA Placeholder */}
            {showCaptcha && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-light-grey rounded-lg border border-pale-blue/20"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-deep-navy/70" />
                  <span className="text-sm text-deep-navy/70">Security verification required</span>
                </div>
                <div className="mt-3 p-3 bg-white rounded-lg border-2 border-dashed border-pale-blue/30 text-center">
                  <p className="text-sm text-deep-navy/50">CAPTCHA verification would appear here</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-slate-200 hover:bg-slate-100 text-slate-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Google', icon: Chrome, color: 'hover:bg-slate-700' },
                { name: 'Facebook', icon: Facebook, color: 'hover:bg-slate-700' },
                { name: 'Twitter', icon: Twitter, color: 'hover:bg-slate-700' }
              ].map((social) => (
                <motion.button
                  key={social.name}
                  type="button"
                  onClick={() => handleSocialLogin(social.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center py-3 px-4 bg-slate-700/30 border border-slate-600 rounded-lg transition-all duration-200 ${social.color}`}
                >
                  <social.icon className="w-5 h-5 text-slate-400" />
                </motion.button>
              ))}
            </div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-slate-400">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-slate-300 hover:text-slate-100 transition-colors duration-200">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-slate-300 hover:text-slate-100 transition-colors duration-200">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;