import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search, Filter, ShoppingCart, Star, MapPin } from 'lucide-react';

export const CropMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');
  
  const { addToCart } = useCart();

  // Mock data for demonstration
  const crops = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 40,
      unit: 'kg',
      stock: 150,
      category: 'vegetables',
      farmer: 'Green Valley Farm',
      location: 'Maharashtra',
      rating: 4.8,
      reviews: 24,
      image: '/images/crops/tomatoes.jpg',
      description: 'Fresh organic tomatoes grown without pesticides',
      organic: true
    },
    {
      id: '2',
      name: 'Premium Basmati Rice',
      price: 120,
      unit: 'kg',
      stock: 500,
      category: 'grains',
      farmer: 'Golden Harvest',
      location: 'Punjab',
      rating: 4.9,
      reviews: 156,
      image: '/images/crops/rice.jpg',
      description: 'Long grain basmati rice with excellent aroma',
      organic: false
    },
    {
      id: '3',
      name: 'Fresh Carrots',
      price: 30,
      unit: 'kg',
      stock: 75,
      category: 'vegetables',
      farmer: 'Sunrise Organics',
      location: 'Karnataka',
      rating: 4.6,
      reviews: 42,
      image: '/images/crops/carrots.jpg',
      description: 'Crisp and sweet carrots perfect for cooking',
      organic: true
    },
    {
      id: '4',
      name: 'Wheat Grain',
      price: 25,
      unit: 'kg',
      stock: 1000,
      category: 'grains',
      farmer: 'Prairie Fields',
      location: 'Madhya Pradesh',
      rating: 4.7,
      reviews: 89,
      image: '/images/crops/wheat.jpg',
      description: 'High-quality wheat grain for milling',
      organic: false
    },
    {
      id: '5',
      name: 'Organic Spinach',
      price: 60,
      unit: 'kg',
      stock: 30,
      category: 'vegetables',
      farmer: 'Green Leaf Farms',
      location: 'Himachal Pradesh',
      rating: 4.5,
      reviews: 18,
      image: '/images/crops/spinach.jpg',
      description: 'Fresh baby spinach leaves, ready to eat',
      organic: true
    },
    {
      id: '6',
      name: 'Sweet Corn',
      price: 35,
      unit: 'kg',
      stock: 200,
      category: 'vegetables',
      farmer: 'Corn Valley Co.',
      location: 'Gujarat',
      rating: 4.4,
      reviews: 67,
      image: '/images/crops/corn.jpg',
      description: 'Sweet and tender corn kernels',
      organic: false
    }
  ];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || crop.category === category;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && crop.price < 30) ||
                        (priceRange === 'medium' && crop.price >= 30 && crop.price < 60) ||
                        (priceRange === 'high' && crop.price >= 60);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedCrops = [...filteredCrops].sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.price - b.price;
      case 'price_high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const handleAddToCart = (crop: typeof crops[0]) => {
    addToCart({
      id: crop.id,
      name: crop.name,
      price: crop.price,
      image: crop.image,
      category: 'crop',
      unit: crop.unit,
      farmerId: crop.id,
      farmerName: crop.farmer
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Crop Marketplace</h1>
        <p className="text-gray-600">Discover fresh, quality crops directly from farmers</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search crops or farmers..."
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
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under ₹30/kg</SelectItem>
              <SelectItem value="medium">₹30 - ₹60/kg</SelectItem>
              <SelectItem value="high">Above ₹60/kg</SelectItem>
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
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">{sortedCrops.length} crops found</p>
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCrops.map((crop) => (
          <Card key={crop.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-500">Image placeholder</span>
              </div>
              {crop.organic && (
                <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                  Organic
                </Badge>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{crop.name}</CardTitle>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    ₹{crop.price}
                  </div>
                  <div className="text-sm text-gray-500">per {crop.unit}</div>
                </div>
              </div>
              <CardDescription>{crop.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Stock: {crop.stock} {crop.unit}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{crop.rating} ({crop.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{crop.farmer} • {crop.location}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Link to={`/product/${crop.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleAddToCart(crop)}
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

      {sortedCrops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No crops found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};
