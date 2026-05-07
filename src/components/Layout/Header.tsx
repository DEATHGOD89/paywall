import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  User, 
  Settings, 
  BarChart3, 
  FileText, 
  Crown,
  LogOut,
  UserCircle,
  CreditCard,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  Shield,
  Bell
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const { user, currentView, setCurrentView, setShowPaywall, resetAiUsage } = useAppStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const handleSignOut = () => {
    // Clear user session and reset app state
    toast.success('Signing out...', {
      icon: '👋',
      duration: 2000,
    });
    
    setTimeout(() => {
      // Reset to initial state
      window.location.reload();
      toast.success('Successfully signed out!');
    }, 1500);
  };

  const handleViewProfile = () => {
    setCurrentView('settings');
    setShowProfileMenu(false);
    toast.success('Navigated to profile settings', {
      icon: '👤',
    });
  };

  const handleUpgradeClick = () => {
    setShowPaywall(true);
    setShowProfileMenu(false);
    toast.success('Opening upgrade options...', {
      icon: '👑',
    });
  };

  const handleBillingClick = () => {
    setShowProfileMenu(false);
    toast.success('Opening billing dashboard...', {
      icon: '💳',
      duration: 3000,
    });
    // In a real app, this would navigate to billing page
  };

  const handleHelpClick = () => {
    setShowProfileMenu(false);
    toast.success('Opening help center...', {
      icon: '❓',
      duration: 3000,
    });
    // In a real app, this would open help documentation
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    setShowProfileMenu(false);
    toast.success(`Switched to ${isDarkMode ? 'light' : 'dark'} mode`, {
      icon: isDarkMode ? '☀️' : '🌙',
    });
    // In a real app, this would toggle the actual theme
  };

  const handleSecurityClick = () => {
    setShowProfileMenu(false);
    toast.success('Opening security settings...', {
      icon: '🔒',
    });
  };

  const handleNotificationsClick = () => {
    setShowProfileMenu(false);
    toast.success('Opening notification preferences...', {
      icon: '🔔',
    });
  };

  const profileMenuItems = [
    {
      label: 'View Profile',
      icon: UserCircle,
      onClick: handleViewProfile,
      description: 'Manage your account details'
    },
    {
      label: 'Upgrade to Pro',
      icon: Crown,
      onClick: handleUpgradeClick,
      highlight: user?.subscription === 'free',
      description: 'Unlock unlimited AI features'
    },
    {
      label: 'Billing & Usage',
      icon: CreditCard,
      onClick: handleBillingClick,
      description: 'View subscription and usage'
    },
    {
      label: 'Security',
      icon: Shield,
      onClick: handleSecurityClick,
      description: 'Password and security settings'
    },
    {
      label: 'Notifications',
      icon: Bell,
      onClick: handleNotificationsClick,
      description: 'Manage notification preferences'
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      onClick: handleHelpClick,
      description: 'Get help and contact support'
    },
    {
      label: isDarkMode ? 'Light Mode' : 'Dark Mode',
      icon: isDarkMode ? Sun : Moon,
      onClick: handleThemeToggle,
      description: 'Switch app appearance'
    },
    {
      label: 'Sign Out',
      icon: LogOut,
      onClick: handleSignOut,
      danger: true,
      description: 'Sign out of your account'
    }
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when view changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [currentView]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="glass-dark border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 relative z-40">
      <div className="flex items-center justify-between">
        {/* Logo - Responsive */}
        <motion.div 
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div 
            className="relative p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-all duration-300"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm group-hover:animate-pulse"></div>
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:to-indigo-400 transition-colors">MindFlow AI</h1>
            <p className="text-xs sm:text-sm text-indigo-200/70">Intelligent Productivity Companion</p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">MindFlow</h1>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/5 rounded-2xl p-1 border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : ''}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile Menu Button & Profile */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Profile Section */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            ref={profileMenuRef}
          >
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {/* Mobile Profile - Compact */}
              <div className="sm:hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium text-xs">
                  {getInitials(user?.name || 'User')}
                </div>
              </div>

              {/* Desktop Profile - Full */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-white/70 capitalize">
                      {user?.subscription} Plan
                    </p>
                    {user?.subscription === 'free' && (
                      <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded text-xs">
                        {user.aiUsageCount}/{user.aiUsageLimit}
                      </span>
                    )}
                    {user?.subscription === 'pro' && (
                      <Crown className="w-3 h-3 text-yellow-400" />
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                    {getInitials(user?.name || 'User')}
                  </div>
                  <motion.div
                    animate={{ rotate: showProfileMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <ChevronDown className="w-2 h-2 text-white" />
                  </motion.div>
                </div>
              </div>
            </button>

            {/* Profile Dropdown - FIXED Z-INDEX */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  className="absolute right-0 top-full mt-2 w-64 sm:w-80 bg-gradient-to-br from-purple-900/98 to-blue-900/98 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-[9999]"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ zIndex: 9999 }}
                >
                  {/* Profile Header */}
                  <div className="p-4 sm:p-5 border-b border-white/20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                        {getInitials(user?.name || 'User')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-base sm:text-lg truncate">{user?.name}</p>
                        <p className="text-sm text-white/70 truncate">{user?.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            user?.subscription === 'pro' 
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                              : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          }`}>
                            {user?.subscription === 'pro' ? '👑 Pro Member' : '🆓 Free Plan'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2 max-h-80 overflow-y-auto">
                    {profileMenuItems.map((item, index) => {
                      const Icon = item.icon;
                      
                      return (
                        <motion.button
                          key={index}
                          onClick={item.onClick}
                          className={`w-full flex items-center space-x-3 px-4 sm:px-5 py-3 text-left transition-all duration-200 ${
                            item.danger 
                              ? 'hover:bg-red-500/10 text-red-400 border-t border-white/10' 
                              : item.highlight 
                                ? 'hover:bg-yellow-500/10 text-yellow-400' 
                                : 'hover:bg-white/10 text-white/90'
                          } ${index === profileMenuItems.length - 1 ? 'border-t border-white/10' : ''}`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.1 }}
                        >
                          <div className={`p-2 rounded-lg ${
                            item.danger 
                              ? 'bg-red-500/20' 
                              : item.highlight 
                                ? 'bg-yellow-500/20' 
                                : 'bg-white/10'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{item.label}</p>
                            <p className="text-xs opacity-70 truncate">{item.description}</p>
                          </div>
                          {item.highlight && (
                            <motion.div
                              className="w-2 h-2 bg-yellow-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-white/20 bg-white/5">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>MindFlow AI v1.0</span>
                      <span>© 2024</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="lg:hidden mt-4 pt-4 border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile User Info */}
            <div className="mt-4 p-4 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-white/60 text-sm capitalize">{user?.subscription} Plan</p>
                </div>
                {user?.subscription === 'free' && (
                  <div className="text-right">
                    <p className="text-orange-300 text-sm font-medium">
                      {user.aiUsageCount}/{user.aiUsageLimit} AI uses
                    </p>
                    <button
                      onClick={() => {
                        setShowPaywall(true);
                        setShowMobileMenu(false);
                      }}
                      className="text-xs text-purple-400 hover:text-purple-300"
                    >
                      Upgrade to Pro
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};