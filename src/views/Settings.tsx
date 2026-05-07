import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Zap, 
  Crown,
  Settings as SettingsIcon,
  BarChart3,
  Check,
  X,
  Edit3,
  Save,
  Lock,
  Mail,
  Phone,
  Globe,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import toast from 'react-hot-toast';

export const Settings: React.FC = () => {
  const { user, paywallVariants, setShowPaywall, currentPaywallVariant, setUser } = useAppStore();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    aiInsights: true,
    weeklySummary: false,
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false
  });

  const [preferences, setPreferences] = useState({
    aiProcessing: 'Automatic',
    voiceLanguage: 'English (US)',
    exportFormat: 'Markdown',
    theme: 'Dark',
    autoSave: true,
    smartSuggestions: true
  });

  const handleEditStart = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleEditSave = (field: string) => {
    if (user && field === 'name') {
      setUser({ ...user, name: editValue });
      toast.success('Name updated successfully!', { icon: '✅' });
    } else if (field === 'email') {
      if (user) {
        setUser({ ...user, email: editValue });
        toast.success('Email updated successfully!', { icon: '📧' });
      }
    }
    setEditingField(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    const action = !notifications[key] ? 'enabled' : 'disabled';
    const label = key.replace(/([A-Z])/g, ' $1').toLowerCase();
    toast.success(`${label} ${action}`, {
      icon: !notifications[key] ? '🔔' : '🔕'
    });
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} updated`, {
      icon: '⚙️'
    });
  };

  const handleExportData = () => {
    toast.success('Exporting your data...', { icon: '📤' });
    setTimeout(() => {
      toast.success('Data exported successfully!', { icon: '✅' });
    }, 2000);
  };

  const handleImportData = () => {
    toast.success('Import feature coming soon!', { icon: '📥' });
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion requires confirmation', { 
      icon: '⚠️',
      duration: 4000 
    });
  };

  const handleChangePassword = () => {
    toast.success('Password change email sent!', { icon: '🔐' });
  };

  const settingSections = [
    {
      title: 'Account Information',
      icon: User,
      items: [
        { 
          label: 'Email Address', 
          value: user?.email || '', 
          editable: true,
          field: 'email',
          type: 'email'
        },
        { 
          label: 'Full Name', 
          value: user?.name || '', 
          editable: true,
          field: 'name',
          type: 'text'
        },
        { 
          label: 'Subscription Plan', 
          value: user?.subscription || '', 
          editable: false, 
          badge: user?.subscription === 'pro' ? 'Crown' : 'Upgrade',
          field: 'plan'
        }
      ]
    },
    {
      title: 'AI Preferences',
      icon: SettingsIcon,
      items: [
        { 
          label: 'AI Processing Mode', 
          value: preferences.aiProcessing, 
          editable: true,
          field: 'aiProcessing',
          options: ['Automatic', 'Manual', 'Smart', 'Advanced']
        },
        { 
          label: 'Voice Language', 
          value: preferences.voiceLanguage, 
          editable: true,
          field: 'voiceLanguage',
          options: ['English (US)', 'English (UK)', 'Spanish', 'French', 'German', 'Italian', 'Portuguese']
        },
        { 
          label: 'Export Format', 
          value: preferences.exportFormat, 
          editable: true,
          field: 'exportFormat',
          options: ['Markdown', 'PDF', 'Word', 'Plain Text', 'JSON', 'CSV']
        },
        { 
          label: 'Theme', 
          value: preferences.theme, 
          editable: true,
          field: 'theme',
          options: ['Dark', 'Light', 'Auto', 'High Contrast']
        }
      ]
    }
  ];

  const notificationItems = [
    {
      key: 'taskReminders' as const,
      label: 'Task Reminders',
      description: 'Get notified about upcoming and overdue tasks',
      enabled: notifications.taskReminders,
      icon: Bell
    },
    {
      key: 'aiInsights' as const,
      label: 'AI Insights',
      description: 'Receive AI-generated productivity insights',
      enabled: notifications.aiInsights,
      icon: Zap
    },
    {
      key: 'emailNotifications' as const,
      label: 'Email Notifications',
      description: 'Receive important updates via email',
      enabled: notifications.emailNotifications,
      icon: Mail
    },
    {
      key: 'pushNotifications' as const,
      label: 'Push Notifications',
      description: 'Get real-time notifications on your device',
      enabled: notifications.pushNotifications,
      icon: Phone
    },
    {
      key: 'weeklySummary' as const,
      label: 'Weekly Summary',
      description: 'Get weekly productivity reports via email',
      enabled: notifications.weeklySummary,
      icon: BarChart3
    },
    {
      key: 'weeklyReports' as const,
      label: 'Weekly Reports',
      description: 'Detailed analytics and insights reports',
      enabled: notifications.weeklyReports,
      icon: BarChart3
    }
  ];

  const securityActions = [
    {
      label: 'Change Password',
      description: 'Update your account password',
      icon: Lock,
      onClick: handleChangePassword,
      color: 'blue'
    },
    {
      label: 'Export Data',
      description: 'Download all your data',
      icon: Download,
      onClick: handleExportData,
      color: 'green'
    },
    {
      label: 'Import Data',
      description: 'Import data from backup',
      icon: Upload,
      onClick: handleImportData,
      color: 'purple'
    },
    {
      label: 'Delete Account',
      description: 'Permanently delete your account',
      icon: Trash2,
      onClick: handleDeleteAccount,
      color: 'red'
    }
  ];

  const handleUpgradeClick = () => {
    setShowPaywall(true);
  };

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/70 text-sm sm:text-base">
          Manage your account, preferences, and subscription.
        </p>
      </div>

      {/* Subscription Status */}
      <motion.div 
        className="card p-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`p-2 sm:p-3 rounded-lg ${
              user?.subscription === 'pro' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500'
            }`}>
              {user?.subscription === 'pro' ? (
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white capitalize">
                {user?.subscription} Plan
              </h3>
              <p className="text-white/70 text-sm sm:text-base">
                {user?.subscription === 'pro' 
                  ? 'Unlimited AI features and priority support'
                  : `${user?.aiUsageCount}/${user?.aiUsageLimit} AI uses today`
                }
              </p>
            </div>
          </div>
          
          {user?.subscription === 'free' && (
            <button
              onClick={handleUpgradeClick}
              className="button-primary w-full sm:w-auto"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </button>
          )}
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <motion.div
              key={section.title}
              className="card p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-2 rounded-lg bg-white/10">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{section.title}</h3>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 font-medium text-sm sm:text-base">{item.label}</p>
                      {editingField === item.field ? (
                        <div className="flex items-center space-x-2 mt-1">
                          {item.options ? (
                            <select
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
                            >
                              {item.options.map(option => (
                                <option key={option} value={option} className="bg-gray-800">
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={item.type || 'text'}
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
                              autoFocus
                            />
                          )}
                          <button
                            onClick={() => handleEditSave(item.field)}
                            className="p-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 flex-shrink-0"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 flex-shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-white/60 text-xs sm:text-sm truncate">{item.value}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-2">
                      {item.badge && (
                        <span 
                          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                            item.badge === 'Crown' 
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                          }`}
                          onClick={item.badge === 'Upgrade' ? handleUpgradeClick : undefined}
                        >
                          {item.badge}
                        </span>
                      )}
                      
                      {item.editable && editingField !== item.field && (
                        <button
                          onClick={() => handleEditStart(item.field, item.value)}
                          className="p-1 rounded text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Notifications Section */}
        <motion.div
          className="card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="p-2 rounded-lg bg-white/10">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            {notificationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="p-1.5 rounded bg-white/10">
                      <Icon className="w-3 h-3 text-white/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 font-medium text-sm sm:text-base">{item.label}</p>
                      <p className="text-white/60 text-xs sm:text-sm">{item.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleNotificationToggle(item.key)}
                    className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors duration-200 focus:outline-none ml-2 flex-shrink-0 ${
                      item.enabled ? 'bg-emerald-500' : 'bg-white/20'
                    }`}
                  >
                    <motion.div
                      className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-md"
                      animate={{
                        x: item.enabled ? (window.innerWidth < 640 ? 16 : 20) : 2,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{ y: 2 }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Security & Data Section */}
        <motion.div
          className="card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="p-2 rounded-lg bg-white/10">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">Security & Data</h3>
          </div>
          
          <div className="space-y-3">
            {securityActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30',
                green: 'bg-green-500/20 text-green-400 hover:bg-green-500/30',
                purple: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30',
                red: 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              };
              
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${colorClasses[action.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="w-4 h-4" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{action.label}</p>
                    <p className="text-xs opacity-70">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* A/B Testing Section (for demo purposes) */}
      <motion.div 
        className="card p-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-white/10">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">Demo Controls</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-white/80 font-medium mb-2 text-sm sm:text-base">Test Paywall Variants</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paywallVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setShowPaywall(true)}
                  className="p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                >
                  <p className="text-white font-medium text-sm">{variant.name}</p>
                  <p className="text-white/60 text-xs mt-1 truncate">{variant.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-white/50">
                      Views: {variant.views} | Conv: {variant.conversions}
                    </span>
                    <span className="text-xs text-emerald-400">
                      {variant.views > 0 ? ((variant.conversions / variant.views) * 100).toFixed(1) : '0'}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};