import React, { useState } from 'react';
import { Mail, Send, CheckCircle, XCircle, Clock } from 'lucide-react';

const EmailTestPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSendTest = async () => {
    if (!email) return;

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/debug/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(`Test email sent successfully! Delivery time: ${data.deliveryTime}`);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send test email');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Email Service Test</h1>
          <p className="text-slate-400">Test the professional email branding with Thorx logo and sender name</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Test Configuration
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Test Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSendTest}
              disabled={!email || status === 'sending'}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  Sending Test Email...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Test Email
                </>
              )}
            </button>

            {message && (
              <div className={`p-3 rounded-md flex items-center gap-2 ${
                status === 'success' ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm">{message}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <span><strong>Sender Name:</strong> "Thorx Platform" instead of email address</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <span><strong>Professional Logo:</strong> Thorx SVG logo in email header</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <span><strong>Cosmic Branding:</strong> Dark theme with cosmic design elements</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <span><strong>Benefits Section:</strong> Highlighted earning opportunities</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <span><strong>Fast Delivery:</strong> Optimized for under 10 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTestPage;