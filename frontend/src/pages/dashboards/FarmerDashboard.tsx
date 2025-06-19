import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  BarChart3,
  Leaf,
  ShoppingCart,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Activity,
  BookOpen,
  MessageCircle,
  ArrowRight,
  Cloud,
  CloudSun
} from 'lucide-react';
import { getWeatherData, WeatherData } from '../../services/weatherService';
import { WeatherWidget } from '../../components/weather/WeatherWidget';

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const listings = [
    { id: '1', name: 'Organic Tomatoes', stock: 150, sold: 75, price: 2.50, status: 'active' },
    { id: '2', name: 'Fresh Carrots', stock: 25, sold: 180, price: 1.80, status: 'low_stock' },
    { id: '3', name: 'Wheat Seeds', stock: 0, sold: 50, price: 4.50, status: 'out_of_stock' }
  ];

  const marketPrices = [
    { crop: 'Tomatoes', current: 2.50, change: '+12%', trend: 'up' },
    { crop: 'Wheat', current: 1.80, change: '-5%', trend: 'down' },
    { crop: 'Rice', current: 1.45, change: '+8%', trend: 'up' },
    { crop: 'Carrots', current: 1.20, change: '+3%', trend: 'up' }
  ];

  const advisoryAlerts = [
    { type: 'disease', message: 'Late blight detected in tomato farms nearby', severity: 'high' },
    { type: 'weather', message: 'Heavy rain expected in 2 days', severity: 'medium' },
    { type: 'fertilizer', message: 'Optimal time for nitrogen application', severity: 'low' }
  ];

  const monthlyEarnings = 1250.75;
  const totalListings = 12;
  const lowStockAlerts = 3;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockPercentage = (stock: number, sold: number) => {
    const total = stock + sold;
    return total > 0 ? (stock / total) * 100 : 0;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Mock data for crop advisory
  const cropAdvisory = [
    {
      id: 1,
      crop: 'Wheat',
      status: 'Healthy',
      advice: 'Continue regular irrigation schedule',
      priority: 'low'
    },
    {
      id: 2,
      crop: 'Rice',
      status: 'Needs Attention',
      advice: 'Check for signs of bacterial blight',
      priority: 'high'
    },
    {
      id: 3,
      crop: 'Cotton',
      status: 'Healthy',
      advice: 'Monitor for bollworm activity',
      priority: 'medium'
    }
  ];

  // Mock data for learning progress
  const learningProgress = [
    {
      module: 'Modern Farming Techniques',
      progress: 75,
      nextLesson: 'Smart Irrigation Systems'
    },
    {
      module: 'Crop Management',
      progress: 45,
      nextLesson: 'Pest Control Methods'
    },
    {
      module: 'Market Insights',
      progress: 30,
      nextLesson: 'Price Forecasting'
    }
  ];

  // Mock data for market value
  const marketValue = {
    total: '₹2,50,000',
    crops: [
      { name: 'Wheat', value: '₹75,000', quantity: '30 quintals' },
      { name: 'Rice', value: '₹1,20,000', quantity: '25 quintals' },
      { name: 'Cotton', value: '₹55,000', quantity: '15 quintals' }
    ]
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return Sun;
      case '02d':
      case '02n':
        return CloudSun;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return Cloud;
      case '09d':
      case '09n':
        return CloudRain;
      case '10d':
      case '10n':
        return Droplets;
      case '11d':
      case '11n':
        return CloudRain;
      case '13d':
      case '13n':
        return Cloud;
      case '50d':
      case '50n':
        return Cloud;
      default:
        return Sun;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Farmer!</h1>
        <p className="text-gray-500">Here's what's happening with your farm today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">2 crops ready for harvest</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-gray-500">2 modules completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,000</div>
            <p className="text-xs text-gray-500">+₹5,000 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advisories</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">New alerts today</p>
          </CardContent>
        </Card>
      </div>

      {/* Weather and Advisory Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        
        {/* Crop Advisory */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Advisory</CardTitle>
            <CardDescription>Important updates for your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cropAdvisory.map((advisory, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    advisory.priority === 'high' ? 'bg-red-100' :
                    advisory.priority === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      advisory.priority === 'high' ? 'text-red-500' :
                      advisory.priority === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{advisory.crop}</h4>
                    <p className="text-sm text-gray-600">{advisory.advice}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Track your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningProgress.map((module, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{module.module}</h4>
                  <span className="text-sm text-gray-500">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
            ))}
            <Button className="w-full">
              Continue Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
          <BookOpen className="h-6 w-6 mb-2" />
          <span>Learning Module</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
          <Cloud className="h-6 w-6 mb-2" />
          <span>Weather Forecast</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
          <Leaf className="h-6 w-6 mb-2" />
          <span>Crop Advisory</span>
        </Button>
      </div>
    </div>
  );
};
