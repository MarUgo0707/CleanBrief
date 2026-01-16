import React, { useState } from 'react';
import { Header } from './components/Header';
import { BriefInput } from './components/BriefInput';
import { BriefOutput } from './components/BriefOutput';
import { BriefContext, ProcessingStatus, StructuredBrief } from './types';
import { cleanBrief } from './services/geminiService';
import { FileText, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [rawText, setRawText] = useState('');
  const [context, setContext] = useState<BriefContext>(BriefContext.FREELANCE);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<StructuredBrief | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClean = async () => {
    if (!rawText.trim()) return;

    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const data = await cleanBrief(rawText, context);
      setResult(data);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setError(err.message || "An unexpected error occurred while processing the brief.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900">
      <Header />

      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full min-h-[calc(100vh-140px)]">
          
          {/* Input Section */}
          <div className="flex flex-col h-full">
            <BriefInput
              rawText={rawText}
              setRawText={setRawText}
              context={context}
              setContext={setContext}
              onClean={handleClean}
              isProcessing={status === 'loading'}
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col h-full min-h-[400px]">
            {status === 'error' && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      <strong className="font-bold">Error:</strong> {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {status === 'idle' && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-12 text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <FileText className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-500">Ready to clean</h3>
                <p className="max-w-xs mt-2 text-sm">
                  Paste your project notes on the left and hit "Clean Brief" to see the magic happen.
                </p>
              </div>
            )}

            {status === 'loading' && (
               <div className="h-full flex flex-col items-center justify-center border border-gray-200 rounded-xl bg-white p-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600">
                      <FileText className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-6 text-indigo-900 font-medium animate-pulse">Analyzing requirements...</p>
                  <p className="mt-2 text-sm text-gray-500">Identifying ambiguities & technical needs</p>
               </div>
            )}

            {status === 'success' && result && (
              <BriefOutput data={result} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
