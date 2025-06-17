import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, Award } from 'lucide-react';

const learningModules = [
  {
    id: 'modern-farming',
    title: 'Modern Farming Techniques',
    description: 'Learn about advanced farming methods suitable for Indian agriculture',
    icon: BookOpen,
    content: [
      {
        title: 'Precision Agriculture',
        description: 'Understanding soil mapping, GPS technology, and variable rate technology',
        duration: '45 mins',
        level: 'Intermediate'
      },
      {
        title: 'Organic Farming',
        description: 'Sustainable farming practices and organic certification process',
        duration: '60 mins',
        level: 'Beginner'
      },
      {
        title: 'Smart Irrigation',
        description: 'Efficient water management techniques for Indian crops',
        duration: '30 mins',
        level: 'Intermediate'
      }
    ]
  },
  {
    id: 'crop-management',
    title: 'Crop Management',
    description: 'Best practices for managing different crops in Indian conditions',
    icon: FileText,
    content: [
      {
        title: 'Rice Cultivation',
        description: 'Modern techniques for rice farming in different regions',
        duration: '50 mins',
        level: 'Beginner'
      },
      {
        title: 'Wheat Production',
        description: 'Optimizing wheat yield through proper management',
        duration: '40 mins',
        level: 'Intermediate'
      },
      {
        title: 'Cash Crops',
        description: 'Growing and managing cotton, sugarcane, and other cash crops',
        duration: '55 mins',
        level: 'Advanced'
      }
    ]
  },
  {
    id: 'market-insights',
    title: 'Market Insights',
    description: 'Understanding agricultural markets and pricing strategies',
    icon: Award,
    content: [
      {
        title: 'Market Analysis',
        description: 'How to analyze market trends and make informed decisions',
        duration: '35 mins',
        level: 'Intermediate'
      },
      {
        title: 'Price Forecasting',
        description: 'Tools and techniques for predicting crop prices',
        duration: '45 mins',
        level: 'Advanced'
      },
      {
        title: 'Government Schemes',
        description: 'Overview of agricultural subsidies and support programs',
        duration: '30 mins',
        level: 'Beginner'
      }
    ]
  }
];

export const Learning = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Learning Center</h1>
        <p className="text-gray-600">Enhance your farming knowledge with our comprehensive learning modules</p>
      </div>

      <Tabs defaultValue="modern-farming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {learningModules.map((module) => (
            <TabsTrigger
              key={module.id}
              value={module.id}
              className="flex items-center space-x-2"
            >
              <module.icon className="h-5 w-5" />
              <span>{module.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {learningModules.map((module) => (
          <TabsContent key={module.id} value={module.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.content.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Duration: {item.duration}</span>
                      <span className="text-sm font-medium text-green-600">{item.level}</span>
                    </div>
                    <Button className="w-full">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 bg-green-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Completed Modules</h3>
                <p className="text-3xl font-bold text-green-600">3</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-blue-600">2</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Certificates Earned</h3>
                <p className="text-3xl font-bold text-purple-600">1</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 