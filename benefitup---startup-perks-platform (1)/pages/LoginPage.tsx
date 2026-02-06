
import React, { useState } from 'react';
import { authService } from '../services/mockBackend';
import { User } from '../types';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: (user: User, token: string) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { user, token } = await authService.login(email);
      onLogin(user, token);
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 rounded-3xl bg-gray-900 border border-white/10 shadow-2xl space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-4">B</div>
          <h2 className="text-3xl font-black">Welcome Back</h2>
          <p className="text-gray-500">Sign in to access your startup benefits.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 pl-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="founder@yourstartup.com"
              className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
              loading 
                ? 'bg-gray-800 text-gray-500' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
            }`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-900 px-2 text-gray-500">Demo Mode</span></div>
        </div>

        <p className="text-center text-gray-600 text-xs">
          New users will be automatically registered. <br />
          We prioritize your privacy and data security.
        </p>

        <button 
          onClick={onBack}
          className="w-full text-center text-gray-500 hover:text-white text-sm font-medium transition-colors"
        >
          Back to Landing
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
