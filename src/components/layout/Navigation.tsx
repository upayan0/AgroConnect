import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AgroConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-1" />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                    <span className="ml-1 hidden sm:inline">{user.name}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2" />
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
