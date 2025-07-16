import { Router, Route, Switch } from 'wouter';
import AuthProvider from './components/AuthProvider';
import { TeamAuthProvider } from './components/TeamAuthProvider';
import ThemeProvider from './components/ThemeProvider';
import ProtectedRoute from './components/ProtectedRoute';
import EmailVerifiedRoute from './components/EmailVerifiedRoute';
import TeamProtectedRoute from './components/TeamProtectedRoute';
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
import EmailVerificationPage from './pages/EmailVerificationPage';
import EmailTestPage from './pages/EmailTestPage';
import Navbar from './components/Navbar';
import TeamLoginPage from './pages/TeamLoginPage';
import TeamDashboard from './pages/TeamDashboard';
import UserCarePage from './pages/UserCarePage';
import InboxPage from './pages/InboxPage';
import LinkagePage from './pages/LinkagePage';
import TeamHubPage from './pages/TeamHubPage';
import DigitalMarketPage from './pages/DigitalMarketPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TeamAuthProvider>
          <Router>
            <div className="min-h-screen bg-slate-900 dark:bg-slate-900 font-cosmic transition-all duration-300">
              <Switch>
                <Route path="/" component={LandingPage} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/login" component={AuthPage} />
                <Route path="/register" component={AuthPage} />
                <Route path="/verify-email" component={EmailVerificationPage} />
                <Route path="/email-test" component={EmailTestPage} />
                <Route path="/performance" component={PerformancePage} />
                
                {/* Team Routes */}
                <Route path="/team/login" component={TeamLoginPage} />
                <Route path="/team/dashboard">
                  <TeamProtectedRoute>
                    <TeamDashboard />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/users">
                  <TeamProtectedRoute>
                    <UserCarePage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/inbox">
                  <TeamProtectedRoute>
                    <InboxPage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/chat">
                  <TeamProtectedRoute>
                    <LinkagePage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/hub">
                  <TeamProtectedRoute>
                    <TeamHubPage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/market">
                  <TeamProtectedRoute>
                    <DigitalMarketPage />
                  </TeamProtectedRoute>
                </Route>
                
                {/* Regular User Routes */}
                <Route path="/dashboard">
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Dashboard />
                    </>
                  </ProtectedRoute>
                </Route>
                <Route path="/earnings">
                  <EmailVerifiedRoute>
                    <>
                      <Navbar />
                      <EarningsInterface />
                    </>
                  </EmailVerifiedRoute>
                </Route>
                <Route path="/work">
                  <EmailVerifiedRoute>
                    <>
                      <Navbar />
                      <WorkPortal />
                    </>
                  </EmailVerifiedRoute>
                </Route>
                <Route path="/payout">
                  <EmailVerifiedRoute>
                    <>
                      <Navbar />
                      <PayoutSystem />
                    </>
                  </EmailVerifiedRoute>
                </Route>
                <Route path="/settings">
                  <EmailVerifiedRoute>
                    <>
                      <Navbar />
                      <SettingsHub />
                    </>
                  </EmailVerifiedRoute>
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
        </TeamAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;