
import React, { useState, useEffect } from 'react';
import { User, Claim } from '../types';
import { claimService } from '../services/mockBackend';
import { motion } from 'framer-motion';

interface DashboardPageProps {
  user: User | null;
  onExplore: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onExplore }) => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      claimService.getUserClaims(user.id).then(data => {
        setClaims(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-[300px_1fr] gap-12">
        {/* Profile Sidebar */}
        <aside className="space-y-8">
          <div className="p-8 rounded-3xl bg-gray-900 border border-white/5 text-center">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 mx-auto rounded-full bg-blue-500/20 p-1 ring-2 ring-blue-500/20 mb-6" 
            />
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
              user.isVerified ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {user.isVerified ? '✓ Verified Founder' : 'Unverified Account'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20">
            <h3 className="font-bold text-blue-400 mb-2">Startup Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Savings</span>
                <span className="font-bold">$0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Claims Active</span>
                <span className="font-bold">{claims.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Claims Content */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Your Claimed Benefits</h2>
            <button 
              onClick={onExplore}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold transition-all"
            >
              Discover More
            </button>
          </div>

          {loading ? (
             <div className="space-y-4">
               {[1,2,3].map(i => <div key={i} className="h-24 w-full bg-gray-900/50 animate-pulse rounded-2xl"></div>)}
             </div>
          ) : claims.length > 0 ? (
            <div className="space-y-4">
              {claims.map((claim) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={claim.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gray-900 border border-white/5 hover:border-white/10 transition-all gap-4"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-lg bg-white/10 p-2 overflow-hidden shrink-0">
                      <img src={claim.logo} alt={claim.partnerName} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{claim.dealTitle}</h4>
                      <p className="text-gray-500 text-sm">Claimed on {new Date(claim.claimedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                      claim.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                      claim.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {claim.status}
                    </span>
                    <button className="text-blue-500 hover:text-blue-400 font-semibold text-sm">
                      View Access Key
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-white/10">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-2">No benefits claimed yet</h3>
              <p className="text-gray-500 mb-8">Start exploring deals to unlock thousands in SaaS savings.</p>
              <button 
                onClick={onExplore}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
              >
                Find My First Deal
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
