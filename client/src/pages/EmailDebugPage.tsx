import React, { useState } from 'react';
import { Mail, Send, RefreshCw, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { ThorxLogo } from '../components/ThorxLogo';

interface EmailTestResult {
  success: boolean;
  message: string;
  deliveryTime: string;
  timestamp: string;
  error?: string;
}

const EmailDebugPage = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('123');
  const [testResults, setTestResults] = useState<EmailTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (result: EmailTestResult) => {
    setTestResults(prev => [result, ...prev]);
  };

  const testEmail = async (endpoint: string, type: string) => {
    if (!email || !userId) {
      alert('Please enter both email and user ID');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/email${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userId: parseInt(userId) }),
      });

      const data = await response.json();
      
      addResult({
        success: data.success,
        message: `${type}: ${data.message}`,
        deliveryTime: data.deliveryTime,
        timestamp: data.timestamp,
        error: data.error
      });
    } catch (error) {
      addResult({
        success: false,
        message: `${type}: Network error`,
        deliveryTime: '0ms',
        timestamp: new Date().toISOString(),
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ThorxLogo size="lg" className="text-slate-200" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Email Debug Center</h1>
          <p className="text-slate-400">Test and debug email delivery system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Test Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  User ID
                </label>
                <input
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user ID"
                />
              </div>
              
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => testEmail('/debug/send-test-email', 'Test Email')}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Test Email
                </button>
                
                <button
                  onClick={() => testEmail('/debug/resend-verification', 'Resend Verification')}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend Verification Email
                </button>
                
                <button
                  onClick={clearResults}
                  className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Clear Results
                </button>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Test Results
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="bg-slate-700 rounded-lg p-4 flex items-center gap-3">
                  <div className="animate-spin w-5 h-5 border-2 border-slate-400 border-t-white rounded-full"></div>
                  <span className="text-slate-300">Processing...</span>
                </div>
              )}
              
              {testResults.length === 0 && !isLoading ? (
                <div className="text-center py-8 text-slate-400">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No test results yet. Run a test to see results here.</p>
                </div>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className={`rounded-lg p-4 border ${
                    result.success 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-red-900/20 border-red-500/30'
                  }`}>
                    <div className="flex items-start gap-3">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${
                          result.success ? 'text-green-300' : 'text-red-300'
                        }`}>
                          {result.message}
                        </p>
                        <div className="text-sm text-slate-400 mt-1">
                          <p>Delivery Time: {result.deliveryTime}</p>
                          <p>Timestamp: {new Date(result.timestamp).toLocaleString()}</p>
                          {result.error && (
                            <p className="text-red-400 mt-1">Error: {result.error}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Email Troubleshooting Guide */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Email Troubleshooting Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-slate-300 mb-2">Common Issues:</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Check spam/junk folder</li>
                <li>• Verify email address is correct</li>
                <li>• Email delivery can take 1-5 minutes</li>
                <li>• Some providers block automated emails</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-300 mb-2">Recommended Actions:</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Use a different email provider</li>
                <li>• Add support@thorx.live to contacts</li>
                <li>• Check email filters and rules</li>
                <li>• Contact support if issues persist</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDebugPage;