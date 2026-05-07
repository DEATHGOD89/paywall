import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Star, Zap, Crown } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import toast from 'react-hot-toast';

export const PaywallModal: React.FC = () => {
  const { 
    showPaywall, 
    setShowPaywall, 
    paywallVariants, 
    currentPaywallVariant,
    recordPaywallConversion 
  } = useAppStore();

  const currentVariant = paywallVariants.find(v => v.id === currentPaywallVariant);

  if (!currentVariant) return null;

  const handleUpgrade = () => {
    recordPaywallConversion();
    toast.success('🎉 Welcome to Pro! All AI features unlocked!', {
      duration: 4000,
    });
  };

  const handleClose = () => {
    setShowPaywall(false);
  };

  return (
    <AnimatePresence>
      {showPaywall && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full relative mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>

            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {currentVariant.title}
              </h2>
              <p className="text-white/70 text-sm sm:text-base">
                {currentVariant.subtitle}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {currentVariant.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-1 rounded-full bg-emerald-500 flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/90 text-sm sm:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {currentVariant.price}
                </span>
                <div className="text-white/70">
                  <div className="line-through text-sm">$19.99</div>
                  <div className="text-xs">50% OFF</div>
                </div>
              </div>
              <p className="text-center text-white/60 text-xs sm:text-sm">
                Cancel anytime • 7-day free trial
              </p>
            </div>

            <motion.button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-5 h-5" />
              <span className="text-sm sm:text-base">{currentVariant.cta}</span>
            </motion.button>

            <div className="flex items-center justify-center mt-4 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-white/70 text-xs sm:text-sm ml-2">
                4.9/5 from 150+ users
              </span>
            </div>

            <div className="mt-6 p-3 sm:p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                  12 people upgraded in the last hour
                </span>
              </div>
              <p className="text-white/60 text-xs">
                Join professionals who save 10+ hours per week with AI
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};