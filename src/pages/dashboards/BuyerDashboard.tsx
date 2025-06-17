import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Eye,
  Clock,
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  History,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const BuyerDashboard = () => {
  const { user } = useAuth();
  const { getTotalItems, getTotalPrice } = useCart();

  // Mock data for demonstration
  const recentOrders = [
    {
      id: 'ORD001',
      date: '2024-03-15',
      status: 'Delivered',
      total: '₹45,000',
      items: [
        { name: 'Wheat', quantity: '20 quintals', price: '₹2,000/quintal' },
        { name: 'Rice', quantity: '15 quintals', price: '₹3,000/quintal' }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-03-14',
      status: 'In Transit',
      total: '₹32,000',
      items: [
        { name: 'Cotton', quantity: '10 quintals', price: '₹3,200/quintal' }
      ]
    },
    {
      id: 'ORD003',
      date: '2024-03-13',
      status: 'Processing',
      total: '₹28,000',
      items: [
        { name: 'Sugarcane', quantity: '5 tons', price: '₹5,600/ton' }
      ]
    }
  ];

  const orderStats = [
    { label: 'Total Orders', value: '24', change: '+3 this month' },
    { label: 'Completed', value: '22', change: '91.7% success rate' },
    { label: 'In Transit', value: '2', change: 'Expected delivery' },
    { label: 'Total Spent', value: '$1,250', change: '+15% this month' }
  ];

  const recommendations = [
    { id: '1', name: 'Fresh Carrots', price: 2.50, unit: 'kg', farmer: 'Green Valley Farm' },
    { id: '2', name: 'Organic Spinach', price: 4.00, unit: 'kg', farmer: 'Sunrise Organics' },
    { id: '3', name: 'Premium Rice', price: 1.80, unit: 'kg', farmer: 'Golden Harvest' }
  ];

  const marketTrends = [
    { 
      crop: 'Wheat', 
      current: '₹2,200/quintal', 
      change: '+5%', 
      trend: 'up',
      location: 'Punjab'
    },
    { 
      crop: 'Rice', 
      current: '₹3,200/quintal', 
      change: '-2%', 
      trend: 'down',
      location: 'Haryana'
    },
    { 
      crop: 'Cotton', 
      current: '₹3,500/quintal', 
      change: '+3%', 
      trend: 'up',
      location: 'Gujarat'
    },
    { 
      crop: 'Sugarcane', 
      current: '₹5,800/ton', 
      change: '+1%', 
      trend: 'up',
      location: 'Maharashtra'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'In Transit': return <Package className="h-4 w-4" />;
      case 'Processing': return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-600">Track your orders and market activities</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Orders</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <h3 className="text-2xl font-bold">₹1,25,000</h3>
              </div>
              <History className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track your latest purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order {order.id}</p>
                      <p className="text-sm text-gray-500">Date: {order.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} ({item.quantity})</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total</span>
                      <span>{order.total}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Current prices and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{trend.crop}</p>
                      <p className="text-sm text-gray-500">{trend.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{trend.current}</p>
                      <p className={`text-sm font-medium flex items-center ${
                        trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trend.change}
                        {trend.trend === 'up' ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Market Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
            <Package className="h-6 w-6 mb-2" />
            Browse Marketplace
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
            <TrendingUp className="h-6 w-6 mb-2" />
            Track Orders
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
            <History className="h-6 w-6 mb-2" />
            Order History
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
            <TrendingUp className="h-6 w-6 mb-2" />
            Market Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};
