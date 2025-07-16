import React from 'react';
import { useLocation, Redirect } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { EmailVerificationPrompt } from './EmailVerificationPrompt';

interface EmailVerifiedRouteProps {
  children: React.ReactNode;
}

const EmailVerifiedRoute: React.FC<EmailVerifiedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  
  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return <Redirect to="/auth" />;
  }
  
  // If authenticated but email not verified, show verification prompt
  if (user && !user.isEmailVerified) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <EmailVerificationPrompt
          isVisible={true}
          userEmail={user.email}
          onClose={() => {}}
        />
      </div>
    );
  }
  
  return <>{children}</>;
};

export default EmailVerifiedRoute;