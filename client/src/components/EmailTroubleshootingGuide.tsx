import React, { useState } from 'react';
import EmailVerificationTester from './EmailVerificationTester';
import { 
  AlertCircle, 
  CheckCircle, 
  Mail, 
  Shield, 
  Clock, 
  RefreshCw, 
  HelpCircle,
  ExternalLink,
  Smartphone,
  Filter
} from 'lucide-react';

const EmailTroubleshootingGuide: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const troubleshootingSteps = [
    {
      id: 'check-spam',
      title: 'Check Spam/Junk Folder',
      icon: <Filter className="w-5 h-5" />,
      priority: 'high',
      description: 'Automated emails often end up in spam folders',
      steps: [
        'Open your email client (Gmail, Outlook, etc.)',
        'Navigate to "Spam" or "Junk" folder',
        'Look for emails from "Thorx Platform" or "support@thorx.live"',
        'If found, mark as "Not Spam" and move to inbox',
        'Add support@thorx.live to your contacts for future emails'
      ]
    },
    {
      id: 'wait-delivery',
      title: 'Email Delivery Time',
      icon: <Clock className="w-5 h-5" />,
      priority: 'medium',
      description: 'Email delivery can take several minutes',
      steps: [
        'Wait 5-10 minutes for email delivery',
        'Check both inbox and spam folder periodically',
        'Some email providers have longer delivery times',
        'Corporate email systems may have additional delays',
        'Try refreshing your email client'
      ]
    },
    {
      id: 'email-filters',
      title: 'Check Email Filters',
      icon: <Shield className="w-5 h-5" />,
      priority: 'medium',
      description: 'Email filters might be blocking verification emails',
      steps: [
        'Check your email client\'s filter/rules settings',
        'Look for filters that might block automated emails',
        'Temporarily disable strict spam filters',
        'Check if "@thorx.live" domain is blocked',
        'Whitelist the domain if necessary'
      ]
    },
    {
      id: 'mobile-sync',
      title: 'Mobile App Sync',
      icon: <Smartphone className="w-5 h-5" />,
      priority: 'low',
      description: 'Mobile email apps may not sync immediately',
      steps: [
        'Pull down to refresh your mobile email app',
        'Check if mobile app is syncing properly',
        'Try accessing email through web browser',
        'Ensure mobile data/WiFi connection is stable',
        'Check if push notifications are enabled'
      ]
    },
    {
      id: 'alternative-email',
      title: 'Try Different Email Provider',
      icon: <Mail className="w-5 h-5" />,
      priority: 'medium',
      description: 'Some email providers block automated emails',
      steps: [
        'Try using a different email address (Gmail, Outlook)',
        'Avoid using temporary/disposable email services',
        'Corporate emails may have stricter filters',
        'Educational emails (.edu) sometimes have restrictions',
        'Personal email addresses usually work better'
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-500/30';
      default: return 'text-slate-400 bg-slate-900/20 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Email Delivery Troubleshooting
        </h3>
        
        <div className="space-y-3">
          {troubleshootingSteps.map((step, index) => (
            <div key={step.id} className="border border-slate-700 rounded-lg">
              <button
                onClick={() => toggleSection(step.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getPriorityColor(step.priority)}`}>
                    {step.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-slate-200">{step.title}</h4>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(step.priority)}`}>
                    {step.priority}
                  </span>
                  <RefreshCw className={`w-4 h-4 text-slate-400 transition-transform ${
                    expandedSection === step.id ? 'rotate-180' : ''
                  }`} />
                </div>
              </button>
              
              {expandedSection === step.id && (
                <div className="px-4 pb-4 border-t border-slate-700">
                  <div className="pt-3">
                    <ol className="space-y-2">
                      {step.steps.map((stepItem, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2">
                          <span className="text-slate-400 text-sm mt-0.5 min-w-[20px]">
                            {stepIndex + 1}.
                          </span>
                          <span className="text-slate-300 text-sm">{stepItem}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="font-medium text-slate-200 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="https://support.google.com/mail/answer/1366858"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-200 hover:text-white"
          >
            <ExternalLink className="w-4 h-4 text-slate-400 hover:text-slate-200" />
            <span className="text-sm">Gmail Spam Settings</span>
          </a>
          <a
            href="https://support.microsoft.com/en-us/office/add-names-to-the-safe-senders-list-E18E2B20-3A7E-4E23-BB3C-9D4A25D7C5D4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-200 hover:text-white"
          >
            <ExternalLink className="w-4 h-4 text-slate-400 hover:text-slate-200" />
            <span className="text-sm">Outlook Safe Senders</span>
          </a>
        </div>
      </div>

      {/* Email Delivery Tester */}
      <div className="mb-6">
        <EmailVerificationTester />
      </div>

      {/* Support Contact */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 font-medium">Still Having Issues?</span>
        </div>
        <p className="text-blue-200 text-sm mt-2">
          If you've tried all the steps above and still haven't received your verification email, 
          please contact our support team at{' '}
          <a href="mailto:support@thorx.live" className="underline hover:text-blue-100">
            support@thorx.live
          </a>
          {' '}with your registered email address.
        </p>
      </div>
    </div>
  );
};

export default EmailTroubleshootingGuide;