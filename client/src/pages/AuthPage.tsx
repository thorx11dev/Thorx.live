import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Shield,
  Star,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { ThorxLogo } from '../components/ThorxLogo';
import EnhancedAnimatedClouds from '../components/3d/EnhancedAnimatedClouds';

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
  const [isLogin, setIsLogin] = useState(location === '/login' || location === '/auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();

  // Update form mode based on route
  useEffect(() => {
    setIsLogin(location === '/login' || location === '/auth');
    // If user navigates to /register, show signup form
    if (location === '/register') {
      setIsLogin(false);
    }
  }, [location]);

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

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-400';
    if (passwordStrength < 50) return 'bg-yellow-400';
    if (passwordStrength < 75) return 'bg-blue-400';
    return 'bg-green-400';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Clouds Background */}
      <EnhancedAnimatedClouds density="high" scrollFactor={0.8} className="absolute inset-0 z-0" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle constellation pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5" />
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3" />
                <circle cx="100" cy="150" r="1" fill="#64748b" opacity="0.4" />
                <line x1="50" y1="50" x2="150" y2="100" stroke="#64748b" strokeWidth="0.5" opacity="0.2" />
                <line x1="150" y1="100" x2="100" y2="150" stroke="#64748b" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation)"/>
          </svg>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-300' 
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            <div className="flex items-center space-x-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              <p className="font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <ThorxLogo size="xl" className="text-slate-200" />
            </div>
            <h1 className="text-3xl font-bold text-slate-200 mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Journey'}
            </h1>
            <p className="text-slate-400 mb-6">
              {isLogin ? 'Sign in to your cosmic account' : 'Create your account and explore the digital universe'}
            </p>
            
            {/* Elegant Divider */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="h-px w-12 bg-slate-600"></div>
              <Star className="w-4 h-4 text-slate-500" />
              <div className="h-px w-12 bg-slate-600"></div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            
            {/* Form Toggle */}
            <div className="flex bg-slate-800/50 rounded-lg p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                  isLogin 
                    ? 'bg-slate-700 text-slate-200 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-slate-700 text-slate-200 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Fields (Sign Up Only) */}
              {!isLogin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                          errors.firstName 
                            ? 'border-red-400' 
                            : 'border-slate-600'
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
                        className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                          errors.lastName 
                            ? 'border-red-400' 
                            : 'border-slate-600'
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

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
                    className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                      errors.email 
                        ? 'border-red-400' 
                        : 'border-slate-600'
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
                    className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                      errors.password 
                        ? 'border-red-400' 
                        : 'border-slate-600'
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
                
                {/* Password Strength Indicator (Sign Up Only) */}
                {!isLogin && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Password Strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength < 25 ? 'text-red-400' :
                        passwordStrength < 50 ? 'text-yellow-400' :
                        passwordStrength < 75 ? 'text-blue-400' :
                        'text-green-400'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword || ''}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 text-slate-200 placeholder-slate-500 ${
                        errors.confirmPassword 
                          ? 'border-red-400' 
                          : 'border-slate-600'
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
                </div>
              )}

              {/* Remember Me (Sign In Only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                      className="w-4 h-4 text-slate-600 bg-slate-700 border-slate-600 rounded focus:ring-slate-500"
                    />
                    <span className="ml-2 text-sm text-slate-300">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-200 rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-slate-300 hover:text-slate-100 font-medium underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2 text-slate-500">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Star className="w-4 h-4" />
                <span className="text-xs">Trusted</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs">Cosmic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;