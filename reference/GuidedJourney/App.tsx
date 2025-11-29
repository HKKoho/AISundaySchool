import React, { useState, useEffect } from 'react';
import { AVAILABLE_ROUTES, RouteData, GameState, QuizQuestion } from './types';
import { generateRouteData, generateQuizForStep, generateImageForStop } from './services/geminiService';
import MapVisualizer from './components/MapVisualizer';
import QuizModal from './components/QuizModal';
import { Map, ScrollText, Compass, ArrowRight, Book, RefreshCcw, Loader2, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // Image generation state
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleSelectRoute = async (routeId: string) => {
    setSelectedRouteId(routeId);
    setGameState(GameState.LOADING_ROUTE);
    const routeInfo = AVAILABLE_ROUTES.find(r => r.id === routeId);
    if (!routeInfo) return;

    setLoadingMsg(`Consulting the archives for ${routeInfo.title}...`);
    setError(null);

    try {
      const data = await generateRouteData(routeId, routeInfo.title);
      setRouteData(data);
      setCurrentStepIndex(0);
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setError("Failed to load the ancient scrolls. Please check your connection or API key.");
      setGameState(GameState.MENU);
    }
  };

  // Effect to load image for current step if missing
  useEffect(() => {
    const fetchImage = async () => {
      if (!routeData || gameState !== GameState.PLAYING) return;
      
      const currentStop = routeData.stops[currentStepIndex];
      
      // If we already have an image or are currently generating one, skip
      if (currentStop.imageUrl || isGeneratingImage) return;

      setIsGeneratingImage(true);
      try {
        const imageUrl = await generateImageForStop(currentStop.imagePrompt);
        
        // Update state immutably
        setRouteData(prev => {
          if (!prev) return null;
          const newStops = [...prev.stops];
          newStops[currentStepIndex] = { ...newStops[currentStepIndex], imageUrl };
          return { ...prev, stops: newStops };
        });
      } catch (e) {
        console.error("Failed to generate image", e);
      } finally {
        setIsGeneratingImage(false);
      }
    };

    fetchImage();
  }, [currentStepIndex, routeData, gameState]);


  const handleTravelClick = async () => {
    if (!routeData) return;
    
    // Check if finished
    if (currentStepIndex >= routeData.stops.length - 1) {
      setGameState(GameState.FINISHED);
      return;
    }

    const currentStop = routeData.stops[currentStepIndex];
    const nextStop = routeData.stops[currentStepIndex + 1];

    setLoadingMsg("Preparing the path ahead...");
    setGameState(GameState.LOADING_ROUTE); // Reuse loading state for spinner overlay

    try {
      const quiz = await generateQuizForStep(currentStop.name, nextStop.name, routeData.title);
      setCurrentQuiz(quiz);
      setGameState(GameState.QUIZ);
    } catch (err) {
      console.error(err);
      // Fallback: just advance if quiz gen fails
      setCurrentStepIndex(prev => prev + 1);
      setGameState(GameState.PLAYING);
    }
  };

  const handleQuizSuccess = () => {
    setGameState(GameState.PLAYING);
    setCurrentStepIndex(prev => prev + 1);
    setCurrentQuiz(null);
  };

  const restartGame = () => {
    setGameState(GameState.MENU);
    setRouteData(null);
    setCurrentStepIndex(0);
    setSelectedRouteId(null);
    setIsGeneratingImage(false);
  };

  // Render Helpers
  const renderMenu = () => (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-stone-800 mb-4 font-serif tracking-tight">Biblical Journeys</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Explore the ancient paths of scripture. Select a journey to begin your adventure through history and theology.
        </p>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AVAILABLE_ROUTES.map((route) => (
          <button
            key={route.id}
            onClick={() => handleSelectRoute(route.id)}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-stone-100 text-left flex flex-col h-full"
          >
            <div className={`h-32 bg-gradient-to-br ${route.color} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <Map className="text-white/80 group-hover:scale-110 transition-transform duration-500" size={64} />
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                  {route.title}
                </h3>
                <p className="text-stone-600 leading-relaxed mb-4">
                  {route.desc}
                </p>
              </div>
              <div className="flex items-center text-amber-600 font-bold text-sm tracking-wide uppercase mt-auto">
                Begin Journey <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
      <Loader2 className="animate-spin text-amber-600 mb-4" size={48} />
      <h2 className="text-2xl font-serif text-stone-800">{loadingMsg}</h2>
      <p className="text-stone-500 mt-2 italic">Please wait while the history is compiled...</p>
    </div>
  );

  const renderGame = () => {
    if (!routeData) return null;
    const currentStop = routeData.stops[currentStepIndex];
    const isLastStop = currentStepIndex === routeData.stops.length - 1;

    return (
      <div className="h-screen flex flex-col bg-stone-100 overflow-hidden">
        {/* Navbar */}
        <nav className="bg-stone-900 text-stone-50 p-4 shadow-lg z-20 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <div onClick={restartGame} className="cursor-pointer hover:text-amber-400 transition-colors">
               <Compass size={28} />
             </div>
             <div>
               <h1 className="text-lg font-bold font-serif leading-none">{routeData.title}</h1>
               <span className="text-xs text-stone-400 uppercase tracking-widest">
                 Stop {currentStepIndex + 1} of {routeData.stops.length}
               </span>
             </div>
          </div>
          <button 
            onClick={restartGame}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
          >
            <RefreshCcw size={16} /> Quit
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col md:flex-row h-full overflow-hidden">
          
          {/* Map Area */}
          <div className="w-full md:w-2/3 h-1/2 md:h-full p-4 relative bg-stone-200">
            <MapVisualizer stops={routeData.stops} currentStepIndex={currentStepIndex} />
          </div>

          {/* Sidebar / Info Panel */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white border-l border-stone-200 shadow-xl overflow-y-auto flex flex-col z-10">
            
            {/* Scrollable Content */}
            <div className="flex-grow p-8">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider mb-4 uppercase">
                Current Location
              </div>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">{currentStop.name}</h2>
              
              <div className="space-y-8">
                {/* Image Section */}
                <div className="w-full aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden shadow-inner border border-stone-200 relative group">
                  {currentStop.imageUrl ? (
                    <>
                      <img 
                        src={currentStop.imageUrl} 
                        alt={`Illustration of ${currentStop.name}`} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
                      {isGeneratingImage ? (
                        <>
                           <Loader2 className="animate-spin mb-2 text-amber-600" size={32} />
                           <span className="text-xs font-serif italic text-amber-700">Painting the scene...</span>
                        </>
                      ) : (
                        <ImageIcon size={48} className="opacity-20" />
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-stone-500 font-bold uppercase tracking-widest text-sm mb-3 border-b pb-2">
                    <ScrollText size={16} /> The Story
                  </h3>
                  <p className="text-lg text-stone-700 leading-relaxed font-serif">
                    {currentStop.description}
                  </p>
                </div>

                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                  <h3 className="flex items-center gap-2 text-stone-500 font-bold uppercase tracking-widest text-sm mb-3">
                    <Book size={16} /> Theological Insight
                  </h3>
                  <p className="text-stone-600 italic leading-relaxed">
                    "{currentStop.theology}"
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 bg-white border-t border-stone-100 sticky bottom-0">
               {isLastStop ? (
                 <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                   <h3 className="text-green-800 font-bold text-xl font-serif mb-2">Journey Completed!</h3>
                   <p className="text-green-700 mb-4">You have walked the path of faith.</p>
                   <button 
                    onClick={restartGame}
                    className="w-full py-3 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-800 transition-colors shadow-lg"
                   >
                     Select New Journey
                   </button>
                 </div>
               ) : (
                 <button
                   onClick={handleTravelClick}
                   className="w-full py-4 bg-amber-600 text-white rounded-xl font-bold text-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-200 flex items-center justify-center gap-2 group"
                 >
                   Travel to {routeData.stops[currentStepIndex + 1].name}
                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </button>
               )}
            </div>
          </div>
        </main>
      </div>
    );
  };

  return (
    <>
      {gameState === GameState.MENU && renderMenu()}
      {(gameState === GameState.LOADING_ROUTE) && renderLoading()}
      {(gameState === GameState.PLAYING || gameState === GameState.FINISHED || gameState === GameState.QUIZ) && renderGame()}
      
      {gameState === GameState.QUIZ && currentQuiz && (
        <QuizModal 
          quiz={currentQuiz} 
          onCorrect={handleQuizSuccess} 
          onIncorrect={() => {}} // Could implement lives/score here
        />
      )}
    </>
  );
};

export default App;