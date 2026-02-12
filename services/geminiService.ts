
import { GoogleGenAI, Type } from "@google/genai";
import { InsightData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyInsight = async (username: string): Promise<InsightData | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a personalized greeting, a short motivational tech quote, and a useful coding tip for a developer named ${username}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING },
            author: { type: Type.STRING },
            tip: { type: Type.STRING }
          },
          required: ["quote", "author", "tip"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as InsightData;
    }
    return null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
