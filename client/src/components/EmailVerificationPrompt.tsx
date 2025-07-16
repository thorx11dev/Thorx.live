import React, { useState } from 'react';
import { 
  Mail, 
  AlertCircle, 
  RefreshCw, 
  X, 
  CheckCircle,
  Shield,
  Loader2,
  User
} from 'lucide-react';
import { apiRequest } from '../lib/queryClient';
import ThorxEmailLogo from './ThorxEmailLogo';

interface EmailVerificationPromptProps {
  isVisible: boolean;
  onClose?: () => void;
  userEmail?: string;
  onVerificationSent?: () => void;
}

export const EmailVerificationPrompt: React.FC<EmailVerificationPromptProps> = ({
  isVisible,
  onClose,
  userEmail,
  onVerificationSent
}) => {
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const resendVerificationEmail = async () => {
    setIsResending(true);
    setResendMessage(null);
    
    try {
      const response = await apiRequest('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setResendMessage({
          type: 'success',
          text: data.message
        });
        onVerificationSent?.();
      } else {
        const errorData = await response.json();
        setResendMessage({
          type: 'error',
          text: errorData.error || 'Failed to resend verification email'
        });
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setResendMessage({
        type: 'error',
        text: 'Network error. Please try again.'
      });
    } finally {
      setIsResending(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full p-6 relative">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4 overflow-hidden">
            <ThorxEmailLogo size="md" className="rounded-full" />
          </div>
          <h2 className="text-xl font-bold text-slate-200 mb-2">
            Verify Your Email Address
          </h2>
          <p className="text-slate-400 text-sm">
            To unlock all Thorx features and start earning, please verify your email address.
          </p>
        </div>

        {/* Email Address */}
        {userEmail && (
          <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
            <p className="text-slate-300 text-sm text-center">
              Verification email sent to:
            </p>
            <p className="text-slate-200 font-medium text-center">
              {userEmail}
            </p>
          </div>
        )}

        {/* Features Locked */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">Limited Access</span>
          </div>
          <p className="text-yellow-200 text-sm mb-3">
            Until you verify your email, you cannot:
          </p>
          <ul className="text-yellow-200 text-sm space-y-1">
            <li>• Access earning opportunities</li>
            <li>• Complete tasks and challenges</li>
            <li>• Request payouts</li>
            <li>• View full dashboard features</li>
          </ul>
        </div>

        {/* Benefits After Verification */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-medium">After Verification</span>
          </div>
          <ul className="text-green-200 text-sm space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Access to Ads Cosmos, Social Cosmos, and Site Cosmos</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Real-time earnings tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Secure payout system</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Full community access</span>
            </li>
          </ul>
        </div>

        {/* Resend Message */}
        {resendMessage && (
          <div className={`rounded-lg p-3 mb-4 ${
            resendMessage.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20' 
              : 'bg-red-500/10 border border-red-500/20'
          }`}>
            <div className="flex items-center gap-2">
              {resendMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm ${
                resendMessage.type === 'success' ? 'text-green-300' : 'text-red-300'
              }`}>
                {resendMessage.text}
              </span>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-slate-300 text-sm mb-2">
            Check your email inbox for the verification link.
          </p>
          <p className="text-slate-400 text-xs">
            Didn't receive the email? Check your spam folder or click resend below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
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
          
          {onClose && (
            <button
              onClick={onClose}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-6 rounded-lg transition-all duration-200"
            >
              Continue with Limited Access
            </button>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-4 text-center">
          <p className="text-slate-500 text-xs">
            Verification links expire after 24 hours and can only be used once for security.
          </p>
        </div>
      </div>
    </div>
  );
};