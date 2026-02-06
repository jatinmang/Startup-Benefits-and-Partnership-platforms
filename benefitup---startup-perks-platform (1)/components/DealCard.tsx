
import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Deal, User } from '../types';

interface DealCardProps {
  deal: Deal;
  user: User | null;
  onView: (id: string) => void;
  onLoginRequired: () => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, user, onView, onLoginRequired }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isLockedForUser = deal.accessLevel === 'locked' && (!user || !user.isVerified);

  return (
    <motion.div
      layout
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col p-6 rounded-2xl bg-gray-900/40 border border-white/5 hover:border-blue-500/40 hover:bg-gray-900/60 transition-all cursor-pointer shadow-xl overflow-hidden"
      onClick={() => onView(deal.id)}
    >
      {/* Background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 p-1">
            <img src={deal.logo} alt={deal.partnerName} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
              deal.accessLevel === 'public' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
            }`}>
              {deal.accessLevel}
            </span>
            {deal.accessLevel === 'locked' && user && !user.isVerified && (
              <span className="text-[9px] text-amber-500 font-bold uppercase">Verify Required</span>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors leading-tight">
          {deal.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-grow min-h-[40px]">
          {deal.shortDescription}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">
            {deal.benefit}
          </span>
          <button 
            className="px-4 py-2 bg-white/5 hover:bg-blue-600 rounded-lg text-sm font-bold transition-all transform active:scale-95"
          >
            Details
          </button>
        </div>
      </div>

      {/* Access Overlay for Logged out users */}
      {deal.accessLevel === 'locked' && !user && (
        <div className="absolute inset-0 z-20 bg-gray-950/60 backdrop-blur-[4px] rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onLoginRequired(); }}
            className="px-6 py-3 bg-white text-black font-bold rounded-xl shadow-2xl transform scale-90 group-hover:scale-100 transition-transform"
          >
            Login to Unlock
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DealCard;
