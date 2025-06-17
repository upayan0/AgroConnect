import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Cloud, 
  CloudRain, 
  CloudSun, 
  Droplets, 
  Sun, 
  Wind, 
  Thermometer, 
  MapPin,
  Search,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { getWeatherData, WeatherData } from '@/services/weatherService';
import { toast } from 'sonner';

const INDIAN_CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow'
];

const WEATHER_ADVISORIES = [
  {
    type: 'Rain Alert',
    message: 'Heavy rainfall expected in the next 24 hours. Take necessary precautions for your crops.',
    severity: 'high',
    icon: CloudRain
  },
  {
    type: 'Temperature Alert',
    message: 'High temperature expected. Ensure proper irrigation for your crops.',
    severity: 'medium',
    icon: Thermometer
  },
  {
    type: 'Wind Alert',
    message: 'Strong winds expected. Secure any loose structures in your farm.',
    severity: 'low',
    icon: Wind
  }
];

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchCity, setSearchCity] = useState('');

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      toast.success(`Weather data updated for ${city}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const handleCitySearch = () => {
    if (searchCity.trim()) {
      setSelectedCity(searchCity);
      setSearchCity('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCitySearch();
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case '02d':
      case '02n':
        return <CloudSun className="h-8 w-8 text-blue-500" />;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case '09d':
      case '09n':
        return <CloudRain className="h-8 w-8 text-blue-600" />;
      case '10d':
      case '10n':
        return <Droplets className="h-8 w-8 text-blue-400" />;
      case '11d':
      case '11n':
        return <CloudRain className="h-8 w-8 text-blue-700" />;
      case '13d':
      case '13n':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case '50d':
      case '50n':
        return <Cloud className="h-8 w-8 text-gray-300" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getWeatherAdvisories = (weatherData: WeatherData) => {
    const advisories = [...WEATHER_ADVISORIES];
    
    // Add dynamic advisories based on current weather
    if (weatherData.temperature > 35) {
      advisories.push({
        type: 'Heat Alert',
        message: 'High temperature alert! Ensure proper irrigation and shade for your crops.',
        severity: 'high',
        icon: Thermometer
      });
    }
    
    if (weatherData.windSpeed > 20) {
      advisories.push({
        type: 'Strong Wind Alert',
        message: 'Strong winds detected. Secure any loose structures and protect young plants.',
        severity: 'medium',
        icon: Wind
      });
    }
    
    if (weatherData.humidity > 80) {
      advisories.push({
        type: 'High Humidity Alert',
        message: 'High humidity levels. Monitor for potential fungal diseases in your crops.',
        severity: 'medium',
        icon: Droplets
      });
    }
    
    return advisories;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Weather Forecast</h1>
        <p className="text-gray-500">Get detailed weather information for your location</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Current Weather</CardTitle>
                <CardDescription>Real-time weather conditions</CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => fetchWeather(selectedCity)}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* City Selection */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search city..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-gray-500">Loading weather data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>{error}</p>
                  <Button
                    variant="outline"
                    onClick={() => fetchWeather(selectedCity)}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              ) : weatherData ? (
                <>
                  {/* Current Weather */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getWeatherIcon(weatherData.icon)}
                        <div>
                          <h3 className="text-2xl font-bold">{weatherData.temperature}°C</h3>
                          <p className="text-gray-600 capitalize">{weatherData.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedCity}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 mt-2">
                          <Wind className="h-4 w-4" />
                          <span>{weatherData.windSpeed} km/h</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 mt-2">
                          <Droplets className="h-4 w-4" />
                          <span>{weatherData.humidity}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forecast */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">3-Day Forecast</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                          <p className="font-medium mb-2">{day.date}</p>
                          <div className="flex justify-center mb-2">
                            {getWeatherIcon(day.icon)}
                          </div>
                          <p className="text-lg font-bold">{day.temperature}°C</p>
                          <p className="text-sm text-gray-500 capitalize">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* Weather Advisories */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Advisories</CardTitle>
            <CardDescription>Important weather alerts and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weatherData ? getWeatherAdvisories(weatherData).map((advisory, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    advisory.severity === 'high' ? 'bg-red-100' :
                    advisory.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <advisory.icon className={`h-5 w-5 ${
                      advisory.severity === 'high' ? 'text-red-500' :
                      advisory.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{advisory.type}</h4>
                    <p className="text-sm text-gray-600">{advisory.message}</p>
                  </div>
                </div>
              )) : WEATHER_ADVISORIES.map((advisory, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    advisory.severity === 'high' ? 'bg-red-100' :
                    advisory.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <advisory.icon className={`h-5 w-5 ${
                      advisory.severity === 'high' ? 'text-red-500' :
                      advisory.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{advisory.type}</h4>
                    <p className="text-sm text-gray-600">{advisory.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 