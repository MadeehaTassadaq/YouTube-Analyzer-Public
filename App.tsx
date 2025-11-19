import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsDashboard } from './components/ResultsDashboard';
import { SettingsModal } from './components/SettingsModal';
import { analyzeVideo } from './services/api';
import { AnalysisResult, WebhookConfig } from './types';
import { DEFAULT_WEBHOOK_KEY, DEFAULT_WEBHOOK_URL } from './constants';

const App: React.FC = () => {
  const [config, setConfig] = useState<WebhookConfig>(() => {
    const saved = localStorage.getItem(DEFAULT_WEBHOOK_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If user has a saved config but empty URL, use the new default
        if (!parsed.url) {
           return { url: DEFAULT_WEBHOOK_URL, useMock: false };
        }
        return parsed;
      } catch (e) {
        // fallback if parse error
      }
    }
    // Default to the provided n8n webhook
    return { url: DEFAULT_WEBHOOK_URL, useMock: false };
  });

  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(DEFAULT_WEBHOOK_KEY, JSON.stringify(config));
  }, [config]);

  const handleAnalyze = async (url: string) => {
    setYoutubeUrl(url);
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeVideo(url, config);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black text-gray-100 pb-20">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="pt-6">
        {!result && !isLoading && (
          <div className="min-h-[60vh] flex flex-col justify-center">
            <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            {/* Instructions / Hints if empty */}
            {!error && (
              <div className="text-center mt-12 opacity-50">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Supported Features</div>
                <div className="flex justify-center gap-8 text-sm text-gray-400 flex-wrap px-4">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    AI Summarization
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Main Points
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    Key Insights
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {(isLoading || result) && (
            <div className="container mx-auto">
                 {/* Compact Search Bar when results are shown */}
                {result && (
                    <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-4">
                         <button 
                           onClick={() => setResult(null)} 
                           className="text-sm text-gray-400 hover:text-white flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:border-gray-500 transition-all"
                         >
                            ← Analyze another video
                         </button>
                    </div>
                )}

                {isLoading && (
                  <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                    <p className="mt-6 text-lg font-medium text-gray-300 animate-pulse">
                      Connecting to n8n & analyzing video...
                    </p>
                    <p className="mt-2 text-sm text-gray-500">Extracting summary, topics, and insights.</p>
                  </div>
                )}

                {result && !isLoading && (
                  <ResultsDashboard data={result} youtubeUrl={youtubeUrl} />
                )}
            </div>
        )}

        {/* Error Toast */}
        {error && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in zoom-in-95">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-white">×</button>
          </div>
        )}
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        config={config}
        onSave={setConfig}
      />
    </div>
  );
};

export default App;