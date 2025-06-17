import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, Star, Shield, Leaf, Bug } from 'lucide-react';

export const InputsMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const { addToCart } = useCart();

  // Mock data for agricultural inputs
  const inputs = [
    {
      id: 'FUNG001',
      name: 'Copper-based Fungicide',
      price: 450,
      unit: 'kg',
      category: 'fungicide',
      activeIngredient: 'Copper Sulfate',
      rating: 4.6,
      reviews: 34,
      description: 'Effective against late blight and other fungal diseases',
      usage: 'For tomato, potato, and vegetable crops',
      safetyPeriod: '7 days',
      stock: 120
    },
    {
      id: 'FERT001',
      name: 'NPK 12-12-17 Fertilizer',
      price: 850,
      unit: '50kg bag',
      category: 'fertilizer',
      composition: 'NPK 12-12-17',
      rating: 4.8,
      reviews: 89,
      description: 'Balanced fertilizer for healthy plant growth',
      usage: 'Suitable for all crop types',
      applicationRate: '200-300 kg per hectare',
      stock: 500
    },
    {
      id: 'SEED001',
      name: 'Hybrid Paddy Seeds',
      price: 350,
      unit: '5kg bag',
      category: 'seeds',
      variety: 'Disease Resistant',
      rating: 4.7,
      reviews: 156,
      description: 'High-yield hybrid paddy seeds with disease resistance',
      usage: 'Suitable for both Kharif and Rabi seasons',
      germination: '85%+',
      stock: 75
    },
    {
      id: 'PEST001',
      name: 'Organic Neem Oil',
      price: 280,
      unit: '1L bottle',
      category: 'pesticide',
      type: 'Organic',
      rating: 4.5,
      reviews: 67,
      description: 'Natural pest control solution',
      usage: 'For aphids, whiteflies, and other pests',
      organic: true,
      stock: 200
    },
    {
      id: 'TOOL001',
      name: 'Digital Soil pH Meter',
      price: 1200,
      unit: 'piece',
      category: 'tools',
      type: 'Digital',
      rating: 4.9,
      reviews: 45,
      description: 'Accurate soil pH measurement tool',
      usage: 'For soil testing and analysis',
      warranty: '2 years',
      stock: 30
    },
    {
      id: 'FERT002',
      name: 'Organic Vermicompost',
      price: 250,
      unit: '25kg bag',
      category: 'fertilizer',
      type: 'Organic',
      rating: 4.4,
      reviews: 78,
      description: 'Rich organic compost for soil improvement',
      usage: 'For all types of crops and gardens',
      organic: true,
      stock: 150
    }
  ];

  const filteredInputs = inputs.filter(input => {
    const matchesSearch = input.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         input.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || input.category === category;
    
    return matchesSearch && matchesCategory;
  });

  const sortedInputs = [...filteredInputs].sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.price - b.price;
      case 'price_high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const handleAddToCart = (input: typeof inputs[0]) => {
    addToCart({
      id: input.id,
      name: input.name,
      price: input.price,
      image: '/images/inputs/placeholder.jpg',
      category: 'input',
      unit: input.unit,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fungicide':
      case 'pesticide':
        return <Bug className="h-4 w-4" />;
      case 'fertilizer':
        return <Leaf className="h-4 w-4" />;
      case 'seeds':
        return <Leaf className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fungicide': return 'bg-red-100 text-red-800';
      case 'pesticide': return 'bg-orange-100 text-orange-800';
      case 'fertilizer': return 'bg-green-100 text-green-800';
      case 'seeds': return 'bg-blue-100 text-blue-800';
      case 'tools': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Agricultural Inputs Marketplace</h1>
        <p className="text-gray-600">Find quality fertilizers, pesticides, seeds, and farming tools</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search inputs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fertilizer">Fertilizers</SelectItem>
              <SelectItem value="fungicide">Fungicides</SelectItem>
              <SelectItem value="pesticide">Pesticides</SelectItem>
              <SelectItem value="seeds">Seeds</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center text-sm text-gray-600">
            <span>{sortedInputs.length} products found</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedInputs.map((input) => (
          <Card key={input.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                {getCategoryIcon(input.category)}
                <span className="ml-2 text-gray-500">Product Image</span>
              </div>
              <Badge 
                className={`absolute top-2 right-2 ${getCategoryColor(input.category)}`}
              >
                {input.category}
              </Badge>
              {input.organic && (
                <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                  Organic
                </Badge>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{input.name}</CardTitle>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    ₹{input.price}
                  </div>
                  <div className="text-sm text-gray-500">per {input.unit}</div>
                </div>
              </div>
              <CardDescription>{input.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Stock: {input.stock}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{input.rating} ({input.reviews})</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p><strong>Usage:</strong> {input.usage}</p>
                  {input.activeIngredient && (
                    <p><strong>Active Ingredient:</strong> {input.activeIngredient}</p>
                  )}
                  {input.safetyPeriod && (
                    <p><strong>Safety Period:</strong> {input.safetyPeriod}</p>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleAddToCart(input)}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedInputs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};
