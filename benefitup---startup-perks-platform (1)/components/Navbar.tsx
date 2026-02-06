
import React from 'react';
import { User } from '../types';
import { motion } from 'framer-motion';

interface NavbarProps {
  user: User | null;
  currentPage: string;
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentPage, onNavigate, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 px-6 flex items-center justify-between border-b border-white/5">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onNavigate('landing')}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
          B
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:block">BenefitUp</span>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => onNavigate('deals')}
          className={`text-sm font-medium hover:text-blue-400 transition-colors ${currentPage === 'deals' ? 'text-blue-400' : 'text-gray-400'}`}
        >
          Explore Deals
        </button>
        
        {user ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`text-sm font-medium hover:text-blue-400 transition-colors ${currentPage === 'dashboard' ? 'text-blue-400' : 'text-gray-400'}`}
            >
              Dashboard
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-gray-800" />
              <button 
                onClick={onLogout}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
