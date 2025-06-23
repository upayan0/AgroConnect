import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search, Upload, MessageCircle, Leaf, Bug, Zap } from 'lucide-react';
import diseasesData from '../../data/diseases.json';
import { predictPlantDisease } from '../../services/disease-predictionService';

export const Advisory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const diseases = diseasesData.diseases;
  
  const crops = [...new Set(diseases.map(disease => disease.crop))];
  
  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCrop = selectedCrop === 'all' || disease.crop === selectedCrop;
    
    return matchesSearch && matchesCrop;
  });

  const getTreatmentTypeIcon = (type: string) => {
    switch (type) {
      case 'fungicide': return <Bug className="h-4 w-4 text-red-500" />;
      case 'fertilizer': return <Leaf className="h-4 w-4 text-green-500" />;
      default: return <Zap className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTreatmentTypeColor = (type: string) => {
    switch (type) {
      case 'fungicide': return 'bg-red-100 text-red-800';
      case 'fertilizer': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPrediction(null);
      setError(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePredict = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await predictPlantDisease(selectedImage);
      setPrediction(result);
    } catch (err: any) {
      setError(err.message || 'Prediction failed.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (selectedImage) {
      handlePredict();
    }
    // eslint-disable-next-line
  }, [selectedImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Plant Disease Advisory</h1>
        <p className="text-gray-600">Get expert advice on plant diseases and treatment recommendations</p>
      </div>

      {/* Disease Detection Upload */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5 text-green-600" />
            Disease Detection
          </CardTitle>
          <CardDescription>
            Upload a photo of your affected plant for AI-powered disease identification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your plant image here, or click to browse
            </p>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <Button onClick={handleUploadClick} disabled={loading}>
              <Upload className="mr-2 h-4 w-4" />
              {loading ? 'Predicting...' : 'Upload Image'}
            </Button>
            {selectedImage && (
              <div className="mt-4 flex justify-center">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded plant"
                  className="max-h-48 rounded shadow border"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {prediction && (
              <div className="mt-4 p-4 border rounded bg-green-50">
                <div><strong>Predicted Disease:</strong> {prediction.predicted_class}</div>
                <div><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</div>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Supported formats: JPG, PNG, GIF (max 10MB)
          </p>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search diseases, crops, or symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Crops</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Disease Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => (
          <Card key={disease.id} className="hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              {/* <Leaf className="h-16 w-16 text-gray-400" /> */}
              <img 
                src={disease.image} 
                alt={disease.name} 
                className="h-full w-full object-cover rounded-t-lg"
              />
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{disease.name}</CardTitle>
                <Badge variant="outline">{disease.crop}</Badge>
              </div>
              <CardDescription className="text-sm">
                {disease.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Symptoms */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Symptoms:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {disease.symptoms.slice(0, 3).map((symptom, index) => (
                      <li key={index}>• {symptom}</li>
                    ))}
                  </ul>
                </div>

                {/* Treatment Types */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Available Treatments:</h4>
                  <div className="flex flex-wrap gap-2">
                    {disease.treatments.map((treatment, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className={getTreatmentTypeColor(treatment.type)}
                      >
                        {getTreatmentTypeIcon(treatment.type)}
                        <span className="ml-1">{treatment.type}</span>
                      </Badge>
                    ))}
                    {disease.fertilizers.length > 0 && (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        <Leaf className="h-3 w-3 mr-1" />
                        fertilizer
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/advisory/${disease.id}`} className="flex-1">
                    <Button className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Get Treatment
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No diseases found matching your search.</p>
          <p className="text-gray-400 mt-2">Try different keywords or select a different crop.</p>
        </div>
      )}
    </div>
  );
};
