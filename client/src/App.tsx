import { Router, Route, Switch } from 'wouter';
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
import FeaturesPage from './pages/FeaturesPage';
import UpdatesPage from './pages/UpdatesPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotificationsPage from './pages/NotificationsPage';
import SecurityPage from './pages/SecurityPage';
import AppearancePage from './pages/AppearancePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-900 dark:bg-slate-900 font-cosmic transition-all duration-300">
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
              <Route path="/notifications">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <NotificationsPage />
                  </>
                </ProtectedRoute>
              </Route>
              <Route path="/security">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <SecurityPage />
                  </>
                </ProtectedRoute>
              </Route>
              <Route path="/appearance">
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <AppearancePage />
                  </>
                </ProtectedRoute>
              </Route>
              <Route path="/features" component={FeaturesPage} />
              <Route path="/updates" component={UpdatesPage} />
              <Route path="/help" component={HelpCenterPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/blog" component={BlogPage} />
              <Route path="/blog/:id" component={BlogPostPage} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;