
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Home, ShoppingCart } from 'lucide-react';

export const OrderSuccess = () => {
  const { user } = useAuth();
  
  // Mock order data
  const orderNumber = 'AGC-' + Date.now().toString().slice(-6);
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600">
          Thank you for your order, {user?.name}. We've received your order and will process it shortly.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Order Details
          </CardTitle>
          <CardDescription>
            Your order has been confirmed and is being prepared for shipment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Order Number</h3>
                <p className="text-gray-600">{orderNumber}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Date</h3>
                <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Estimated Delivery</h3>
                <p className="text-gray-600">{estimatedDelivery}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Payment Status</h3>
                <p className="text-green-600 font-medium">Confirmed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium">Order Confirmation</h4>
                <p className="text-sm text-gray-600">
                  We'll send you an email confirmation with your order details.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium">Preparation & Packaging</h4>
                <p className="text-sm text-gray-600">
                  Our farmers will prepare your order with care and package it for shipment.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium">Shipping & Delivery</h4>
                <p className="text-sm text-gray-600">
                  Your order will be shipped and delivered to your specified address.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={user?.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}>
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/crop-marketplace">
            <Button variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500">
          Need help? <a href="mailto:support@agroconnect.com" className="text-green-600 hover:text-green-700">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};
