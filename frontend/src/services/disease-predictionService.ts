// Plant Disease Prediction API call
export const predictPlantDisease = async (imageFile: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', imageFile);
  
    // Update the URL if your backend is hosted elsewhere
    const API_URL = 'http://localhost:8000/predict/';
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Prediction API error: ' + response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.error('Error predicting plant disease:', error);
      throw error;
    }
  }; 