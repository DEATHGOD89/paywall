import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  Clock, 
  Zap 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const StatsGrid: React.FC = () => {
  const { notes, user, analytics } = useAppStore();
  
  const totalTasks = notes.reduce((acc, note) => acc + note.tasks.length, 0);
  const completedTasks = notes.reduce((acc, note) => 
    acc + note.tasks.filter(task => task.completed).length, 0
  );
  const aiProcessedNotes = notes.filter(note => note.isAiProcessed).length;

  const stats = [
    {
      title: 'AI Uses Today',
      value: user?.aiUsageCount || 0,
      max: user?.subscription === 'pro' ? '∞' : user?.aiUsageLimit,
      icon: Brain,
      color: 'from-purple-500 to-blue-500',
      trend: '+12%'
    },
    {
      title: 'Notes Created',
      value: notes.length,
      icon: FileText,
      color: 'from-emerald-500 to-green-500',
      trend: '+8%'
    },
    {
      title: 'Tasks Completed',
      value: completedTasks,
      max: totalTasks,
      icon: CheckSquare,
      color: 'from-orange-500 to-red-500',
      trend: '+23%'
    },
    {
      title: 'AI Processed',
      value: aiProcessedNotes,
      icon: Zap,
      color: 'from-pink-500 to-purple-500',
      trend: '+15%'
    },
    {
      title: 'Productivity Score',
      value: Math.round((completedTasks / Math.max(totalTasks, 1)) * 100),
      suffix: '%',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      trend: '+5%'
    },
    {
      title: 'Time Saved',
      value: Math.round(aiProcessedNotes * 12.5),
      suffix: 'min',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      trend: '+31%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.title}
            className="card relative overflow-hidden group p-4 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Glowing Hover Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${stat.color} pointer-events-none blur-xl`} />
            <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors duration-500 rounded-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-emerald-400 text-xs sm:text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                  {stat.trend}
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white/60 text-xs sm:text-sm font-medium tracking-wide uppercase">{stat.title}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    {stat.value}
                  </span>
                  {stat.max && (
                    <span className="text-white/40 text-sm">
                      / {stat.max}
                    </span>
                  )}
                  {stat.suffix && (
                    <span className="text-white/60 text-sm font-medium">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                
                {stat.max && typeof stat.max === 'number' && (
                  <div className="w-full bg-white/10 rounded-full h-2 mt-4 overflow-hidden border border-white/5">
                    <motion.div 
                      className={`bg-gradient-to-r ${stat.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((stat.value / stat.max) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};