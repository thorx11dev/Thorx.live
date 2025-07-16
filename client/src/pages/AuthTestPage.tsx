import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthTestPage = () => {
  const { login, register } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testLogin = async () => {
    setIsLoading(true);
    addResult('Testing login...');
    
    const success = await login('test@example.com', 'wrongpassword');
    
    if (success) {
      addResult('✅ Login successful');
    } else {
      addResult('❌ Login failed (expected for wrong password)');
    }
    
    setIsLoading(false);
  };

  const testRegistration = async () => {
    setIsLoading(true);
    addResult('Testing registration...');
    
    const timestamp = Date.now();
    const success = await register({
      username: `testuser${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User'
    });
    
    if (success) {
      addResult('✅ Registration successful');
    } else {
      addResult('❌ Registration failed');
    }
    
    setIsLoading(false);
  };

  const testDuplicateRegistration = async () => {
    setIsLoading(true);
    addResult('Testing duplicate registration (should fail)...');
    
    const success = await register({
      username: 'duplicateuser',
      email: 'duplicate@example.com',
      password: 'TestPassword123!',
      firstName: 'Duplicate',
      lastName: 'User'
    });
    
    if (success) {
      addResult('⚠️ Duplicate registration succeeded (unexpected)');
    } else {
      addResult('✅ Duplicate registration failed (expected)');
    }
    
    setIsLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
            <div className="space-y-4">
              <button
                onClick={testLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg"
              >
                Test Login (Wrong Password)
              </button>
              
              <button
                onClick={testRegistration}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg"
              >
                Test Registration (New User)
              </button>
              
              <button
                onClick={testDuplicateRegistration}
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 px-4 py-2 rounded-lg"
              >
                Test Duplicate Registration
              </button>
              
              <button
                onClick={clearResults}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Clear Results
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="bg-slate-800 rounded-lg p-4 h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-400">No test results yet...</p>
              ) : (
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div key={index} className="text-sm font-mono">
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTestPage;