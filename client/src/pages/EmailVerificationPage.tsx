import React, { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  ArrowLeft,
  Shield,
  Clock,
  XCircle,
  Loader2
} from 'lucide-react';
import { ThorxLogo } from '../components/ThorxLogo';
import { useAuth } from '../hooks/useAuth';
import { apiRequest } from '../lib/queryClient';
import EmailTroubleshootingGuide from '../components/EmailTroubleshootingGuide';

interface VerificationResult {
  success: boolean;
  message: string;
  error?: string;
  user?: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    emailVerifiedAt?: string;
  };
}

const EmailVerificationPage = () => {
  const [, params] = useRoute('/verify-email');
  const [location, setLocation] = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isResending, setIsResending] = useState(false);
  const { user } = useAuth();

  // Get parameters from URL query
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const success = urlParams.get('success') === 'true';
  const verified = urlParams.get('verified') === 'true';
  const error = urlParams.get('error');

  useEffect(() => {
    if (success && verified) {
      // Direct success from API redirect
      setVerificationResult({
        success: true,
        message: 'Email verified successfully! You can now access all Thorx features.',
      });
    } else if (error) {
      // Direct error from API redirect
      let errorMessage = 'Email verification failed';
      if (error === 'invalid-token') {
        errorMessage = 'Invalid or expired verification token';
      } else if (error === 'user-not-found') {
        errorMessage = 'User not found';
      } else if (error === 'server-error') {
        errorMessage = 'Server error during verification';
      }
      setVerificationResult({
        success: false,
        message: errorMessage,
        error: error
      });
    } else if (token) {
      // Legacy token verification (should not happen with new flow)
      verifyEmailToken(token);
    }
  }, [token, success, verified, error]);

  const verifyEmailToken = async (verificationToken: string) => {
    setIsVerifying(true);
    try {
      const response = await apiRequest(`/api/auth/verify-email?token=${verificationToken}`);
      
      if (response.ok) {
        const data = await response.json();
        setVerificationResult({
          success: true,
          message: data.message,
          user: data.user
        });
      } else {
        const errorData = await response.json();
        setVerificationResult({
          success: false,
          message: errorData.error || 'Email verification failed',
          error: errorData.error
        });
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setVerificationResult({
        success: false,
        message: 'Network error during verification. Please try again.',
        error: 'Network error'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerificationEmail = async () => {
    setIsResending(true);
    try {
      const response = await apiRequest('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setVerificationResult({
          success: true,
          message: data.message
        });
      } else {
        const errorData = await response.json();
        setVerificationResult({
          success: false,
          message: errorData.error || 'Failed to resend verification email',
          error: errorData.error
        });
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setVerificationResult({
        success: false,
        message: 'Network error. Please try again.',
        error: 'Network error'
      });
    } finally {
      setIsResending(false);
    }
  };

  const getStatusIcon = () => {
    if (isVerifying) {
      return <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />;
    }
    
    if (verificationResult?.success) {
      return <CheckCircle className="w-16 h-16 text-green-400" />;
    } else if (verificationResult?.error) {
      return <XCircle className="w-16 h-16 text-red-400" />;
    }
    
    return <Mail className="w-16 h-16 text-blue-400" />;
  };

  const getStatusMessage = () => {
    if (isVerifying) {
      return "Verifying your email address...";
    }
    
    if (verificationResult?.message) {
      return verificationResult.message;
    }
    
    if (!token) {
      return "Invalid verification link. Please check your email for the correct verification link.";
    }
    
    return "Processing verification...";
  };

  const getStatusColor = () => {
    if (isVerifying) return "text-blue-300";
    if (verificationResult?.success) return "text-green-300";
    if (verificationResult?.error) return "text-red-300";
    return "text-slate-300";
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Subtle cosmic elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-80 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-10 w-1 h-1 bg-yellow-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center gap-3">
          <ThorxLogo size="md" className="text-slate-200" />
          <h1 className="text-xl font-bold text-slate-200">Thorx</h1>
        </div>
        
        <button
          onClick={() => setLocation('/')}
          className="text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 text-center">
            
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              {getStatusIcon()}
            </div>

            {/* Status Message */}
            <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
              {isVerifying ? "Verifying Email" : verificationResult?.success ? "Email Verified!" : "Verification Status"}
            </h1>

            <p className="text-slate-300 mb-6 leading-relaxed">
              {getStatusMessage()}
            </p>

            {/* Success State */}
            {verificationResult?.success && verificationResult.user && (
              <div className="mb-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">Account Verified</span>
                  </div>
                  <p className="text-green-200 text-sm">
                    {verificationResult.user.firstName} {verificationResult.user.lastName}
                  </p>
                  <p className="text-green-200 text-sm">
                    {verificationResult.user.email}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Access to all Thorx features unlocked</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Earning opportunities now available</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Secure payout system activated</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {verificationResult?.error && (
              <div className="mb-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-medium">Verification Failed</span>
                  </div>
                  <p className="text-red-200 text-sm">
                    {verificationResult.error}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span>Links expire after 24 hours</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span>Links can only be used once</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {verificationResult?.success ? (
                <button
                  onClick={() => setLocation('/dashboard')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Go to Dashboard
                </button>
              ) : verificationResult?.error && user ? (
                <button
                  onClick={resendVerificationEmail}
                  disabled={isResending}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isResending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              ) : !token ? (
                <button
                  onClick={() => setLocation('/auth')}
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Go to Login
                </button>
              ) : null}
              
              <button
                onClick={() => setLocation('/')}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-6 rounded-lg transition-all duration-200"
              >
                Return to Home
              </button>
            </div>
          </div>
          
          {/* Email Troubleshooting Guide */}
          {(!verificationResult?.success && !isVerifying) && (
            <div className="mt-8 max-w-4xl mx-auto">
              <EmailTroubleshootingGuide />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;