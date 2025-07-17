import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, AlertCircle, Clock, Mail } from 'lucide-react';
import EmailTroubleshootingGuide from '@/components/EmailTroubleshootingGuide';

export default function EmailVerificationPage() {
  const [location] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const verified = urlParams.get('verified');
    
    if (success && verified) {
      setStatus('success');
      setMessage('Your email has been verified successfully! You can now access all Thorx features.');
    } else if (error) {
      const errorType = error;
      setStatus('error');
      
      switch (errorType) {
        case 'invalid-token':
          setMessage('The verification link is invalid or has expired. Please register again to receive a new verification email.');
          break;
        case 'user-not-found':
          setMessage('User account not found. Please register again.');
          break;
        case 'server-error':
          setMessage('A server error occurred. Please try again later.');
          break;
        default:
          setMessage('An error occurred during verification. Please try again.');
      }
    }
  }, [location]);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Clock className="w-16 h-16 text-blue-400 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-400" />;
      case 'error':
      case 'expired':
        return <AlertCircle className="w-16 h-16 text-red-400" />;
      default:
        return <Mail className="w-16 h-16 text-blue-400" />;
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'error':
      case 'expired':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Email Verification</h1>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Verification Status */}
            <div className="space-y-6">
              <div className="text-center space-y-4">
                {getStatusIcon()}
                <div className="space-y-2">
                  <h2 className={`text-2xl font-bold ${getStatusColor()}`}>
                    {status === 'loading' && 'Verifying...'}
                    {status === 'success' && 'Email Verified!'}
                    {status === 'error' && 'Verification Failed'}
                    {status === 'expired' && 'Link Expired'}
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {message}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {status === 'success' && (
                  <button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Go to Dashboard
                  </button>
                )}
                
                {(status === 'error' || status === 'expired') && (
                  <button 
                    onClick={() => window.location.href = '/register'}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Register Again
                  </button>
                )}
                
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
            
            {/* Troubleshooting Guide */}
            <div>
              <EmailTroubleshootingGuide />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}