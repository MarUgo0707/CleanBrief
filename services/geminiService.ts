import { GoogleGenAI, Type } from "@google/genai";
import { BriefContext, StructuredBrief } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

export const cleanBrief = async (
  rawText: string,
  context: BriefContext
): Promise<StructuredBrief> => {
  const ai = getClient();
  
  const prompt = `
    Context: ${context}
    
    Raw Input Brief:
    "${rawText}"
    
    Analyze this input and generate a structured brief.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { 
            type: Type.STRING, 
            description: "A clear 3-4 line summary of the project." 
          },
          objectives: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Concise list of main goals."
          },
          targetAudience: { 
            type: Type.STRING, 
            description: "Description of the target users."
          },
          deliverables: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Concrete items to be delivered."
          },
          constraints: {
            type: Type.OBJECT,
            properties: {
              technical: { type: Type.ARRAY, items: { type: Type.STRING } },
              timeline: { type: Type.ARRAY, items: { type: Type.STRING } },
              budget: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["technical", "timeline", "budget"]
          },
          ambiguities: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Crucial questions that must be answered to proceed."
          },
          assumptions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Sensible defaults taken due to missing info."
          },
          risks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Potential project risks (scope creep, unrealistic timeline)."
          }
        },
        required: [
          "summary",
          "objectives",
          "targetAudience",
          "deliverables",
          "constraints",
          "ambiguities",
          "assumptions",
          "risks"
        ]
      }
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response generated from Gemini.");
  }

  try {
    return JSON.parse(text) as StructuredBrief;
  } catch (e) {
    console.error("Failed to parse JSON response", e);
    throw new Error("The AI generated an invalid format. Please try again.");
  }
};
