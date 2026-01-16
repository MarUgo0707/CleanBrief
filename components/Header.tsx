import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">BriefCleaner</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Turn chaos into clarity</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
             Powered by <span className="font-semibold text-indigo-600">Gemini 3.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};
