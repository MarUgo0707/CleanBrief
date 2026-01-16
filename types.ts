export enum BriefContext {
  FREELANCE = 'Freelance Client',
  SCHOOL = 'School Project',
  INTERNAL = 'Internal Team',
  PERSONAL = 'Personal Project',
}

export interface Constraints {
  technical: string[];
  timeline: string[];
  budget: string[];
}

export interface StructuredBrief {
  summary: string;
  objectives: string[];
  targetAudience: string;
  deliverables: string[];
  constraints: Constraints;
  ambiguities: string[]; // Questions to clarify
  assumptions: string[];
  risks: string[];
}

export type ProcessingStatus = 'idle' | 'loading' | 'success' | 'error';
