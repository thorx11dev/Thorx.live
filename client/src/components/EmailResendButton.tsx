import React, { useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface EmailResendButtonProps {
  userEmail: string;
  onEmailSent?: () => void;
}

const EmailResendButton: React.FC<EmailResendButtonProps> = ({ userEmail, onEmailSent }) => {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResend = async () => {
    setIsResending(true);
    setResendStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('thorx_auth_token')}`
        },
        body: JSON.stringify({ email: userEmail })
      });

      if (response.ok) {
        setResendStatus('success');
        if (onEmailSent) onEmailSent();
      } else {
        const error = await response.json();
        setResendStatus('error');
        setErrorMessage(error.error || 'Failed to resend email');
      }
    } catch (error) {
      setResendStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const getStatusIcon = () => {
    switch (resendStatus) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />;
    }
  };

  const getStatusMessage = () => {
    switch (resendStatus) {
      case 'success':
        return 'Email sent successfully!';
      case 'error':
        return errorMessage || 'Failed to send email';
      default:
        return isResending ? 'Sending...' : 'Resend Verification Email';
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleResend}
        disabled={isResending}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
          resendStatus === 'success' 
            ? 'bg-green-600 text-white cursor-default' 
            : resendStatus === 'error'
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600'
        }`}
      >
        {getStatusIcon()}
        {getStatusMessage()}
      </button>

      {resendStatus === 'error' && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {resendStatus === 'success' && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-green-300 text-sm">
              Verification email sent to {userEmail}. Please check your inbox and spam folder.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailResendButton;