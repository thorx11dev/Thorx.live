import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { ThorxLogo } from '../components/ThorxLogo';
import { apiRequest } from '../lib/queryClient';

const EmailTestPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestEmail = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: 'testpassword123',
          username: `test${Date.now()}`,
          firstName: 'Test',
          lastName: 'User'
        })
      });
      
      setResult({
        success: true,
        message: 'Registration successful! Check your email for verification link.'
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Registration failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <ThorxLogo size="lg" className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white">
            Email Verification Test
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Test the email verification system with your email address
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            onClick={handleTestEmail}
            disabled={!email || isLoading}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Test Email Verification
              </>
            )}
          </button>

          {result && (
            <div className={`p-4 rounded-md ${
              result.success 
                ? 'bg-green-900/20 border border-green-500/20 text-green-300' 
                : 'bg-red-900/20 border border-red-500/20 text-red-300'
            }`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <span className="text-sm">{result.message}</span>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <a
            href="/"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailTestPage;