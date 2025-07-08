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
  Rocket
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import ThorxLogo from '../components/ThorxLogo';
import EnhancedAnimatedClouds from '../components/3d/EnhancedAnimatedClouds';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
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
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // Page loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Password strength calculation
  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength += 25;
      if (/[A-Z]/.test(formData.password)) strength += 25;
      if (/[0-9]/.test(formData.password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
      setPasswordStrength(strength);
    }
  }, [formData.password]);

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    // Name validation
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      const success = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      if (success) {
        setNotification({
          type: 'success',
          message: 'Account created successfully! Welcome to Thorx!'
        });
        
        setTimeout(() => {
          setLocation('/dashboard');
        }, 2000);
      } else {
        setNotification({
          type: 'error',
          message: 'Registration failed. Please try again.'
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

  const benefits = [
    { icon: Zap, title: 'Instant Earnings', description: 'Start earning immediately with our diverse task platform' },
    { icon: Shield, title: 'Secure Platform', description: 'Your data and earnings are protected with enterprise-grade security' },
    { icon: Globe, title: 'Global Opportunities', description: 'Access earning opportunities from around the world' },
    { icon: Star, title: 'Premium Features', description: 'Unlock advanced tools and higher-paying tasks' }
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
        scrollFactor={0.3} 
        className="absolute inset-0 z-0"
        enableInteraction={true}
      />

      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating Orbital Particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full animate-pulse cosmic-orbital-float" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-2 h-2 bg-gradient-to-r from-teal-400/50 to-cyan-400/50 rounded-full animate-pulse cosmic-orbital-float" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-gradient-to-r from-pink-400/30 to-rose-400/30 rounded-full animate-pulse cosmic-orbital-float" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-gradient-to-r from-indigo-400/45 to-purple-400/45 rounded-full animate-pulse cosmic-orbital-float" 
             style={{ animationDelay: '3s' }} />
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-slate-300/60 rounded-full animate-pulse cosmic-drift" 
             style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-slate-400/50 rounded-full animate-pulse cosmic-drift" 
             style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-slate-200/40 rounded-full animate-pulse cosmic-drift" 
             style={{ animationDelay: '2.5s' }} />

        {/* Enhanced Constellation Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="constellationGrid" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1.5" fill="#64748b" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
                <animate attributeName="r" values="1.5;2;1.5" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="r" values="1;1.5;1" dur="3s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle cx="100" cy="150" r="1.2" fill="#64748b" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="r" values="1.2;1.8;1.2" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <line x1="50" y1="50" x2="150" y2="100" stroke="#64748b" strokeWidth="0.5" opacity="0.2">
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite" />
              </line>
              <line x1="150" y1="100" x2="100" y2="150" stroke="#64748b" strokeWidth="0.5" opacity="0.2">
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite" begin="1s" />
              </line>
              <line x1="100" y1="150" x2="50" y2="50" stroke="#64748b" strokeWidth="0.3" opacity="0.1">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="6s" repeatCount="indefinite" begin="2s" />
              </line>
            </pattern>
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#constellationGrid)" filter="url(#starGlow)" />
        </svg>
        
        {/* Nebula-inspired Gradient Orbs */}
        <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse cosmic-nebula-drift" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/4 right-1/5 w-40 h-40 bg-gradient-to-r from-blue-500/8 to-teal-500/8 rounded-full blur-3xl animate-pulse cosmic-nebula-drift" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-indigo-500/12 to-cyan-500/12 rounded-full blur-3xl animate-pulse cosmic-nebula-drift" 
             style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <Link to="/">
                <ThorxLogo size="xl" logoColor="#e2e8f0" />
              </Link>
            </div>

            {/* Hero Text */}
            <div className="mb-12 cosmic-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl xl:text-5xl font-bold text-slate-200 mb-4 thorx-hero-title thorx-signin-color">
                Join the Cosmic Revolution
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                Embark on your digital earning journey with Thorx. Connect with opportunities 
                across the universe and transform your potential into profit.
              </p>
              
              {/* Cosmic Illustration */}
              <div className="relative w-full h-32 mb-8 cosmic-fade-in" style={{ animationDelay: '0.3s' }}>
                <svg 
                  className="w-full h-full opacity-60" 
                  viewBox="0 0 400 120" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Cosmic Path */}
                  <path 
                    d="M 20 60 Q 100 20 180 60 T 360 60" 
                    stroke="url(#cosmicGradient)" 
                    strokeWidth="2" 
                    fill="none"
                    filter="url(#glow)"
                  >
                    <animate 
                      attributeName="stroke-dasharray" 
                      values="0,400;400,400;400,0" 
                      dur="4s" 
                      repeatCount="indefinite"
                    />
                  </path>
                  
                  {/* Floating Cosmic Objects */}
                  <circle cx="60" cy="45" r="3" fill="#94a3b8" opacity="0.6">
                    <animate attributeName="cy" values="45;35;45" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="160" cy="75" r="2" fill="#64748b" opacity="0.4">
                    <animate attributeName="cy" values="75;65;75" dur="2.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="280" cy="40" r="2.5" fill="#94a3b8" opacity="0.5">
                    <animate attributeName="cy" values="40;30;40" dur="3.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite"/>
                  </circle>
                  
                  {/* Cosmic Destination */}
                  <circle cx="380" cy="60" r="8" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="380" cy="60" r="4" fill="#94a3b8" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="cosmic-glass-light p-6 rounded-xl cosmic-hover-lift cosmic-benefit-card"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <benefit.icon className="w-6 h-6 text-slate-300 transition-transform duration-300 hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400/10 to-transparent transform -translate-x-full transition-transform duration-500 hover:translate-x-full" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">{benefit.title}</h3>
                      <p className="text-slate-400 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 cosmic-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center space-x-6 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span className="text-sm">Trusted by 10K+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Link to="/">
                <ThorxLogo size="lg" logoColor="#e2e8f0" />
              </Link>
            </div>

            {/* Registration Form */}
            <div className="cosmic-glass p-8 rounded-xl cosmic-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Your Account</h2>
                <p className="text-slate-400">Start your cosmic earning journey today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <div className="relative cosmic-form-field">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 transition-colors duration-300" />
                      <input
                        type="text"
                        value={formData.firstName}
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
                        value={formData.lastName}
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
                </div>

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
                      placeholder="Choose a strong password"
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
                  {formData.password && (
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

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
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
                </div>

                {/* Terms Checkbox */}
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                      className="mt-1 w-4 h-4 text-slate-400 border-slate-600 rounded focus:ring-slate-400 focus:ring-2"
                    />
                    <span className="text-sm text-slate-300">
                      I agree to the{' '}
                      <Link to="/terms" className="text-slate-400 hover:text-slate-200 underline">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-slate-400 hover:text-slate-200 underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-red-400 text-sm mt-1">{errors.acceptTerms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full thorx-btn-primary cosmic-interactive-btn py-4 px-6 rounded-lg font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Already Have Account */}
                <div className="text-center">
                  <p className="text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-slate-300 hover:text-slate-200 font-medium underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className={`p-4 rounded-xl border transition-all duration-300 cosmic-scale-in ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className="font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;