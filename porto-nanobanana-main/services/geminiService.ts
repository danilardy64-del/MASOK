
import { GoogleGenAI, Type } from "@google/genai";
import { StoryResponse } from "../types";

// Always create a fresh instance of GoogleGenAI before each call to ensure 
// the latest API key (from possible user selection dialogs) is used.
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes an image and returns a creative title and description/prompt using gemini-3-flash-preview.
 */
export const generateStoryFromImage = async (base64Image: string): Promise<StoryResponse> => {
  const ai = getAi();
  
  try {
    // Using gemini-3-flash-preview for general text and analysis tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              // Ensure we only send the base64 data portion
              data: base64Image.includes('base64,') ? base64Image.split('base64,')[1] : base64Image,
            },
          },
          { text: "Analyze this image and provide a creative title and a detailed description/prompt that could have generated it. Return the result in structured JSON format." },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A short, catchy title for the artwork.",
            },
            story: {
              type: Type.STRING,
              description: "A detailed prompt or description of the image content.",
            },
          },
          required: ["title", "story"],
        },
      },
    });

    // Extracting text output from response.text property (not a method).
    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr.trim());

  } catch (e) {
    console.warn("AI Analysis unavailable or failed, using fallback data:", e);
    // FALLBACK: Return default data so the app doesn't crash/alert.
    return {
      title: "Gambar Baru",
      story: "Deskripsi otomatis tidak tersedia. Silakan klik tombol 'Edit' untuk menambahkan deskripsi atau prompt secara manual."
    };
  }
};

/**
 * Generates high-quality images using gemini-3-pro-image-preview.
 */
export const generateImageWithGemini = async (
  prompt: string, 
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4", 
  referenceImage: string | null
): Promise<string> => {
    const ai = getAi();
    
    const parts: any[] = [{ text: prompt }];
    
    // Support for reference style/face images.
    if (referenceImage) {
      parts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: referenceImage.includes('base64,') ? referenceImage.split('base64,')[1] : referenceImage,
        }
      });
    }

    // High-quality generation requires gemini-3-pro-image-preview.
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

    // Iterate through candidates and parts to find the generated image data.
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image was returned by the generation model.");
};
