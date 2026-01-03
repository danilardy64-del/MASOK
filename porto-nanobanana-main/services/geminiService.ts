
import { GoogleGenAI, Type } from "@google/genai";
import { StoryResponse } from "../types";

const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStoryFromImage = async (base64Image: string): Promise<StoryResponse> => {
  const ai = getAi();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.includes('base64,') ? base64Image.split('base64,')[1] : base64Image,
            },
          },
          { text: "Analyze this image and provide a creative title and a detailed prompt in BOTH Indonesian and English. Return the result in a structured JSON format with 'id' and 'en' keys." },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                story: { type: Type.STRING },
              },
              required: ["title", "story"],
            },
            en: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                story: { type: Type.STRING },
              },
              required: ["title", "story"],
            }
          },
          required: ["id", "en"],
        },
      },
    });

    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr.trim());

  } catch (e) {
    console.warn("AI Analysis unavailable, using fallback data:", e);
    return {
      id: {
        title: "Gambar Baru",
        story: "Deskripsi otomatis tidak tersedia. Silakan edit secara manual."
      },
      en: {
        title: "New Image",
        story: "Automatic description unavailable. Please edit manually."
      }
    };
  }
};

export const generateImageWithGemini = async (
  prompt: string, 
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4", 
  referenceImage: string | null
): Promise<string> => {
    const ai = getAi();
    const parts: any[] = [{ text: prompt }];
    if (referenceImage) {
      parts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: referenceImage.includes('base64,') ? referenceImage.split('base64,')[1] : referenceImage,
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: "1K"
        }
      },
    });

    for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image returned.");
};
