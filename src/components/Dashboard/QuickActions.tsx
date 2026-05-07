import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Mic, 
  Brain, 
  FileText, 
  Sparkles,
  MicIcon
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import toast from 'react-hot-toast';

export const QuickActions: React.FC = () => {
  const { addNote, incrementAiUsage, user } = useAppStore();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceNote = async () => {
    setIsRecording(true);
    
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        if (incrementAiUsage()) {
          const voiceNote = {
            title: 'Voice Note - ' + new Date().toLocaleTimeString(),
            content: 'Simulated transcription: Meeting with client tomorrow at 2 PM. Need to prepare presentation slides and review contract terms. Follow up on the budget proposal.',
            summary: 'Client meeting preparation with presentation and contract review tasks.',
            tasks: [
              {
                id: Date.now().toString() + '1',
                text: 'Prepare presentation slides',
                priority: 'high' as const,
                completed: false,
                aiScore: 95,
                estimatedTime: '2 hours'
              },
              {
                id: Date.now().toString() + '2',
                text: 'Review contract terms',
                priority: 'high' as const,
                completed: false,
                aiScore: 88,
                estimatedTime: '1 hour'
              },
              {
                id: Date.now().toString() + '3',
                text: 'Follow up on budget proposal',
                priority: 'medium' as const,
                completed: false,
                aiScore: 72,
                estimatedTime: '30 minutes'
              }
            ],
            isAiProcessed: true,
            transcriptionSource: 'voice' as const
          };
          
          addNote(voiceNote);
          toast.success('Voice note processed with AI insights!');
        }
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  const handleQuickNote = () => {
    const quickNote = {
      title: 'Quick Note - ' + new Date().toLocaleTimeString(),
      content: 'Start typing your thoughts here...',
      tasks: [],
      isAiProcessed: false
    };
    
    addNote(quickNote);
    toast.success('Quick note created!');
  };

  const handleAiSuggestion = () => {
    if (incrementAiUsage()) {
      toast.success('AI suggestions generated!', {
        icon: '🤖',
      });
    }
  };

  const actions = [
    {
      title: 'Voice Note',
      description: 'Record and auto-transcribe',
      icon: Mic,
      color: 'from-purple-500 to-pink-500',
      onClick: handleVoiceNote,
      disabled: isRecording || isProcessing,
      loading: isRecording || isProcessing,
      loadingText: isRecording ? 'Recording...' : 'Processing with AI...'
    },
    {
      title: 'Quick Note',
      description: 'Start writing instantly',
      icon: Plus,
      color: 'from-blue-500 to-cyan-500',
      onClick: handleQuickNote
    },
    {
      title: 'AI Suggestions',
      description: 'Get productivity insights',
      icon: Brain,
      color: 'from-emerald-500 to-green-500',
      onClick: handleAiSuggestion,
      disabled: user?.subscription === 'free' && (user?.aiUsageCount >= user?.aiUsageLimit)
    },
    {
      title: 'Smart Summary',
      description: 'Summarize recent notes',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500',
      onClick: handleAiSuggestion,
      disabled: user?.subscription === 'free' && (user?.aiUsageCount >= user?.aiUsageLimit)
    }
  ];

  return (
    <div className="card">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.button
              key={action.title}
              onClick={action.onClick}
              disabled={action.disabled || action.loading}
              className={`p-4 sm:p-4 rounded-lg text-left transition-all duration-200 ${
                action.disabled 
                  ? 'bg-white/5 cursor-not-allowed opacity-50' 
                  : 'glass-dark hover:bg-white/20 transform hover:scale-105 active:scale-95'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!action.disabled ? { scale: 1.02 } : {}}
              whileTap={!action.disabled ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 sm:p-2 rounded-lg bg-gradient-to-r ${action.color} ${
                  action.loading ? 'animate-pulse' : ''
                }`}>
                  {action.loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-sm sm:text-base">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 truncate">
                    {action.loading ? action.loadingText : action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {user?.subscription === 'free' && (
        <motion.div 
          className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-orange-300">
              <strong>Tip:</strong> Upgrade to Pro for unlimited AI features and priority processing!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};