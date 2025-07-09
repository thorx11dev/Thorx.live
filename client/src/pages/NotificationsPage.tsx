import React from 'react';
import { Bell, Settings, Shield, MessageCircle } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Notifications
            </h1>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive email updates about your account
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Enable
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get notified about important updates
                  </p>
                </div>
                <button className="bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400 dark:hover:bg-slate-500 transition-colors">
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;