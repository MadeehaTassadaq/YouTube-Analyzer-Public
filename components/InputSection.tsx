import React, { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center py-16 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
        YouTube Video <br />
        <span className="text-red-500">Analyzer Web App</span>
      </h1>
      <p className="text-gray-400 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
        Paste a video link below to get a summarized output, main points, main topics, and strategic insights via our n8n backend.
      </p>
      
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto group">
        <div className="absolute inset-0 bg-red-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        <div className="relative flex items-center bg-gray-800 border border-gray-700 rounded-2xl p-3 shadow-2xl focus-within:border-red-500/50 focus-within:ring-2 focus-within:ring-red-500/20 transition-all duration-300">
          <Search className="ml-4 w-7 h-7 text-gray-500" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL here..."
            className="w-full bg-transparent border-none text-white placeholder-gray-500 text-xl h-14 px-4 focus:outline-none focus:ring-0"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 flex-shrink-0
              ${isLoading || !url.trim() 
                ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transform hover:-translate-y-0.5'}
            `}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
            <span className="hidden sm:inline">{isLoading ? 'Analyzing...' : 'Analyze'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};