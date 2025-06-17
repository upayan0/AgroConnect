
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  AlertTriangle, 
  Leaf, 
  Bug, 
  Droplets,
  Clock,
  Shield,
  DollarSign
} from 'lucide-react';
import diseasesData from '@/data/diseases.json';

export const AdvisoryDetail = () => {
  const { diseaseId } = useParams();
  const { addToCart } = useCart();
  
  const disease = diseasesData.diseases.find(d => d.id === diseaseId);

  if (!disease) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Disease Not Found</h1>
          <p className="text-gray-600 mb-6">The requested disease information could not be found.</p>
          <Link to="/advisory">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Advisory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (item: any, type: 'treatment' | 'fertilizer') => {
    addToCart({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: '/images/placeholder.jpg',
      category: 'input',
      unit: type === 'treatment' ? 'ml' : 'kg',
    });
  };

  const getTreatmentIcon = (type: string) => {
    switch (type) {
      case 'fungicide': return <Bug className="h-5 w-5 text-red-500" />;
      case 'fertilizer': return <Leaf className="h-5 w-5 text-green-500" />;
      default: return <Droplets className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTreatmentColor = (type: string) => {
    switch (type) {
      case 'fungicide': return 'border-red-200 bg-red-50';
      case 'fertilizer': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/advisory" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Advisory
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{disease.name}</h1>
            <Badge variant="outline" className="mt-2">{disease.crop}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Disease Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Disease Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-20 w-20 text-gray-400" />
              </div>
              <p className="text-gray-700">{disease.description}</p>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                Symptoms to Watch For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Treatments */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Treatments</CardTitle>
              <CardDescription>
                Professional treatment options with detailed application instructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disease.treatments.map((treatment, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getTreatmentColor(treatment.type)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getTreatmentIcon(treatment.type)}
                        <h3 className="font-semibold">{treatment.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-green-600 font-semibold">
                          <DollarSign className="h-4 w-4" />
                          {treatment.price}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      Active ingredient: {treatment.activeIngredient}
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`treatment-${index}`}>
                        <AccordionTrigger className="text-sm">
                          Application Details
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center">
                              <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                              <span><strong>Dosage:</strong> {treatment.dosage}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-purple-500" />
                              <span><strong>Frequency:</strong> {treatment.frequency}</span>
                            </div>
                            <div className="flex items-center">
                              <Bug className="h-4 w-4 mr-2 text-orange-500" />
                              <span><strong>Method:</strong> {treatment.applicationMethod}</span>
                            </div>
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-red-500" />
                              <span><strong>Safety:</strong> {treatment.safetyPeriod}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="mt-3 pt-3 border-t">
                      <Button 
                        onClick={() => handleAddToCart(treatment, 'treatment')}
                        className="w-full"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart - ${treatment.price}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fertilizer Recommendations */}
          {disease.fertilizers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-green-500" />
                  Fertilizer Recommendations
                </CardTitle>
                <CardDescription>
                  Nutritional support to strengthen plant resistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disease.fertilizers.map((fertilizer, index) => (
                    <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Leaf className="h-5 w-5 text-green-500" />
                          <h3 className="font-semibold">{fertilizer.name}</h3>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {fertilizer.price}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Composition: {fertilizer.composition}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Benefits:</strong> {fertilizer.benefits}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Application:</strong> {fertilizer.dosage} ({fertilizer.applicationMethod})
                      </p>

                      <Button 
                        onClick={() => handleAddToCart(fertilizer, 'fertilizer')}
                        className="w-full"
                        variant="outline"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart - ${fertilizer.price}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cultural Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Cultural Practices</CardTitle>
              <CardDescription>
                Non-chemical management methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {disease.culturalPractices.map((practice, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Prevention Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-blue-500" />
                Prevention Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {disease.prevention.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Need Help? */}
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Connect with agricultural experts for personalized advice.
              </p>
              <Button className="w-full" variant="outline">
                Contact Expert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
