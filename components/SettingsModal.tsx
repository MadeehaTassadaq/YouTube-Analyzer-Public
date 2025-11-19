import React, { useState, useEffect } from 'react';
import { X, Save, Link2 } from 'lucide-react';
import { WebhookConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WebhookConfig;
  onSave: (config: WebhookConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, config, onSave }) => {
  const [url, setUrl] = useState(config.url);
  const [useMock, setUseMock] = useState(config.useMock);

  useEffect(() => {
    if (isOpen) {
      setUrl(config.url);
      setUseMock(config.useMock);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ url, useMock });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-800/50">
          <h3 className="text-xl font-semibold text-white">Settings</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Mode Toggle */}
          <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700">
            <div>
              <div className="text-white font-medium">Demo Mode</div>
              <div className="text-xs text-gray-400">Use mock data without connecting to n8n</div>
            </div>
            <button
              onClick={() => setUseMock(!useMock)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${useMock ? 'bg-red-500' : 'bg-gray-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${useMock ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Webhook Input */}
          <div className={`space-y-2 transition-opacity duration-200 ${useMock ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              n8n Webhook URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://primary.n8n.cloud/webhook/..."
              className="w-full bg-gray-950 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
            <p className="text-xs text-gray-500">
              The endpoint must accept a POST request with a JSON body: <code>{`{ "url": "..." }`}</code>
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-800/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};