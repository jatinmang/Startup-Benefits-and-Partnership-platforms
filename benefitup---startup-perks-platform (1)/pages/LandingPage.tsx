
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Hero3D from '../components/Hero3D';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  // Use Variants type to ensure correct typing for framer-motion animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Explicitly typing as Variants fixes the error where 'spring' is inferred as string instead of AnimationGeneratorType
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        damping: 20 
      } 
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Hero3D />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-10 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Exclusive for Early-Stage Teams
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1]">
            Supercharge your <br />
            <span className="gradient-text italic">growth engine.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-400 text-lg md:text-2xl leading-relaxed font-medium">
            Stop overpaying for your tech stack. Access $150k+ in exclusive SaaS credits, cloud perks, and marketing tools.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <button 
              onClick={onExplore}
              className="group w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-blue-600/30 hover:-translate-y-1 flex items-center gap-3"
            >
              Explore All Deals
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-gray-900/50 backdrop-blur-md border border-white/10 hover:bg-gray-800 text-white rounded-2xl font-bold text-xl transition-all">
              View Partners
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Icons Background Decor */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />

        {/* Features Section */}
        <div className="mt-48 grid md:grid-cols-3 gap-10 relative z-10">
          {[
            { title: 'Verified Only', desc: 'Secure high-value contracts that only verified founders can access.', icon: '🔐' },
            { title: 'Instant Unlock', desc: 'Get your coupon codes and tracking links immediately after claiming.', icon: '⚡' },
            { title: 'Community Led', desc: 'Benefits curated by founders, for founders. No junk deals.', icon: '👥' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, backgroundColor: 'rgba(17, 24, 39, 0.8)' }}
              className="p-10 rounded-3xl bg-gray-900/50 border border-white/5 backdrop-blur-sm transition-all group"
            >
              <div className="text-5xl mb-6 group-hover:scale-125 transition-transform inline-block drop-shadow-xl">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
