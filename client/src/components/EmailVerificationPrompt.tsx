import React, { useState } from 'react';
import { Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';

interface EmailVerificationPromptProps {
  onResendClick?: () => void;
}

export const EmailVerificationPrompt: React.FC<EmailVerificationPromptProps> = ({ onResendClick }) => {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  const handleResendEmail = async () => {
    if (!user?.email) return;
    
    setIsResending(true);
    setResendStatus('idle');
    
    try {
      const response = await apiRequest('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
      
      if (response.ok) {
        setResendStatus('success');
        onResendClick?.();
      } else {
        setResendStatus('error');
      }
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      setResendStatus('error');
    } finally {
      setIsResending(false);
      
      // Clear status after 5 seconds
      setTimeout(() => setResendStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Mail className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-yellow-200 mb-1">
                Email Verification Required
              </h3>
              <p className="text-sm text-yellow-300">
                Please verify your email address to unlock other pages of Thorx!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Resend Email
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Status Messages */}
          {resendStatus === 'success' && (
            <div className="mt-3 flex items-center gap-2 text-green-300">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">A new verification email has been sent to your address.</span>
            </div>
          )}
          
          {resendStatus === 'error' && (
            <div className="mt-3 flex items-center gap-2 text-red-300">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Failed to resend email. Please try again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPrompt;