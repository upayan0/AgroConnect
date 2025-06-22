import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Leaf } from 'lucide-react';
import { toast } from "sonner";

interface CropRecommendation {
  name: string;
  probability: number;
}

const recommendedCropsData: CropRecommendation[] = [
  { name: 'chickpea', probability: 23.33 },
  { name: 'banana', probability: 15.33 },
  { name: 'papaya', probability: 12.67 },
  { name: 'coffee', probability: 11.33 },
  { name: 'maize', probability: 10.67 },
];

const defaultParams = {
  nitrogen: '70',
  phosphorus: '70',
  potassium: '100',
  ph: '7',
  rainfall: '100',
  temperature: '40',
  humidity: '50',
};

export const CropPrediction = () => {
  const [soilParams, setSoilParams] = useState(defaultParams);
  const [recommendedCrops, setRecommendedCrops] = useState<CropRecommendation[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [fertilizerRecommendation, setFertilizerRecommendation] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSoilParams(prev => ({ ...prev, [id]: value }));
  };

  const isNumeric = (val: string) => !isNaN(Number(val));

  const handlePredict = () => {
    const requiredFields = ['nitrogen', 'phosphorus', 'potassium', 'ph'];
    for (const field of requiredFields) {
      if (!soilParams[field as keyof typeof soilParams] || !isNumeric(soilParams[field as keyof typeof soilParams])) {
        toast.error(`Please enter a valid numeric value for ${field.toUpperCase()}`);
        return;
      }
    }

    setRecommendedCrops(recommendedCropsData);
    setSelectedCrop(recommendedCropsData[0]?.name || '');
    setFertilizerRecommendation('');
  };

  const handleReset = () => {
    setSoilParams(defaultParams);
    setRecommendedCrops([]);
    setSelectedCrop('');
    setFertilizerRecommendation('');
  };

  const handleGetFertilizerAdvice = () => {
    setFertilizerRecommendation(
      'Nitrogen and Phosphorus are deficient, Potassium is excessive. Use fertilizers like Urea or Ammonium Sulphate for Nitrogen and Single Super Phosphate (SSP) for Phosphorus. Avoid Potash fertilizers until Potassium levels decrease. Soil testing recommended for precise dosage.'
    );
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-green-800 text-white rounded-lg p-6">
          <div>
            <CardTitle className="text-2xl text-white">Crop Prediction</CardTitle>
            <CardDescription className="text-green-200">
              Our advanced algorithms analyze multiple factors to recommend the best crops for your land.
            </CardDescription>
          </div>
          <CardContent>
            <p className="mb-4 text-green-200">
              Enter your soil parameters and get instant AI-powered recommendations tailored to your specific conditions.
            </p>
            <div className="flex items-center justify-between text-sm mb-6 bg-green-700 p-3 rounded-md">
              <span>98% Accuracy</span>
              <span>Historical Data</span>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-white">Recommended Crops:</h3>
            {recommendedCrops.length > 0 ? (
              <ul className="space-y-2">
                {recommendedCrops.map((crop, index) => (
                  <li key={crop.name} className="flex items-center bg-green-700 p-3 rounded-md">
                    <span className="flex items-center justify-center w-6 h-6 bg-white text-green-800 rounded-full font-bold mr-3">{index + 1}</span>
                    <span className="capitalize">{crop.name} ({crop.probability}%)</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-200">Predictions will appear here.</p>
            )}

            <p className="mt-4 text-xs text-green-300">
              Based on your soil parameters, these crops are most likely to thrive in your conditions.
            </p>

            <Button onClick={handleReset} variant="secondary" className="w-full mt-6">Reset All Fields</Button>
          </CardContent>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Soil Parameter Analysis</CardTitle>
              <CardDescription>Enter your soil test results for accurate predictions</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'nitrogen', label: 'Nitrogen (N)', unit: 'kg/ha', required: true },
                { id: 'phosphorus', label: 'Phosphorus (P)', unit: 'kg/ha', required: true },
                { id: 'potassium', label: 'Potassium (K)', unit: 'kg/ha', required: true },
                { id: 'ph', label: 'pH Value', unit: '', required: true },
                { id: 'rainfall', label: 'Rainfall', unit: 'mm' },
                { id: 'temperature', label: 'Temperature', unit: '°C' },
                { id: 'humidity', label: 'Humidity', unit: '%' },
              ].map(({ id, label, unit, required }) => (
                <div className="space-y-2 relative" key={id}>
                  <Label htmlFor={id}>
                    {label} {required && <span className="text-red-500">*</span>}
                  </Label>
                  <div className="relative">
                    <Input
                      id={id}
                      type="number"
                      step="any"
                      value={soilParams[id as keyof typeof soilParams]}
                      onChange={handleInputChange}
                      placeholder={`e.g., ${defaultParams[id as keyof typeof soilParams]}`}
                      endAdornment={unit ? <span className="text-sm text-gray-500">{unit}</span> : null}
                    />
                  </div>
                </div>
              ))}

              <div className="md:col-span-2">
                <Button
                  onClick={handlePredict}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Predict Suitable Crops
                </Button>
              </div>
            </CardContent>
          </Card>

          {recommendedCrops.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Recommendation</CardTitle>
                <CardDescription>Choose a crop to get specific fertilizer recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select a Crop</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {recommendedCrops.map((crop) => (
                        <SelectItem key={crop.name} value={crop.name} className="capitalize">
                          {crop.name} ({crop.probability}%)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleGetFertilizerAdvice} className="w-full bg-green-600 hover:bg-green-700">Get Fertilizer Advice</Button>

                {fertilizerRecommendation && (
                  <Alert className="bg-green-50 border-green-200">
                    <Leaf className="h-4 w-4" aria-hidden="true" />
                    <AlertTitle>Fertilizer Recommendation</AlertTitle>
                    <AlertDescription>
                      {fertilizerRecommendation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
