
import React, { useState, useEffect } from 'react';
import { Deal, User } from '../types';
import { dealService } from '../services/mockBackend';
import { motion, AnimatePresence } from 'framer-motion';
import DealCard from '../components/DealCard';

interface DealsPageProps {
  user: User | null;
  onViewDeal: (id: string) => void;
  onLoginRequired: () => void;
}

const DealsPage: React.FC<DealsPageProps> = ({ user, onViewDeal, onLoginRequired }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'public' | 'locked'>('all');
  const [category, setCategory] = useState<string>('All');

  useEffect(() => {
    dealService.getDeals().then(data => {
      setDeals(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Cloud', 'Marketing', 'DevTools', 'Finance', 'Design'];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(search.toLowerCase()) || 
                          deal.partnerName.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = filter === 'all' || deal.accessLevel === filter;
    const matchesCategory = category === 'All' || deal.category === category;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-black tracking-tight">Perks Catalog</h2>
          <p className="text-gray-400 text-xl max-w-lg font-medium">
            Filtering through the noise to bring you the best startup deals in the industry.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
          <div className="relative w-full sm:w-80 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">🔍</span>
            <input 
              type="text" 
              placeholder="Search by product or partner..." 
              className="w-full bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="w-full sm:w-auto bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-bold appearance-none cursor-pointer"
            value={filter}
            onChange={(e: any) => setFilter(e.target.value)}
          >
            <option value="all">Any Status</option>
            <option value="public">Unlocked</option>
            <option value="locked">Verification Needed</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-8 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border ${
              category === cat 
                ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-600/20 translate-y-[-2px]' 
                : 'bg-gray-900/40 text-gray-400 border-white/5 hover:bg-gray-800 hover:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-72 bg-gray-900/30 animate-pulse rounded-3xl border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredDeals.map((deal) => (
              <DealCard 
                key={deal.id}
                deal={deal}
                user={user}
                onView={onViewDeal}
                onLoginRequired={onLoginRequired}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredDeals.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 bg-gray-900/20 rounded-[3rem] border-2 border-dashed border-white/5"
        >
          <div className="text-6xl mb-6">🏜️</div>
          <h3 className="text-2xl font-black mb-2">No matching deals</h3>
          <p className="text-gray-500 text-lg">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => {setSearch(''); setFilter('all'); setCategory('All');}} 
            className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Reset All Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DealsPage;
