import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, Language, Cuisine, MealType, ChatMessage } from "../types";

export const fileToGenerativePart = async (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const mimeType = base64String.split(';')[0].split(':')[1];
      const data = base64String.split(',')[1];
      resolve({ mimeType, data });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeFridgeImage = async (
  base64Image: string,
  mimeType: string,
  dietaryPreferences: string[],
  language: Language,
  cuisine: Cuisine,
  mealType: MealType
): Promise<Recipe[]> => {
  // Initialize right before call to ensure environment variables are loaded
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";

  const systemInstruction = `You are a professional culinary AI assistant.
    Context:
    - User meal preference: ${mealType === 'Any' ? 'general meal' : mealType}
    - Preferred cuisine: ${cuisine}
    - Target language for output: ${language}
    - Dietary restrictions: ${dietaryPreferences.length > 0 ? dietaryPreferences.join(', ') : 'None'}`;

  const prompt = `
    Analyze this image of a refrigerator or food ingredients.
    TASKS:
    1. Identify all visible ingredients.
    2. Suggest 4-6 creative recipes based on these ingredients and the ${cuisine} cuisine style.
    3. STRICTLY respect these dietary filters: ${dietaryPreferences.join(', ')}.
    4. Provide clear, step-by-step instructions in ${language}.
    Return the result as a valid JSON array of recipe objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType, data: base64Image } },
          { text: prompt },
        ],
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              prepTime: { type: Type.STRING },
              calories: { type: Type.INTEGER },
              cuisine: { type: Type.STRING },
              youtubeQuery: { type: Type.STRING },
              chefsSecret: { type: Type.STRING },
              beveragePairing: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "description"]
              },
              dietaryTags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    quantity: { type: Type.STRING },
                    isAvailable: { type: Type.BOOLEAN }
                  },
                  required: ["name", "quantity", "isAvailable"]
                }
              },
              instructions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "description", "difficulty", "prepTime", "ingredients", "instructions"]
          }
        }
      }
    });

    const resultText = response.text;
    if (resultText) {
      const recipes = JSON.parse(resultText.trim()) as Recipe[];
      return recipes.map((r, idx) => ({ 
        ...r, 
        id: r.id || `recipe-${idx}-${Date.now()}`,
        dietaryTags: r.dietaryTags || [],
        calories: r.calories || 0,
        chefsSecret: r.chefsSecret || "Chef's tip: Prep with precision for perfect results.",
        beveragePairing: r.beveragePairing || { name: "Water", description: "Clean and refreshing." }
      }));
    }
    return [];
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return [];
  }
};

export const chatWithChef = async (
  history: ChatMessage[],
  userMessage: string,
  contextRecipes: Recipe[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview";
  
  const recipeContext = contextRecipes.length > 0 
    ? `The user is currently considering these recipes: ${contextRecipes.map(r => r.title).join(', ')}.`
    : "The user has not scanned any ingredients yet.";

  const systemInstruction = `You are a professional, friendly, and encouraging world-class Chef Assistant. 
    ${recipeContext}
    Provide helpful cooking tips, ingredient substitutions, and answers to culinary questions. 
    Keep your tone professional yet accessible.`;

  try {
     const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction
      }
    });
    
    return response.text || "I'm here to help with your cooking journey!";
  } catch (error) {
    console.error("Chat Failed:", error);
    return "I'm having a little trouble in the kitchen right now. Let's try again in a moment!";
  }
};