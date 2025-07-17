import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';

export const useEmailVerificationStatus = () => {
  const { user } = useAuth();
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    if (!user || user.isEmailVerified) return;

    const checkVerificationStatus = async () => {
      try {
        const response = await apiRequest('/api/auth/verification-status', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isEmailVerified && !user.isEmailVerified) {
            // Page will reload when verification is detected
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('Failed to check verification status:', error);
      }
    };

    // Start polling every 5 seconds
    const interval = setInterval(checkVerificationStatus, 5000);
    setIsPolling(true);

    return () => {
      clearInterval(interval);
      setIsPolling(false);
    };
  }, [user]);

  return { isPolling };
};

export default useEmailVerificationStatus;