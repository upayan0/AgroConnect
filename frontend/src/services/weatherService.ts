const API_KEY = '7ea652455aa73a976be1ed9ed9eb03e4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  forecast: {
    date: string;
    temperature: number;
    description: string;
    icon: string;
  }[];
}

export const getWeatherData = async (city: string = 'Mumbai'): Promise<WeatherData> => {
  try {
    // Get current weather
    const currentWeatherResponse = await fetch(
      `${BASE_URL}/weather?q=${city},IN&units=metric&appid=${API_KEY}`
    );
    
    if (!currentWeatherResponse.ok) {
      throw new Error(`Weather API error: ${currentWeatherResponse.statusText}`);
    }
    
    const currentWeather = await currentWeatherResponse.json();

    // Get 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city},IN&units=metric&appid=${API_KEY}`
    );
    
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error: ${forecastResponse.statusText}`);
    }
    
    const forecast = await forecastResponse.json();

    // Process current weather
    const currentData = {
      temperature: Math.round(currentWeather.main.temp),
      humidity: currentWeather.main.humidity,
      windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
      description: currentWeather.weather[0].description,
      icon: currentWeather.weather[0].icon,
    };

    // Process forecast data (daily averages)
    const dailyForecasts = forecast.list.reduce((acc: any[], item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      const existingDay = acc.find(day => day.date === date);
      
      if (existingDay) {
        existingDay.temperature = Math.round((existingDay.temperature + item.main.temp) / 2);
      } else {
        acc.push({
          date,
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        });
      }
      return acc;
    }, []).slice(0, 3); // Get next 3 days

    return {
      ...currentData,
      forecast: dailyForecasts,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
}; 