
import React, { useState, useEffect } from 'react';
import { User, AuthState } from './types';
import LandingPage from './pages/LandingPage';
import DealsPage from './pages/DealsPage';
import DealDetailPage from './pages/DealDetailPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

// Simple Hash-based Router implementation
type Page = 'landing' | 'deals' | 'deal-detail' | 'dashboard' | 'login';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
  });

  // Check persistent login
  useEffect(() => {
    const savedUser = localStorage.getItem('benefitup_user');
    const savedToken = localStorage.getItem('benefitup_token');
    if (savedUser && savedToken) {
      setAuth({ user: JSON.parse(savedUser), token: savedToken, isLoading: false });
    }
  }, []);

  const navigate = (page: Page, params?: { id?: string }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (params?.id) setActiveDealId(params.id);
    setCurrentPage(page);
  };

  const handleLogin = (user: User, token: string) => {
    setAuth({ user, token, isLoading: false });
    localStorage.setItem('benefitup_user', JSON.stringify(user));
    localStorage.setItem('benefitup_token', token);
    navigate('deals');
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null, isLoading: false });
    localStorage.removeItem('benefitup_user');
    localStorage.removeItem('benefitup_token');
    navigate('landing');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-blue-500/30">
      <Navbar 
        user={auth.user} 
        onNavigate={navigate} 
        onLogout={handleLogout} 
        currentPage={currentPage}
      />
      
      <main className="relative pt-16">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <LandingPage onExplore={() => navigate('deals')} />
            </motion.div>
          )}

          {currentPage === 'deals' && (
            <motion.div
              key="deals"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <DealsPage 
                onViewDeal={(id) => navigate('deal-detail', { id })} 
                user={auth.user}
                onLoginRequired={() => navigate('login')}
              />
            </motion.div>
          )}

          {currentPage === 'deal-detail' && activeDealId && (
            <motion.div
              key={`detail-${activeDealId}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <DealDetailPage 
                dealId={activeDealId} 
                user={auth.user} 
                onBack={() => navigate('deals')}
                onClaimed={() => navigate('dashboard')}
                onLoginRequired={() => navigate('login')}
              />
            </motion.div>
          )}

          {currentPage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <DashboardPage user={auth.user} onExplore={() => navigate('deals')} />
            </motion.div>
          )}

          {currentPage === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <LoginPage onLogin={handleLogin} onBack={() => navigate('landing')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 px-6 border-t border-gray-800/50 text-center text-gray-500 text-sm">
        <p>© 2024 BenefitUp. Exclusive for founders. Built with code and passion.</p>
      </footer>
    </div>
  );
};

export default App;
