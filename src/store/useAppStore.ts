import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note, Task, User, AnalyticsData, PaywallVariant } from '../types';

interface AppState {
  // User & Auth
  user: User | null;
  setUser: (user: User) => void;
  signOut: () => void;
  
  // Notes & Tasks
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  
  // AI Usage
  incrementAiUsage: () => boolean;
  resetAiUsage: () => void;
  
  // Analytics
  analytics: AnalyticsData;
  updateAnalytics: (data: Partial<AnalyticsData>) => void;
  
  // Paywall
  paywallVariants: PaywallVariant[];
  currentPaywallVariant: string;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  recordPaywallView: () => void;
  recordPaywallConversion: () => void;
  
  // Voice Assistant
  isFirstVisit: boolean;
  setFirstVisit: (isFirst: boolean) => void;
  
  // UI State
  currentView: 'dashboard' | 'notes' | 'analytics' | 'settings';
  setCurrentView: (view: 'dashboard' | 'notes' | 'analytics' | 'settings') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial user state
      user: {
        id: '1',
        email: 'demo@mindflow.ai',
        name: 'Demo User',
        subscription: 'free',
        aiUsageCount: 0,
        aiUsageLimit: 3,
        joinedAt: new Date(),
      },
      
      setUser: (user) => set({ user }),
      
      signOut: () => {
        set({
          user: null,
          notes: [],
          currentView: 'dashboard',
          isFirstVisit: true,
          showPaywall: false,
          analytics: {
            totalUsers: 1247,
            freeUsers: 1089,
            proUsers: 158,
            conversionRate: 12.7,
            dailyActiveUsers: 423,
            aiUsageToday: 2856,
            revenueThisMonth: 4750,
            paywallViews: 0,
            paywallConversions: 0,
          }
        });
      },
      
      // Notes management
      notes: [],
      
      addNote: (noteData) => {
        const note: Note = {
          ...noteData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ notes: [note, ...state.notes] }));
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      
      // AI Usage management
      incrementAiUsage: () => {
        const { user } = get();
        if (!user) return false;
        
        if (user.subscription === 'pro' || user.aiUsageCount < user.aiUsageLimit) {
          set((state) => ({
            user: state.user ? { ...state.user, aiUsageCount: state.user.aiUsageCount + 1 } : null,
          }));
          return true;
        }
        
        // Show paywall if limit reached
        set({ showPaywall: true });
        get().recordPaywallView();
        return false;
      },
      
      resetAiUsage: () => {
        set((state) => ({
          user: state.user ? { ...state.user, aiUsageCount: 0 } : null,
        }));
      },
      
      // Analytics
      analytics: {
        totalUsers: 1247,
        freeUsers: 1089,
        proUsers: 158,
        conversionRate: 12.7,
        dailyActiveUsers: 423,
        aiUsageToday: 2856,
        revenueThisMonth: 4750,
        paywallViews: 0,
        paywallConversions: 0,
      },
      
      updateAnalytics: (data) => {
        set((state) => ({
          analytics: { ...state.analytics, ...data },
        }));
      },
      
      // Paywall variants for A/B testing
      paywallVariants: [
        {
          id: 'variant-a',
          name: 'Variant A - Feature Focus',
          title: 'Unlock AI Superpowers',
          subtitle: 'Get unlimited AI assistance for maximum productivity',
          features: [
            'Unlimited AI summarization',
            'Advanced task prioritization',
            'Voice transcription',
            'Export to any format',
            'Priority support'
          ],
          price: '$9.99/month',
          cta: 'Upgrade to Pro',
          conversions: 0,
          views: 0,
        },
        {
          id: 'variant-b',
          name: 'Variant B - Value Focus',
          title: 'Save 10+ Hours Per Week',
          subtitle: 'Join 150+ professionals who boosted their productivity',
          features: [
            '⚡ 10x faster note processing',
            '🎯 Smart priority scoring',
            '🎤 Voice-to-text magic',
            '📊 Productivity insights',
            '💬 24/7 AI assistant'
          ],
          price: '$9.99/month',
          cta: 'Start Saving Time',
          conversions: 0,
          views: 0,
        },
      ],
      
      currentPaywallVariant: 'variant-a',
      showPaywall: false,
      setShowPaywall: (show) => set({ showPaywall: show }),
      
      recordPaywallView: () => {
        const { currentPaywallVariant, paywallVariants, analytics } = get();
        set({
          paywallVariants: paywallVariants.map((variant) =>
            variant.id === currentPaywallVariant
              ? { ...variant, views: variant.views + 1 }
              : variant
          ),
          analytics: { ...analytics, paywallViews: analytics.paywallViews + 1 },
        });
      },
      
      recordPaywallConversion: () => {
        const { currentPaywallVariant, paywallVariants, analytics } = get();
        set({
          paywallVariants: paywallVariants.map((variant) =>
            variant.id === currentPaywallVariant
              ? { ...variant, conversions: variant.conversions + 1 }
              : variant
          ),
          analytics: { ...analytics, paywallConversions: analytics.paywallConversions + 1 },
          user: get().user ? { ...get().user!, subscription: 'pro' } : null,
          showPaywall: false,
        });
      },
      
      // Voice Assistant
      isFirstVisit: true,
      setFirstVisit: (isFirst) => set({ isFirstVisit: isFirst }),
      
      // UI State
      currentView: 'dashboard',
      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: 'mindflow-storage',
    }
  )
);