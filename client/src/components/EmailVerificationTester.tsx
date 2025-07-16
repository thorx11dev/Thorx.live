import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';

interface EmailTestResult {
  success: boolean;
  message: string;
  timestamp: string;
  error?: string;
}

const EmailVerificationTester: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<EmailTestResult | null>(null);

  const testEmailDelivery = async () => {
    if (!email) {
      setTestResult({
        success: false,
        message: 'Please enter an email address',
        timestamp: new Date().toISOString()
      });
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/debug/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      setTestResult({
        success: data.success,
        message: data.message,
        timestamp: new Date().toISOString(),
        error: data.error
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Network error. Please try again.',
        timestamp: new Date().toISOString(),
        error: 'Network error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <Mail className="w-5 h-5" />
        Test Email Delivery
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Your Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>
        
        <button
          onClick={testEmailDelivery}
          disabled={isLoading || !email}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Test Email
            </>
          )}
        </button>
        
        {testResult && (
          <div className={`rounded-lg p-4 border ${
            testResult.success 
              ? 'bg-green-900/20 border-green-500/30' 
              : 'bg-red-900/20 border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${
                  testResult.success ? 'text-green-300' : 'text-red-300'
                }`}>
                  {testResult.message}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {new Date(testResult.timestamp).toLocaleString()}
                </p>
                {testResult.error && (
                  <p className="text-red-400 text-sm mt-1">
                    Error: {testResult.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-slate-400">
        <p>
          This will send a test verification email to your address. 
          Check your inbox and spam folder within 5 minutes.
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationTester;