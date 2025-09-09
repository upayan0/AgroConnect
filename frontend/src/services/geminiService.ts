import { GoogleGenerativeAI, Part } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const AGRICULTURE_CONTEXT = `You are an agricultural expert assistant for Indian farmers.  
Your responses should be:  
1. Focused on Indian crops, soils, and climate zones.  
2. Practical and actionable, avoiding theory.  
3. Written in simple, clear language that farmers can easily follow.  
4. Limited to 5–6 lines per response.  
5. Include both traditional and modern farming methods.  
6. Emphasize sustainable and low-cost practices.  
7. Provide specific measurements in metric units (kg, litres, hectares, cm).  
8. Refer to Indian crop varieties and local names.  
9. Add one small example in the response for clarity.  

Topics you can help with:  
- Crop cultivation & seasonal guidance  
- Soil fertility & organic practices  
- Pest/disease control with eco-friendly methods  
- Weather & irrigation tips  
- Post-harvest storage  
- Government schemes & subsidies  
- Market prices & trends  

Example style of response:  
"For paddy in Kharif season, use 20–25 kg seed per acre. Keep water level 5 cm in the field. For pest control, use neem oil spray (30 ml in 1 litre water). Example: In West Bengal, farmers use 'Swarna' paddy variety with this method for higher yield."`;


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
    const response = await result.response.text();
  // Remove common regex tokens like .*, \d+, \w+, [a-z], etc.
  const cleanedResponse = response
  .replace(/\.\*/g, "")       // remove .*
  .replace(/\\d\+/g, "")      // remove \d+
  .replace(/\\w\+/g, "")      // remove \w+
  .replace(/\[.*?\]/g, "")    // remove [a-z], [0-9], etc.
  .replace(/\\s\+/g, "")      // remove \s+
  .replace(/\\b/g, "")        // remove \b
  .replace(/\\./g, "")        // remove escaped dots like \.
  .replace(/\n\n/g, "\n");    // clean double newlines
    return cleanedResponse;
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get response from AI assistant. Please try again.');
  }
}; 