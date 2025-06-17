import { GoogleGenerativeAI, Part } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const AGRICULTURE_CONTEXT = `You are an agricultural expert assistant for Indian farmers. 
Your responses should be:
1. Specific to Indian agriculture and farming practices
2. Practical and actionable
3. Consider local climate and conditions
4. Include both traditional and modern farming methods
5. Focus on sustainable practices
6. Use simple, clear language
7. Include specific measurements in metric units
8. Reference Indian crop varieties and local names when relevant

Topics you can help with:
- Crop cultivation and management
- Soil health and fertility
- Pest and disease control
- Weather impact on farming
- Market prices and trends
- Organic farming methods
- Irrigation techniques
- Post-harvest management
- Government schemes and subsidies
- Agricultural technology`;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: AGRICULTURE_CONTEXT }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I will provide agricultural advice specific to Indian farming practices, considering local conditions and using clear, practical language." }],
        },
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get response from AI assistant. Please try again.');
  }
}; 