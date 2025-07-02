import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthProvider from './components/AuthProvider';
import ThemeProvider from './components/ThemeProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import EarningsInterface from './pages/EarningsInterface';
import WorkPortal from './pages/WorkPortal';
import PayoutSystem from './pages/PayoutSystem';
import SettingsHub from './pages/SettingsHub';
import PerformancePage from './pages/PerformancePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-primary font-cosmic transition-all duration-300">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/earnings" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <EarningsInterface />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/work" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <WorkPortal />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/payout" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <PayoutSystem />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <SettingsHub />
                  </>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;