import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, DollarSign, Eye, MousePointer } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AnalyticsDashboard: React.FC = () => {
  const { analytics, paywallVariants } = useAppStore();

  const conversionData = [
    { name: 'Jan', conversions: 12, views: 145 },
    { name: 'Feb', conversions: 19, views: 167 },
    { name: 'Mar', conversions: 15, views: 134 },
    { name: 'Apr', conversions: 23, views: 178 },
    { name: 'May', conversions: 31, views: 198 },
    { name: 'Jun', conversions: 28, views: 167 },
  ];

  const revenueData = [
    { name: 'Week 1', revenue: 1200 },
    { name: 'Week 2', revenue: 1450 },
    { name: 'Week 3', revenue: 1100 },
    { name: 'Week 4', revenue: 1650 },
  ];

  const userTypeData = [
    { name: 'Free Users', value: analytics.freeUsers, color: '#8B5CF6' },
    { name: 'Pro Users', value: analytics.proUsers, color: '#10B981' },
  ];

  const paywallPerformance = paywallVariants.map(variant => ({
    name: variant.name,
    views: variant.views,
    conversions: variant.conversions,
    rate: variant.views > 0 ? ((variant.conversions / variant.views) * 100).toFixed(1) : '0.0'
  }));

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `$${analytics.revenueThisMonth.toLocaleString()}`,
      change: '+23.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      change: '+2.1%',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Users',
      value: analytics.dailyActiveUsers.toLocaleString(),
      change: '+12.3%',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Paywall CTR',
      value: `${((analytics.paywallConversions / Math.max(analytics.paywallViews, 1)) * 100).toFixed(1)}%`,
      change: '+5.7%',
      icon: MousePointer,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${kpi.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-emerald-400 text-sm font-medium">
                  {kpi.change}
                </span>
              </div>
              
              <div>
                <h3 className="text-white/70 text-sm font-medium mb-1">{kpi.title}</h3>
                <p className="text-2xl font-bold text-white">{kpi.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Trends */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Conversion Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="conversions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Growth */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Distribution */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {userTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* A/B Test Results */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Paywall A/B Testing</h3>
          <div className="space-y-4">
            {paywallPerformance.map((variant, index) => (
              <div key={variant.name} className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-white">{variant.name}</h4>
                  <span className="text-emerald-400 font-bold">{variant.rate}%</span>
                </div>
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Views: {variant.views}</span>
                  <span>Conversions: {variant.conversions}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(parseFloat(variant.rate) * 5, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {paywallPerformance.every(p => p.views === 0) && (
            <div className="text-center py-8 text-white/50">
              <Eye className="w-12 h-12 mx-auto mb-4" />
              <p>No A/B test data yet. Trigger some paywalls to see results!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};