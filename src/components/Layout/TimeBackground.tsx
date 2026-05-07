import React, { useEffect, useState } from 'react';

export const TimeBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#030712] -z-10" />;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#030712]">
      {/* Aurora 1 */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-aurora-1" />
      
      {/* Aurora 2 */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-aurora-2" />
      
      {/* Subtle Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, 10vh) scale(1.1); }
          66% { transform: translate(-5vw, 15vh) scale(0.9); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-10vw, -10vh) scale(1.2); }
          66% { transform: translate(5vw, -15vh) scale(0.8); }
        }
        .animate-aurora-1 {
          animation: aurora-1 20s ease-in-out infinite;
          will-change: transform;
        }
        .animate-aurora-2 {
          animation: aurora-2 25s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};