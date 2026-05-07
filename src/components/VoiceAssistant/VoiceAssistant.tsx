import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  X, 
  Minimize2,
  Maximize2,
  Sparkles,
  Brain,
  Mic,
  FileText,
  BarChart3
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface VoiceAssistantProps {
  isFirstVisit?: boolean;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isFirstVisit = false }) => {
  const [isOpen, setIsOpen] = useState(isFirstVisit);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { user, currentView, notes } = useAppStore();

  const welcomeMessages = [
    {
      text: "👋 Welcome to MindFlow AI! I'm Aria, your intelligent productivity companion.",
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500'
    },
    {
      text: "🎤 I can help you create voice notes, extract tasks with AI, and boost your productivity by 10x!",
      icon: Mic,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      text: "🧠 Try saying 'Create a voice note' or click the Quick Actions to see my AI magic in action!",
      icon: Brain,
      color: 'from-emerald-500 to-green-500'
    }
  ];

  const contextualMessages = {
    dashboard: [
      "📊 This is your productivity dashboard! Here you can see your AI usage, completed tasks, and quick actions.",
      "⚡ Try the Voice Note feature - I'll transcribe and extract tasks automatically!",
      "💡 Your productivity score shows how efficiently you're completing tasks. Let's improve it together!"
    ],
    notes: [
      "📝 Welcome to your notes section! This is where all your AI-processed content lives.",
      "🤖 I can analyze any note and extract actionable tasks with priority scores.",
      "✨ Pro tip: Voice notes get processed faster and include smart summaries!"
    ],
    analytics: [
      "📈 Amazing! You're viewing the analytics dashboard - perfect for tracking your productivity growth.",
      "🎯 These metrics show how AI is helping you save time and complete more tasks.",
      "📊 The A/B testing section shows how different upgrade prompts perform - very meta!"
    ],
    settings: [
      "⚙️ In settings, you can customize how I work with you and manage your subscription.",
      "🔧 You can adjust my voice processing, notification preferences, and upgrade to Pro here.",
      "👑 Pro users get unlimited AI features and priority processing - worth every penny!"
    ]
  };

  const quickHelp = [
    { text: "How do I create a voice note?", response: "Simply click the 'Voice Note' button in Quick Actions, or say 'Hey Aria, create a voice note' and I'll start recording!" },
    { text: "What can AI do for me?", response: "I can transcribe voice notes, extract tasks, prioritize them, estimate time needed, and provide smart summaries. It's like having a personal assistant!" },
    { text: "How do I upgrade to Pro?", response: "Pro unlocks unlimited AI features! You'll see upgrade prompts when you hit the free tier limits, or visit Settings to upgrade anytime." },
    { text: "Can you help me be more productive?", response: "Absolutely! I analyze your notes to find patterns, suggest priorities, and help you focus on what matters most. Let's boost your productivity together!" }
  ];

  const typeMessage = async (message: string) => {
    setIsTyping(true);
    setCurrentMessage('');
    
    for (let i = 0; i <= message.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setCurrentMessage(message.slice(0, i));
    }
    
    setIsTyping(false);
    
    // Speak the message if not muted
    if (!isMuted && 'speechSynthesis' in window) {
      speakMessage(message);
    }
  };

  const speakMessage = (text: string) => {
    if (speechSynthRef.current) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text.replace(/[👋🎤🧠📊⚡💡📝🤖✨📈🎯📊⚙️🔧👑]/gu, ''));
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Try to use a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') || 
      voice.name.includes('Karen') ||
      voice.name.includes('Moira') ||
      voice.name.includes('Tessa') ||
      voice.gender === 'female'
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleQuickHelp = (question: string) => {
    const helpItem = quickHelp.find(item => item.text === question);
    if (helpItem) {
      typeMessage(helpItem.response);
    }
  };

  const getContextualMessage = () => {
    const messages = contextualMessages[currentView] || contextualMessages.dashboard;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    if (isFirstVisit && isOpen && !isMinimized) {
      const showWelcomeSequence = async () => {
        for (let i = 0; i < welcomeMessages.length; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 0 ? 1000 : 4000));
          await typeMessage(welcomeMessages[i].text);
          setMessageIndex(i);
        }
      };
      showWelcomeSequence();
    }
  }, [isFirstVisit, isOpen, isMinimized]);

  useEffect(() => {
    // Load voices when they become available
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ${
          isMinimized ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-80 sm:w-96 h-auto max-h-[500px]'
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {isMinimized ? (
          <motion.button
            onClick={() => setIsMinimized(false)}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            {isSpeaking && (
              <motion.div
                className="absolute inset-0 border-2 border-emerald-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>
        ) : (
          <motion.div
            className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            layout
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/20">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">Aria AI Assistant</h3>
                  <p className="text-white/60 text-xs">
                    {isSpeaking ? 'Speaking...' : isTyping ? 'Typing...' : 'Ready to help'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                    isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/70 hover:text-white'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" /> : <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
                
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="Close"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] max-h-[180px] sm:max-h-[200px] overflow-y-auto">
              {currentMessage && (
                <motion.div
                  className="bg-white/10 rounded-lg p-2 sm:p-3 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                    {currentMessage}
                    {isTyping && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-purple-400 ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </p>
                </motion.div>
              )}
              
              {!currentMessage && !isTyping && (
                <div className="text-center py-6 sm:py-8">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <p className="text-white/70 text-xs sm:text-sm">Hi! I'm Aria, ready to help you be more productive!</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-3 sm:p-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => typeMessage(getContextualMessage())}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 text-xs transition-colors"
                >
                  💡 Help with this page
                </button>
                <button
                  onClick={() => handleQuickHelp("What can AI do for me?")}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 text-xs transition-colors"
                >
                  🤖 AI Features
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-1 sm:space-x-2 flex-wrap">
                  {quickHelp.slice(0, 2).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickHelp(item.text)}
                      className="px-2 sm:px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs rounded-full transition-colors mb-1"
                    >
                      {item.text.split(' ').slice(0, 2).join(' ')}...
                    </button>
                  ))}
                </div>
                
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="px-2 sm:px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs rounded-full transition-colors"
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};