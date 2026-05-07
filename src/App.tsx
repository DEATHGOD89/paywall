import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout/Header';
import { TimeBackground } from './components/Layout/TimeBackground';
import { PaywallModal } from './components/Paywall/PaywallModal';
import { VoiceAssistant } from './components/VoiceAssistant/VoiceAssistant';
import { Dashboard } from './views/Dashboard';
import { Notes } from './views/Notes';
import { Analytics } from './views/Analytics';
import { Settings } from './views/Settings';
import { useAppStore } from './store/useAppStore';

function App() {
  const { currentView, isFirstVisit, setFirstVisit } = useAppStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'notes':
        return <Notes />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    // Set first visit to false after initial load
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setFirstVisit(false);
      }, 15000); // Hide first visit status after 15 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit, setFirstVisit]);

  return (
    <div className="min-h-screen relative text-slate-100 font-sans selection:bg-indigo-500/30">
      <TimeBackground />
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 safe-area-inset relative z-10">
        {renderCurrentView()}
      </main>

      <PaywallModal />
      <VoiceAssistant isFirstVisit={isFirstVisit} />
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.8)',
            color: 'white',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '14px',
            padding: '12px 16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          },
        }}
      />
    </div>
  );
}

export default App;