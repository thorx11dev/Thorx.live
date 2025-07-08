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
  Loader,
  Shield,
  Zap,
  Star,
  Sparkles,
  Globe,
  Rocket,
  Crown,
  Gem,
  Award,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  MapPin,
  Smartphone,
  Wifi,
  Database,
  Activity,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import ThorxLogo from '../components/ThorxLogo';
import EnhancedAnimatedClouds from '../components/3d/EnhancedAnimatedClouds';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  acceptTerms: boolean;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  acceptTerms?: string;
  general?: string;
}

const RegistrationPage = () => {
  const [, setLocation] = useLocation();
  const { register, login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false,
    rememberMe: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // Page loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Password strength calculation
  useEffect(() => {
    if (isSignUp && formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength += 25;
      if (/[A-Z]/.test(formData.password)) strength += 25;
      if (/[0-9]/.test(formData.password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
      setPasswordStrength(strength);
    }
  }, [formData.password, isSignUp]);

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
    } else if (isSignUp) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
      }
    }

    // Sign-up specific validation
    if (isSignUp) {
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
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      
      if (isSignUp) {
        success = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName || '',
          lastName: formData.lastName || ''
        });
      } else {
        success = await login(formData.email, formData.password, formData.rememberMe);
      }
      
      if (success) {
        setNotification({
          type: 'success',
          message: isSignUp ? 'Account created successfully! Welcome to Thorx!' : 'Welcome back to Thorx!'
        });
        
        setTimeout(() => {
          setLocation('/dashboard');
        }, 2000);
      } else {
        setNotification({
          type: 'error',
          message: isSignUp ? 'Registration failed. Please try again.' : 'Invalid credentials. Please try again.'
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

  const cosmicStats = [
    { icon: Users, value: '50,000+', label: 'Active Explorers', gradient: 'from-blue-400 to-cyan-400' },
    { icon: DollarSign, value: '$2.5M+', label: 'Total Earnings', gradient: 'from-green-400 to-emerald-400' },
    { icon: Globe, value: '150+', label: 'Global Tasks', gradient: 'from-purple-400 to-pink-400' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate', gradient: 'from-orange-400 to-red-400' }
  ];

  const premiumFeatures = [
    { icon: Crown, title: 'VIP Access', description: 'Exclusive high-paying opportunities', accent: 'bg-yellow-500/20' },
    { icon: Shield, title: 'Secure Vault', description: 'Military-grade data protection', accent: 'bg-blue-500/20' },
    { icon: Rocket, title: 'Instant Payouts', description: 'Lightning-fast withdrawals', accent: 'bg-purple-500/20' },
    { icon: Gem, title: 'Premium Tools', description: 'Advanced earning analytics', accent: 'bg-cyan-500/20' }
  ];

  if (!isPageLoaded) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-slate-400 rounded-full mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Thorx</h2>
          <p className="text-slate-400">Loading registration portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Clouds Background */}
      <EnhancedAnimatedClouds 
        density="high" 
        scrollFactor={0.2} 
        className="absolute inset-0 z-0"
        enableInteraction={true}
      />

      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Interactive Orbital Rings */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute rounded-full border border-slate-600/30 animate-spin"
            style={{
              width: '800px',
              height: '800px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDuration: '60s',
              animationDirection: 'reverse'
            }}
          />
          <div 
            className="absolute rounded-full border border-slate-500/20 animate-spin"
            style={{
              width: '1200px',
              height: '1200px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDuration: '80s'
            }}
          />
        </div>

        {/* Dynamic Cosmic Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Interactive Mouse Follower */}
        <div 
          className="absolute pointer-events-none z-20"
          style={{
            top: `${mousePosition.y}%`,
            left: `${mousePosition.x}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease'
          }}
        >
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Constellation Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cosmicGrid" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="#64748b" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="75" cy="50" r="1.5" fill="#7c3aed" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle cx="125" cy="75" r="1" fill="#06b6d4" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <line x1="25" y1="25" x2="75" y2="50" stroke="#64748b" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
              </line>
              <line x1="75" y1="50" x2="125" y2="75" stroke="#7c3aed" strokeWidth="0.5" opacity="0.2">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" begin="2s" />
              </line>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cosmicGrid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex min-h-screen">
        {/* Left Side - Cosmic Dashboard */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg mx-auto">
            {/* Logo with Cosmic Effects */}
            <div className="mb-8 text-center">
              <Link to="/">
                <div className="inline-block relative">
                  <ThorxLogo size="xl" logoColor="#e2e8f0" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
                </div>
              </Link>
            </div>

            {/* Hero Text with Enhanced Styling */}
            <div className="mb-12 text-center cosmic-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl xl:text-5xl font-bold mb-4 thorx-hero-title thorx-signin-color">
                {isSignUp ? 'Join the Cosmic Revolution' : 'Welcome Back, Explorer'}
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                {isSignUp 
                  ? 'Embark on your digital earning journey with Thorx. Connect with opportunities across the universe and transform your potential into profit.'
                  : 'Continue your cosmic journey and unlock new earning opportunities in the digital universe.'
                }
              </p>
            </div>

            {/* Cosmic Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {cosmicStats.map((stat, index) => (
                <div 
                  key={index}
                  className="cosmic-glass-light p-6 rounded-xl cosmic-hover-lift cosmic-fade-in text-center"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-200 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Premium Features */}
            <div className="space-y-4">
              {premiumFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="cosmic-glass-light p-4 rounded-xl cosmic-hover-lift cosmic-fade-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${feature.accent} flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">{feature.title}</h3>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators with Enhanced Styling */}
            <div className="mt-12 cosmic-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex items-center justify-center space-x-8 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">50K+ Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Authentication Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo with Cosmic Effects */}
            <div className="lg:hidden text-center mb-8">
              <Link to="/">
                <div className="inline-block relative">
                  <ThorxLogo size="lg" logoColor="#e2e8f0" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
                </div>
              </Link>
            </div>

            {/* Enhanced Form Container */}
            <div className="cosmic-glass p-8 rounded-xl cosmic-scale-in relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
              {/* Cosmic Form Background Effects */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400 to-pink-400 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
              </div>

              {/* Form Toggle */}
              <div className="flex bg-slate-800/50 rounded-xl p-1 mb-8 backdrop-blur-md border border-slate-700/50 relative z-10">
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isSignUp 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    !isSignUp 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Form Header */}
              <div className="text-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold text-slate-200 mb-2">
                  {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-slate-400">
                  {isSignUp ? 'Start your cosmic earning journey today' : 'Continue your cosmic adventure'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Name Fields - Sign Up Only */}
                {isSignUp && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 cosmic-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        First Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 group-hover:text-slate-300 transition-colors" />
                        <input
                          type="text"
                          value={formData.firstName || ''}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 hover:bg-slate-700/70 ${
                            errors.firstName 
                              ? 'border-red-400 focus:ring-red-400/50' 
                              : 'border-slate-600 focus:ring-blue-400/50 focus:border-blue-400'
                          }`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Last Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 group-hover:text-slate-300 transition-colors" />
                        <input
                          type="text"
                          value={formData.lastName || ''}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 hover:bg-slate-700/70 ${
                            errors.lastName 
                              ? 'border-red-400 focus:ring-red-400/50' 
                              : 'border-slate-600 focus:ring-blue-400/50 focus:border-blue-400'
                          }`}
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="cosmic-fade-in" style={{ animationDelay: '0.2s' }}>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 group-hover:text-slate-300 transition-colors" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 hover:bg-slate-700/70 ${
                        errors.email 
                          ? 'border-red-400 focus:ring-red-400/50' 
                          : 'border-slate-600 focus:ring-blue-400/50 focus:border-blue-400'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="cosmic-fade-in" style={{ animationDelay: '0.3s' }}>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 group-hover:text-slate-300 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 hover:bg-slate-700/70 ${
                        errors.password 
                          ? 'border-red-400 focus:ring-red-400/50' 
                          : 'border-slate-600 focus:ring-blue-400/50 focus:border-blue-400'
                      }`}
                      placeholder={isSignUp ? "Choose a strong password" : "Enter your password"}
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
                    <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.password}</p>
                  )}
                  
                  {/* Password Strength Indicator - Sign Up Only */}
                  {isSignUp && formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength < 25 ? 'text-red-400' :
                          passwordStrength < 50 ? 'text-yellow-400' :
                          passwordStrength < 75 ? 'text-blue-400' :
                          'text-green-400'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field - Sign Up Only */}
                {isSignUp && (
                  <div className="cosmic-fade-in" style={{ animationDelay: '0.4s' }}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 group-hover:text-slate-300 transition-colors" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword || ''}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-slate-200 placeholder-slate-500 hover:bg-slate-700/70 ${
                          errors.confirmPassword 
                            ? 'border-red-400 focus:ring-red-400/50' 
                            : 'border-slate-600 focus:ring-blue-400/50 focus:border-blue-400'
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
                      <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Remember Me - Sign In Only */}
                {!isSignUp && (
                  <div className="cosmic-fade-in" style={{ animationDelay: '0.4s' }}>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                        className="w-4 h-4 text-blue-400 border-slate-600 rounded focus:ring-blue-400 focus:ring-2"
                      />
                      <span className="text-sm text-slate-300">Remember me for 30 days</span>
                    </label>
                  </div>
                )}

                {/* Terms Checkbox - Sign Up Only */}
                {isSignUp && (
                  <div className="cosmic-fade-in" style={{ animationDelay: '0.5s' }}>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                        className="mt-1 w-4 h-4 text-blue-400 border-slate-600 rounded focus:ring-blue-400 focus:ring-2"
                      />
                      <span className="text-sm text-slate-300">
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-400 hover:text-blue-300 underline">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.acceptTerms}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 px-6 rounded-lg font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg hover:shadow-xl hover:scale-105 cosmic-fade-in"
                  style={{ animationDelay: '0.6s' }}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Forgot Password - Sign In Only */}
                {!isSignUp && (
                  <div className="text-center cosmic-fade-in" style={{ animationDelay: '0.7s' }}>
                    <button
                      type="button"
                      onClick={() => setNotification({
                        type: 'success',
                        message: 'Password reset instructions sent to your email!'
                      })}
                      className="text-blue-400 hover:text-blue-300 text-sm underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

                {/* Toggle Form Type */}
                <div className="text-center cosmic-fade-in" style={{ animationDelay: '0.8s' }}>
                  <p className="text-slate-400">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-blue-400 hover:text-blue-300 font-medium underline"
                    >
                      {isSignUp ? 'Sign in' : 'Sign up'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Cosmic Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className={`p-4 rounded-xl border backdrop-blur-md transition-all duration-300 cosmic-scale-in shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-900/90 border-green-500 text-green-100' 
              : notification.type === 'error'
              ? 'bg-red-900/90 border-red-500 text-red-100'
              : 'bg-blue-900/90 border-blue-500 text-blue-100'
          }`}>
            <div className="flex items-center space-x-3">
              {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
              {notification.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400" />}
              {notification.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
              <p className="font-medium">{notification.message}</p>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;