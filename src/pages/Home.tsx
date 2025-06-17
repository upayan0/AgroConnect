
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';

export const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      title: "Marketplace",
      description: "Buy and sell agricultural products directly",
      link: "/crop-marketplace"
    },
    {
      icon: <Leaf className="h-8 w-8 text-blue-600" />,
      title: "Plant Advisory",
      description: "Get expert advice on plant diseases and treatments",
      link: "/advisory"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "AgroBot Assistant",
      description: "24/7 AI-powered agricultural guidance",
      link: "#"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Market Analytics",
      description: "Real-time market prices and trends",
      link: "#"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Farmers" },
    { number: "5,000+", label: "Buyers" },
    { number: "50,000+", label: "Products Sold" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Farmer",
      content: "AgroConnect helped me increase my crop yield by 30% with their expert advisory services.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Buyer",
      content: "Best platform to source fresh, quality produce directly from farmers.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Award className="h-4 w-4 mr-2" />
            India's Leading AgriTech Platform
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Connecting Farmers to
            <span className="text-green-600 block">Modern Agriculture</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of farmers and buyers in revolutionizing agriculture through 
            technology, expert advisory, and direct marketplace connections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/signup">
                  <Button size="lg" className="px-8 py-3 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/advisory">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg hover:bg-green-50 hover:border-green-500 transition-colors">
                    Get Advisory
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={user.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}>
                <Button size="lg" className="px-8 py-3 text-lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From expert advisory to direct marketplace access, we provide comprehensive solutions for today's agricultural challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full group-hover:bg-green-50 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <Link to={feature.link}>
                    <Button variant="outline" className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose AgroConnect?
              </h2>
              <div className="space-y-4">
                {[
                  "Direct farmer-to-buyer connections",
                  "Expert plant disease advisory",
                  "Real-time market analytics",
                  "24/7 AI-powered support",
                  "Secure payment processing",
                  "Quality assurance guarantee"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
              <p className="text-gray-600 mb-6">
                Join our community of progressive farmers and buyers today.
              </p>
              {!user && (
                <div className="space-y-3">
                  <Link to="/signup?role=farmer" className="block">
                    <Button className="w-full" variant="outline">
                      Join as Farmer
                    </Button>
                  </Link>
                  <Link to="/signup?role=buyer" className="block">
                    <Button className="w-full">
                      Join as Buyer
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
