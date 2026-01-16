import React from 'react';
import { BriefContext } from '../types';
import { CONTEXT_OPTIONS } from '../constants';
import { Wand2, AlertCircle } from 'lucide-react';

interface BriefInputProps {
  rawText: string;
  setRawText: (text: string) => void;
  context: BriefContext;
  setContext: (ctx: BriefContext) => void;
  onClean: () => void;
  isProcessing: boolean;
}

export const BriefInput: React.FC<BriefInputProps> = ({
  rawText,
  setRawText,
  context,
  setContext,
  onClean,
  isProcessing,
}) => {
  const isButtonDisabled = rawText.trim().length < 10 || isProcessing;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full no-print">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Project Context
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CONTEXT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setContext(option.value)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                context === option.value
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <span>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow flex flex-col min-h-[300px]">
        <label htmlFor="raw-input" className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
          <span>Raw Brief</span>
          <span className="text-xs font-normal text-gray-500">Paste email, chat logs, or notes</span>
        </label>
        <textarea
          id="raw-input"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="e.g., We need a modern website for a sports company. Something dynamic, not too expensive, needed soon. We like blue..."
          className="w-full flex-grow p-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none text-gray-700 text-base leading-relaxed placeholder:text-gray-400"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={onClean}
          disabled={isButtonDisabled}
          className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-white font-semibold shadow-md transition-all ${
            isButtonDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.99]'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyze & Structure...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Clean Brief</span>
            </>
          )}
        </button>
        {rawText.length > 0 && rawText.length < 10 && (
          <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Please enter at least 10 characters.
          </p>
        )}
      </div>
    </div>
  );
};
