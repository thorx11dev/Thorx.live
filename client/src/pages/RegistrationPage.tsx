import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
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
  Info,
  X,
  Moon,
  Sun,
  Layers,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Pentagon,
  Octagon
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

interface NotificationState {
  type: 'success' | 'error' | 'info';
  message: string;
}

const RegistrationPage = () => {
  const [, setLocation] = useLocation();
  const { register, login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFloatingElement, setActiveFloatingElement] = useState<number | null>(null);

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
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Password strength calculation
  useEffect(() => {
    const calculatePasswordStrength = (password: string): number => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[a-z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      return strength;
    };

    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

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

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Sign up specific validations
    if (isSignUp) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
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
      if (isSignUp) {
        const success = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName!,
          lastName: formData.lastName!
        });

        if (success) {
          setNotification({
            type: 'success',
            message: 'Account created successfully! Welcome to Thorx!'
          });
          setTimeout(() => setLocation('/dashboard'), 2000);
        } else {
          setNotification({
            type: 'error',
            message: 'Registration failed. Please try again.'
          });
        }
      } else {
        const success = await login(formData.email, formData.password, formData.rememberMe);

        if (success) {
          setNotification({
            type: 'success',
            message: 'Welcome back! Redirecting to dashboard...'
          });
          setTimeout(() => setLocation('/dashboard'), 2000);
        } else {
          setNotification({
            type: 'error',
            message: 'Invalid credentials. Please check your email and password.'
          });
        }
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Floating cosmic elements data
  const floatingElements = [
    { icon: Hexagon, size: 24, delay: 0, color: 'text-blue-400' },
    { icon: Triangle, size: 18, delay: 0.5, color: 'text-purple-400' },
    { icon: Circle, size: 20, delay: 1, color: 'text-cyan-400' },
    { icon: Square, size: 16, delay: 1.5, color: 'text-pink-400' },
    { icon: Pentagon, size: 22, delay: 2, color: 'text-green-400' },
    { icon: Octagon, size: 19, delay: 2.5, color: 'text-yellow-400' },
    { icon: Star, size: 17, delay: 3, color: 'text-indigo-400' },
    { icon: Sparkles, size: 21, delay: 3.5, color: 'text-teal-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-green-500/15 to-yellow-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Geometric Elements */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className={`absolute ${element.color} opacity-20 animate-bounce`}
              style={{
                left: `${10 + (index * 12)}%`,
                top: `${15 + (index * 10)}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: '4s'
              }}
              onMouseEnter={() => setActiveFloatingElement(index)}
              onMouseLeave={() => setActiveFloatingElement(null)}
            >
              <Icon 
                size={element.size} 
                className={`transition-all duration-300 ${
                  activeFloatingElement === index ? 'scale-150 opacity-60' : ''
                }`}
              />
            </div>
          );
        })}

        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M100,100 L300,200 L500,150 L700,250 L900,200"
            stroke="url(#constellationGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M200,300 L400,350 L600,300 L800,400"
            stroke="url(#constellationGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Enhanced Animated Clouds */}
      <EnhancedAnimatedClouds 
        density="medium" 
        scrollFactor={0.5} 
        className="absolute inset-0 opacity-40"
        enableInteraction={true}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Side - Cosmic Illustration Portal */}
          <div className="hidden lg:flex flex-col justify-center items-center space-y-8">
            {/* Cosmic Portal Container */}
            <div className="relative">
              {/* Central Portal */}
              <div className="w-80 h-80 relative">
                {/* Outer Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border-2 border-purple-500/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 rounded-full border-2 border-cyan-500/30 animate-spin" style={{ animationDuration: '10s' }} />
                
                {/* Central Core */}
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full animate-pulse flex items-center justify-center">
                    <ThorxLogo size="xl" logoColor="#e2e8f0" />
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-500/60 rounded-full animate-pulse" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="w-4 h-4 bg-purple-500/60 rounded-full animate-pulse" />
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 bg-cyan-500/60 rounded-full animate-pulse" />
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-pink-500/60 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Constellation */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              {[
                { icon: Shield, title: 'Secure', desc: 'Bank-grade encryption' },
                { icon: Zap, title: 'Fast', desc: 'Instant transactions' },
                { icon: Globe, title: 'Global', desc: 'Worldwide access' },
                { icon: Crown, title: 'Premium', desc: 'Elite features' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 opacity-70">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-slate-300">50K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-slate-300">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-slate-300">Award Winning</span>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
                <div className="inline-block relative">
                  <ThorxLogo size="lg" logoColor="#e2e8f0" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
                </div>
              </div>

              {/* Form Container */}
              <div className="relative">
                {/* Form Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
                <div className="absolute inset-px bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl" />

                {/* Form Content */}
                <div className="relative z-10 p-8 space-y-6">
                  {/* Form Header */}
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {isSignUp ? 'Join the Cosmic Revolution' : 'Welcome Back, Explorer'}
                    </h1>
                    <p className="text-slate-400">
                      {isSignUp ? 'Create your account to start earning in the digital universe' : 'Continue your journey through the cosmic realm'}
                    </p>
                  </div>

                  {/* Form Toggle */}
                  <div className="flex bg-slate-800/50 rounded-xl p-1 backdrop-blur-md border border-slate-700/50">
                    <button
                      onClick={() => setIsSignUp(true)}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        isSignUp 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Join Universe
                    </button>
                    <button
                      onClick={() => setIsSignUp(false)}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        !isSignUp 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Return Home
                    </button>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Fields - Sign Up Only */}
                    {isSignUp && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300">First Name</label>
                          <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                            <input
                              type="text"
                              value={formData.firstName || ''}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-slate-200 placeholder-slate-500 hover:bg-slate-800/70 ${
                                errors.firstName 
                                  ? 'border-red-500 focus:ring-red-500/50' 
                                  : 'border-slate-700 focus:ring-blue-500/50 focus:border-blue-500'
                              }`}
                              placeholder="John"
                            />
                          </div>
                          {errors.firstName && (
                            <p className="text-red-400 text-sm animate-pulse">{errors.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300">Last Name</label>
                          <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                            <input
                              type="text"
                              value={formData.lastName || ''}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-slate-200 placeholder-slate-500 hover:bg-slate-800/70 ${
                                errors.lastName 
                                  ? 'border-red-500 focus:ring-red-500/50' 
                                  : 'border-slate-700 focus:ring-blue-500/50 focus:border-blue-500'
                              }`}
                              placeholder="Doe"
                            />
                          </div>
                          {errors.lastName && (
                            <p className="text-red-400 text-sm animate-pulse">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-slate-200 placeholder-slate-500 hover:bg-slate-800/70 ${
                            errors.email 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-slate-700 focus:ring-blue-500/50 focus:border-blue-500'
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm animate-pulse">{errors.email}</p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className={`w-full pl-10 pr-12 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-slate-200 placeholder-slate-500 hover:bg-slate-800/70 ${
                            errors.password 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-slate-700 focus:ring-blue-500/50 focus:border-blue-500'
                          }`}
                          placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm animate-pulse">{errors.password}</p>
                      )}
                      
                      {/* Password Strength - Sign Up Only */}
                      {isSignUp && formData.password && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
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

                    {/* Confirm Password - Sign Up Only */}
                    {isSignUp && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Confirm Password</label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword || ''}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className={`w-full pl-10 pr-12 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-slate-200 placeholder-slate-500 hover:bg-slate-800/70 ${
                              errors.confirmPassword 
                                ? 'border-red-500 focus:ring-red-500/50' 
                                : 'border-slate-700 focus:ring-blue-500/50 focus:border-blue-500'
                            }`}
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-400 text-sm animate-pulse">{errors.confirmPassword}</p>
                        )}
                      </div>
                    )}

                    {/* Remember Me - Sign In Only */}
                    {!isSignUp && (
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={formData.rememberMe}
                          onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                          className="w-4 h-4 text-blue-500 border-slate-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="rememberMe" className="text-sm text-slate-300">
                          Remember me for 30 days
                        </label>
                      </div>
                    )}

                    {/* Terms - Sign Up Only */}
                    {isSignUp && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                            className="mt-1 w-4 h-4 text-blue-500 border-slate-600 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="acceptTerms" className="text-sm text-slate-300">
                            I agree to the{' '}
                            <Link to="/terms" className="text-blue-400 hover:text-blue-300 underline">
                              Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                        {errors.acceptTerms && (
                          <p className="text-red-400 text-sm animate-pulse">{errors.acceptTerms}</p>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 px-6 rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{isSignUp ? 'Launch Into Universe' : 'Return to Universe'}</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {/* Forgot Password - Sign In Only */}
                    {!isSignUp && (
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setNotification({
                            type: 'info',
                            message: 'Password reset instructions sent to your email!'
                          })}
                          className="text-blue-400 hover:text-blue-300 text-sm underline"
                        >
                          Forgot your cosmic password?
                        </button>
                      </div>
                    )}

                    {/* Toggle Form */}
                    <div className="text-center">
                      <p className="text-slate-400">
                        {isSignUp ? 'Already exploring the cosmos?' : 'New to the universe?'}{' '}
                        <button
                          type="button"
                          onClick={() => setIsSignUp(!isSignUp)}
                          className="text-blue-400 hover:text-blue-300 font-medium underline"
                        >
                          {isSignUp ? 'Sign in here' : 'Create account'}
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Cosmic Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 max-w-md">
          <div className={`p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform ${
            notification.type === 'success' 
              ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100' 
              : notification.type === 'error'
              ? 'bg-red-900/90 border-red-500 text-red-100'
              : 'bg-blue-900/90 border-blue-500 text-blue-100'
          }`}>
            <div className="flex items-center space-x-3">
              {notification.type === 'success' && <CheckCircle className="w-6 h-6 text-emerald-400" />}
              {notification.type === 'error' && <AlertTriangle className="w-6 h-6 text-red-400" />}
              {notification.type === 'info' && <Info className="w-6 h-6 text-blue-400" />}
              <p className="font-medium flex-1">{notification.message}</p>
              <button
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;