import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';

const states = ['West Bengal', 'Punjab', 'Maharashtra', 'Uttar Pradesh'];
const districts = ['Kolkata', 'Howrah', 'Darjeeling', 'Malda'];
const crops = ['Potato', 'Wheat', 'Rice', 'Maize'];
const seasons = ['Rabi', 'Kharif', 'Zaid'];

export const CropProductionForm = ({ onPredict }: { onPredict: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    state: 'West Bengal',
    district: 'Kolkata',
    crop: 'Potato',
    season: 'Rabi',
    area: '100',
    year: '2024',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.area || isNaN(Number(formData.area))) {
      alert('Please enter a valid numeric area in hectares');
      return;
    }
    
    if (!formData.year || isNaN(Number(formData.year))) {
      alert('Please enter a valid year');
      return;
    }

    setIsLoading(true);
    try {
      await onPredict(formData);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Crop Production Prediction</CardTitle>
        <CardDescription>
          Enter crop details to predict yield production
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>State</Label>
            <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {states.map((state, idx) => (
                  <SelectItem key={idx} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>District</Label>
            <Select value={formData.district} onValueChange={(value) => handleChange('district', value)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {districts.map((district, idx) => (
                  <SelectItem key={idx} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Crop</Label>
            <Select value={formData.crop} onValueChange={(value) => handleChange('crop', value)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {crops.map((crop, idx) => (
                  <SelectItem key={idx} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Season</Label>
            <Select value={formData.season} onValueChange={(value) => handleChange('season', value)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {seasons.map((season, idx) => (
                  <SelectItem key={idx} value={season}>{season}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Area (hectares)</Label>
            <Input
              type="number"
              value={formData.area}
              onChange={(e) => handleChange('area', e.target.value)}
              placeholder="e.g., 100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Year</Label>
            <Input
              type="number"
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              placeholder="e.g., 2024"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700" 
              disabled={isLoading}
            >
              {isLoading ? 'Predicting...' : 'Predict'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export const YeildPrediction = () => {
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const handlePredict = async (data: any) => {
    // TODO: Implement prediction logic
    console.log('Prediction data:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction result
    const mockResult = {
      predictedYield: Math.floor(Math.random() * 5000) + 1000, // Random yield between 1000-6000 kg
      confidence: Math.floor(Math.random() * 30) + 70, // Random confidence between 70-100%
      recommendations: [
        "Ensure proper irrigation during critical growth stages",
        "Monitor soil pH levels regularly",
        "Apply recommended fertilizers based on soil test results"
      ]
    };
    
    setPredictionResult(mockResult);
    
    // Show success message
    alert(`Prediction completed! Predicted yield: ${mockResult.predictedYield} kg with ${mockResult.confidence}% confidence.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Yield Prediction</h1>
        <p className="text-gray-600">Predict crop yields based on various parameters</p>
      </div>
      
      <CropProductionForm onPredict={handlePredict} />
      
      {predictionResult && (
        <Card className="w-full max-w-3xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-green-600">Prediction Results</CardTitle>
            <CardDescription>
              Based on your input parameters, here's the predicted yield
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-medium">Predicted Yield:</span>
                <span className="text-2xl font-bold text-green-600">
                  {predictionResult.predictedYield.toLocaleString()} kg
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">Confidence Level:</span>
                <span className="text-xl font-bold text-blue-600">
                  {predictionResult.confidence}%
                </span>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {predictionResult.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
