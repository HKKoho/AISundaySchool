import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [tip, setTip] = useState(0);
  
  const tips = [
    "Generating Biblical triples...",
    "Creating AI images (this may take 30 seconds)...",
    "Finding objects from scripture...",
    "Did you know? The Bible mentions over 100 different plants.",
    "Did you know? There are 1,189 chapters in the Bible.",
    "Please wait while we generate 5 unique images..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTip((prev) => (prev + 1) % tips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bible-paper p-4 fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full text-center">
        <div className="relative flex justify-center mb-6">
          <div className="absolute animate-ping inline-flex h-12 w-12 rounded-full bg-bible-gold/30 opacity-75"></div>
          <Loader2 className="relative w-12 h-12 text-bible-gold animate-spin" />
        </div>
        <h2 className="text-xl font-serif font-bold text-bible-dark mb-2">Creating Round</h2>
        <p className="text-gray-500 h-12 flex items-center justify-center text-sm transition-opacity duration-500">
          {tips[tip]}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;