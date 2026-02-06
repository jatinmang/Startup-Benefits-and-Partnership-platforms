
import React, { useState, useEffect } from 'react';
import { Deal, User } from '../types';
import { dealService, claimService } from '../services/mockBackend';
import { motion } from 'framer-motion';

interface DealDetailPageProps {
  dealId: string;
  user: User | null;
  onBack: () => void;
  onClaimed: () => void;
  onLoginRequired: () => void;
}

const DealDetailPage: React.FC<DealDetailPageProps> = ({ dealId, user, onBack, onClaimed, onLoginRequired }) => {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    dealService.getDealById(dealId).then(setDeal);
  }, [dealId]);

  if (!deal) return <div className="p-20 text-center animate-pulse">Loading Deal...</div>;

  const handleClaim = async () => {
    if (!user) {
      onLoginRequired();
      return;
    }

    if (deal.accessLevel === 'locked' && !user.isVerified) {
      setError('This deal is restricted to verified accounts. Please verify your company in your profile.');
      return;
    }

    setIsClaiming(true);
    try {
      await claimService.claimDeal(user.id, deal.id);
      onClaimed();
    } catch (err) {
      setError('Failed to claim deal. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span>←</span> Back to deals
      </button>

      <div className="grid md:grid-cols-[1fr_350px] gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/10 p-4 border border-white/5">
              <img src={deal.logo} alt={deal.partnerName} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold mb-2">{deal.title}</h1>
              <p className="text-xl text-blue-400 font-semibold">Partnered with {deal.partnerName}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3 border-b border-white/10 pb-2">About this Benefit</h3>
              <p className="text-gray-400 leading-relaxed">{deal.fullDescription}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 border-b border-white/10 pb-2">Eligibility Conditions</h3>
              <ul className="space-y-3">
                {deal.conditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-500 mt-1">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-24 p-8 rounded-3xl bg-gray-900 border border-white/10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Your Reward</span>
              <div className="text-3xl font-black text-white">{deal.benefit}</div>
            </div>

            <div className={`p-4 rounded-xl text-sm ${
              deal.accessLevel === 'public' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
            }`}>
              <div className="font-bold flex items-center gap-2 mb-1">
                {deal.accessLevel === 'public' ? '🔓 Public Deal' : '🔒 Verified Only'}
              </div>
              <p className="opacity-80">
                {deal.accessLevel === 'public' 
                  ? 'This deal is open to all BenefitUp users.' 
                  : 'Requires identity or company verification to access.'}
              </p>
            </div>

            <button 
              onClick={handleClaim}
              disabled={isClaiming}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                isClaiming 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
              }`}
            >
              {isClaiming ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Claiming...
                </>
              ) : 'Claim This Benefit'}
            </button>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center"
              >
                {error}
              </motion.div>
            )}

            {!user && (
              <p className="text-xs text-center text-gray-500">
                You need to be logged in to claim rewards.
              </p>
            )}
            
            {user && deal.accessLevel === 'locked' && !user.isVerified && (
              <div className="text-xs p-3 rounded-lg bg-blue-500/5 text-blue-400/80 italic text-center">
                Tip: Head to your dashboard to complete your verification!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailPage;
