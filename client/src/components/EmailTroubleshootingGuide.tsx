import React from 'react';
import { AlertCircle, CheckCircle, Clock, Mail, RefreshCw, Shield } from 'lucide-react';

export const EmailTroubleshootingGuide: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-secondary/50 border border-border rounded-lg">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Email Verification Guide</h2>
      </div>
      
      <div className="space-y-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm text-green-300">
            Email system is operational. Average delivery time: &lt;1 second
          </span>
        </div>
        
        {/* What to Expect */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            What to Expect
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground ml-6">
            <li>• Verification email arrives within 1-5 seconds</li>
            <li>• Email includes professional Thorx branding</li>
            <li>• Email may appear in your inbox or spam folder</li>
            <li>• Link expires after 24 hours for security</li>
          </ul>
        </div>
        
        {/* Troubleshooting Steps */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            If You Don't Receive the Email
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground ml-6">
            <div className="flex items-start gap-2">
              <span className="font-medium text-primary">1.</span>
              <span>Check your spam/junk folder for emails from "Thorx Platform"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-primary">2.</span>
              <span>Verify your email address was entered correctly</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-primary">3.</span>
              <span>Wait 2-3 minutes, then try registering again</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-primary">4.</span>
              <span>Try using a different email provider (Gmail, Yahoo, Outlook)</span>
            </div>
          </div>
        </div>
        
        {/* Security Note */}
        <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <div className="space-y-1">
            <span className="text-sm font-medium text-blue-300">Security Note</span>
            <p className="text-sm text-blue-200">
              Verification links expire after 24 hours. If your link expired, simply register again to receive a new verification email.
            </p>
          </div>
        </div>
        
        {/* Support Contact */}
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Still having issues? Contact our support team at{' '}
            <a 
              href="mailto:support@thorx.live" 
              className="text-primary hover:underline"
            >
              support@thorx.live
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTroubleshootingGuide;