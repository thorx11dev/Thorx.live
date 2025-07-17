import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

interface RestrictedNavigationProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
}

export const RestrictedNavigation: React.FC<RestrictedNavigationProps> = ({ 
  children, 
  to, 
  className = '', 
  onClick 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user?.isEmailVerified) {
      // Show tooltip briefly
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    
    // If email is verified, allow navigation
    onClick?.();
    if (to && to !== '#') {
      navigate(to);
    }
  };

  const isRestricted = !user?.isEmailVerified;

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={`
          ${className}
          ${isRestricted ? 'cursor-not-allowed border-b-2 border-red-500' : 'cursor-pointer'}
          transition-all duration-200
        `}
        onMouseEnter={() => isRestricted && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
        {isRestricted && (
          <Lock className="w-3 h-3 text-red-400 ml-1 inline-block" />
        )}
      </div>
      
      {/* Tooltip */}
      {showTooltip && isRestricted && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-red-600 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Page locked: Please verify your email to access.
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-600"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestrictedNavigation;