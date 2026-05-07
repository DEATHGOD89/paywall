export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  isAiProcessed: boolean;
  transcriptionSource?: 'voice' | 'manual';
}

export interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  aiScore?: number;
  estimatedTime?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'pro';
  aiUsageCount: number;
  aiUsageLimit: number;
  joinedAt: Date;
}

export interface AnalyticsData {
  totalUsers: number;
  freeUsers: number;
  proUsers: number;
  conversionRate: number;
  dailyActiveUsers: number;
  aiUsageToday: number;
  revenueThisMonth: number;
  paywallViews: number;
  paywallConversions: number;
}

export interface PaywallVariant {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  features: string[];
  price: string;
  cta: string;
  conversions: number;
  views: number;
}