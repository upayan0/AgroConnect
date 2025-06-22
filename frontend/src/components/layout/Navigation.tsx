import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  LogOut, 
  Leaf,
  Home,
  Store,
  MessageCircle,
  HelpCircle,
  BookOpen,
  Cloud,
  BarChart
} from 'lucide-react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavigationItems = () => {
    if (!user) {
      return [
        { label: 'Home', path: '/', icon: Home },
        { label: 'Crop Marketplace', path: '/crop-marketplace', icon: Leaf },
        { label: 'Inputs Market', path: '/inputs-marketplace', icon: Store },
        { label: 'Advisory', path: '/advisory', icon: MessageCircle },
        { label: 'FAQs', path: '/faqs', icon: HelpCircle },
      ];
    }

    if (user.role === 'farmer') {
      return [
        { label: 'Home', path: '/', icon: Home },
        { label: 'Dashboard', path: '/farmer-dashboard', icon: BarChart },
        { label: 'Crop Prediction', path: '/crop-prediction', icon: Leaf },
        { label: 'Yield Prediction', path: '/yield-prediction', icon: BarChart },
        { label: 'Learning', path: '/learning', icon: BookOpen },
        { label: 'Weather', path: '/weather', icon: Cloud },
        { label: 'Crop Advisory', path: '/advisory', icon: MessageCircle },
        { label: 'Market Inputs', path: '/inputs-marketplace', icon: Store },
        { label: 'FAQs', path: '/faqs', icon: HelpCircle },
      ];
    }

    // Buyer navigation items
    return [
      { label: 'Home', path: '/', icon: Home },
      { label: 'Dashboard', path: '/buyer-dashboard', icon: BarChart },
      { label: 'Marketplace', path: '/crop-marketplace', icon: Leaf },
      { label: 'FAQs', path: '/faqs', icon: HelpCircle },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AgroConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-4 flex-1 justify-center">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-gray-900 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50 whitespace-nowrap"
              >
                <div className="flex items-center">
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-1 flex-shrink-0">
            {user && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm" className="px-2 py-2">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-1">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="px-2 py-2">
                    <User className="h-5 w-5" />
                    <span className="ml-1 hidden xl:inline text-sm">{user.name}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="px-2 py-2">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="px-2 py-2 text-sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm" className="px-2 py-2 text-sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
