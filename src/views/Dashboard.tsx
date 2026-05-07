import React from 'react';
import { motion } from 'framer-motion';
import { StatsGrid } from '../components/Dashboard/StatsGrid';
import { QuickActions } from '../components/Dashboard/QuickActions';

export const Dashboard: React.FC = () => {
  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/70 text-sm sm:text-base">
          Welcome back! Here's your productivity overview.
        </p>
      </div>

      <StatsGrid />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        <div className="xl:col-span-2">
          <QuickActions />
        </div>
        
        <div className="space-y-6">
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'AI Summary generated', time: '2 min ago', icon: '🤖' },
                { action: 'Voice note processed', time: '15 min ago', icon: '🎤' },
                { action: 'Task completed', time: '1 hour ago', icon: '✅' },
                { action: 'Note created', time: '3 hours ago', icon: '📝' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 sm:p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="text-lg sm:text-base">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-white/50 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Pro Tips</h3>
            <div className="space-y-3">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 text-sm">
                  💡 Use voice notes for quick capture during meetings
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  ⚡ AI summaries help identify key action items
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <p className="text-emerald-300 text-sm">
                  🎯 Priority scores guide your daily focus
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};