
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, Language, Cuisine, MealType, ChatMessage } from "../types";

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
  // Use the recommended model for complex reasoning and image analysis.
  const model = "gemini-3-pro-preview";

  const prompt = `
    Analyze this image of a refrigerator or food ingredients.
    
    CONTEXT:
    - User wants to cook a ${mealType === 'Any' ? 'meal' : mealType}.
    - Preferred Cuisine Style: ${cuisine}.
    - Output Language: ${language}.
    
    TASKS:
    1. Identify visible ingredients.
    2. Suggest 4-6 recipes based on PREFERRED CUISINE (${cuisine}).
    3. STRICTLY follow dietary filters: ${dietaryPreferences.join(', ')}.
    4. For each recipe, list ALL required ingredients. 
    5. Provide concise step-by-step instructions in ${language}.
    6. Generate specific "youtubeQuery" and "beveragePairing".

    Return data in strict JSON format.
  `;

  try {
    // Call generateContent directly using the ai.models.generateContent pattern.
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          parts: [
            { inlineData: { mimeType, data: base64Image } },
            { text: prompt },
          ],
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
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
            required: ["id", "title", "description", "difficulty", "prepTime", "calories", "ingredients", "instructions", "dietaryTags", "beveragePairing", "chefsSecret"]
          }
        }
      }
    });

    // Access text property directly from GenerateContentResponse.
    if (response.text) {
      const recipes = JSON.parse(response.text) as Recipe[];
      return recipes.map((r, idx) => ({ ...r, id: r.id || `recipe-${idx}-${Date.now()}` }));
    }
    return [];
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};

export const chatWithChef = async (
  history: ChatMessage[],
  userMessage: string,
  contextRecipes: Recipe[]
): Promise<string> => {
  // Use gemini-3-flash-preview for basic text tasks/chat.
  const model = "gemini-3-flash-preview";
  const recipeContext = contextRecipes.length > 0 
    ? `The user is looking at: ${contextRecipes.map(r => r.title).join(', ')}.`
    : "The user hasn't scanned their fridge yet.";

  try {
     const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: `System: You are a professional, friendly Chef Assistant. ${recipeContext}` }] },
        ...history.map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
    });
    // Access text property directly.
    return response.text || "I'm not sure, but let's get cooking!";
  } catch (error) {
    console.error("Chat Failed:", error);
    return "Sorry, I'm having trouble connecting right now.";
  }
};
