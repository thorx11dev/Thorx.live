import React from 'react';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';

const SecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Security & Privacy
            </h1>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Two-Factor Authentication
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Add an extra layer of security to your account
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Enable 2FA
              </button>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Key className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Change Password
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Update your account password regularly
              </p>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                Update Password
              </button>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Privacy Settings
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Control how your data is used and shared
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Manage Privacy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;