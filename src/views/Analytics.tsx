import React from 'react';
import { motion } from 'framer-motion';
import { AnalyticsDashboard } from '../components/Analytics/AnalyticsDashboard';

export const Analytics: React.FC = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-white/70">
          Track user engagement, conversions, and A/B test performance.
        </p>
      </div>

      <AnalyticsDashboard />
    </motion.div>
  );
};