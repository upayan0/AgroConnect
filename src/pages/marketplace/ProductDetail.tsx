
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  MapPin, 
  User, 
  Package,
  Shield,
  Truck
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in a real app, this would be fetched based on the ID
  const product = {
    id: id || '1',
    name: 'Organic Tomatoes',
    price: 2.50,
    unit: 'kg',
    stock: 150,
    category: 'vegetables',
    farmer: 'Green Valley Farm',
    farmerRating: 4.8,
    location: 'California, USA',
    rating: 4.8,
    reviews: 24,
    image: '/images/crops/tomatoes.jpg',
    description: 'Fresh organic tomatoes grown without pesticides in the fertile valleys of California. These tomatoes are vine-ripened and hand-picked at peak freshness to ensure the best flavor and nutritional value.',
    organic: true,
    features: [
      'Certified Organic',
      'Non-GMO',
      'Vine-ripened',
      'Hand-picked',
      'Pesticide-free'
    ],
    specifications: {
      'Harvest Date': '2024-01-10',
      'Shelf Life': '7-10 days',
      'Storage': 'Cool, dry place',
      'Variety': 'Heirloom',
      'Size': 'Medium to Large'
    },
    farmerInfo: {
      name: 'Green Valley Farm',
      experience: '15 years',
      totalProducts: 12,
      rating: 4.8,
      reviews: 156,
      location: 'California, USA',
      bio: 'Family-owned organic farm dedicated to sustainable agriculture and providing the freshest produce to our customers.'
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: 'crop',
      unit: product.unit,
      farmerId: product.id,
      farmerName: product.farmer
    }, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/crop-marketplace" className="inline-flex items-center text-green-600 hover:text-green-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-xs text-gray-400">IMG</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.organic && (
                <Badge className="bg-green-100 text-green-800">Organic</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500 ml-1">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{product.location}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  ${product.price}
                </div>
                <div className="text-gray-500">per {product.unit}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Available Stock</div>
                <div className="font-medium">{product.stock} {product.unit}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity ({product.unit})
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border border-gray-300 rounded-md px-3 py-2"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
                <span className="text-sm text-gray-600">
                  Total: ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} variant="outline" className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button onClick={handleBuyNow} className="flex-1">
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <Shield className="h-5 w-5 text-green-600 mb-1" />
                <span>Quality Assured</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-5 w-5 text-blue-600 mb-1" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <Package className="h-5 w-5 text-purple-600 mb-1" />
                <span>Fresh Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{product.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium text-gray-600">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Farmer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Farmer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{product.farmerInfo.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">{product.farmerInfo.rating} ({product.farmerInfo.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span>{product.farmerInfo.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products:</span>
                    <span>{product.farmerInfo.totalProducts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span>{product.farmerInfo.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">{product.farmerInfo.bio}</p>
                
                <Button variant="outline" className="w-full">
                  View Farmer Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-2 text-blue-600" />
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="flex items-center">
                <Package className="h-4 w-4 mr-2 text-green-600" />
                <span>Careful packaging to maintain freshness</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-purple-600" />
                <span>100% satisfaction guarantee</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
