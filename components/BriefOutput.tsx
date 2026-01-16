import React from 'react';
import { StructuredBrief } from '../types';
import { 
  Target, 
  Users, 
  Package, 
  AlertTriangle, 
  HelpCircle, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Download 
} from 'lucide-react';

interface BriefOutputProps {
  data: StructuredBrief | null;
}

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; color?: string }> = ({ icon, title, color = "text-gray-800" }) => (
  <h3 className={`text-lg font-bold flex items-center gap-2 mb-3 mt-6 ${color} border-b border-gray-100 pb-2`}>
    {icon}
    {title}
  </h3>
);

const ListItems: React.FC<{ items: string[] }> = ({ items }) => {
  if (!items || items.length === 0) return <p className="text-gray-500 italic text-sm">None identified.</p>;
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export const BriefOutput: React.FC<BriefOutputProps> = ({ data }) => {
  if (!data) return null;

  const handleCopyMarkdown = () => {
    const md = `
# Project Brief

## Summary
${data.summary}

## Objectives
${data.objectives.map(i => `- ${i}`).join('\n')}

## Target Audience
${data.targetAudience}

## Deliverables
${data.deliverables.map(i => `- ${i}`).join('\n')}

## Constraints
### Technical
${data.constraints.technical.map(i => `- ${i}`).join('\n')}
### Timeline
${data.constraints.timeline.map(i => `- ${i}`).join('\n')}
### Budget
${data.constraints.budget.map(i => `- ${i}`).join('\n')}

## Clarifications Needed
${data.ambiguities.map(i => `- ${i}`).join('\n')}

## Assumptions
${data.assumptions.map(i => `- ${i}`).join('\n')}

## Risks
${data.risks.map(i => `- ${i}`).join('\n')}
    `;
    navigator.clipboard.writeText(md);
    alert('Brief copied to clipboard as Markdown!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print-content h-full">
      {/* Toolbar - Hidden on Print */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center no-print">
        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Structured Output</span>
        <div className="flex gap-2">
          <button 
            onClick={handleCopyMarkdown}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
            title="Copy as Markdown"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button 
            onClick={handlePrint}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
            title="Print / Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-h-[800px] overflow-y-auto print:max-h-none print:overflow-visible custom-scrollbar">
        {/* Header Summary */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 mb-8">
          <h2 className="text-indigo-900 font-bold text-lg mb-2">Executive Summary</h2>
          <p className="text-indigo-800 leading-relaxed text-sm sm:text-base">
            {data.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          
          {/* Left Column: Scope */}
          <div>
            <SectionHeader icon={<Target className="w-5 h-5 text-indigo-600" />} title="Objectives" />
            <ListItems items={data.objectives} />

            <SectionHeader icon={<Users className="w-5 h-5 text-indigo-600" />} title="Target Audience" />
            <p className="text-gray-700 text-sm leading-relaxed">{data.targetAudience}</p>

            <SectionHeader icon={<Package className="w-5 h-5 text-indigo-600" />} title="Deliverables" />
            <ListItems items={data.deliverables} />
          </div>

          {/* Right Column: Constraints & Reality Check */}
          <div>
            <SectionHeader icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />} title="Constraints" />
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Technical</span>
                <ListItems items={data.constraints.technical} />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Timeline</span>
                <ListItems items={data.constraints.timeline} />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Budget</span>
                <ListItems items={data.constraints.budget} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Critical Clarifications Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-3">
              <HelpCircle className="w-4 h-4" /> Ambiguities (Ask Client)
            </h4>
            <ul className="list-disc list-inside space-y-2 text-amber-900 text-sm">
              {data.ambiguities.map((item, idx) => <li key={idx} className="leading-snug">{item}</li>)}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
             <h4 className="flex items-center gap-2 text-blue-800 font-bold text-sm mb-3">
              <AlertTriangle className="w-4 h-4" /> Assumptions Taken
            </h4>
            <ul className="list-disc list-inside space-y-2 text-blue-900 text-sm">
              {data.assumptions.map((item, idx) => <li key={idx} className="leading-snug">{item}</li>)}
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
             <h4 className="flex items-center gap-2 text-red-800 font-bold text-sm mb-3">
              <ShieldAlert className="w-4 h-4" /> Potential Risks
            </h4>
            <ul className="list-disc list-inside space-y-2 text-red-900 text-sm">
              {data.risks.map((item, idx) => <li key={idx} className="leading-snug">{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
