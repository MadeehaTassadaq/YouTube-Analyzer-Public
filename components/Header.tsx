import React from 'react';
import { Youtube, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-600/20">
            <Youtube className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            YouTube Analyzer
          </span>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};