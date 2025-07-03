import { Router, Route, Switch } from 'wouter';
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
            <Switch>
              <Route path="/" component={LandingPage} />
              <Route path="/auth" component={AuthPage} />
              <Route path="/login" component={AuthPage} />
              <Route path="/register" component={AuthPage} />
              <Route path="/performance" component={PerformancePage} />
              <Route path="/dashboard">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              </Route>
              <Route path="/earnings">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <EarningsInterface />
                  </>
                </ProtectedRoute>
              </Route>
              <Route path="/work">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <WorkPortal />
                  </>
                </ProtectedRoute>
              </Route>
              <Route path="/payout">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <PayoutSystem />
                  </>
                </ProtectedRoute>
              </Route>
              <Route path="/settings">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <SettingsHub />
                  </>
                </ProtectedRoute>
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;