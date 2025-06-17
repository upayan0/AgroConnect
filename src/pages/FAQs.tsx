import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, MessageCircle, Mail } from 'lucide-react';

export const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: '1',
      category: 'General',
      question: 'What is AgroConnect?',
      answer: 'AgroConnect is a comprehensive agricultural platform that connects farmers and buyers, provides plant disease advisory services, and offers agricultural inputs marketplace. We help streamline the agricultural supply chain and provide expert guidance to farmers.'
    },
    {
      id: '2',
      category: 'Marketplace',
      question: 'How do I buy crops from farmers?',
      answer: 'To buy crops, browse our Crop Marketplace, search for specific products, and add items to your cart. You can filter by location, price, and category. Once you\'ve selected your items, proceed to checkout and complete your purchase.'
    },
    {
      id: '3',
      category: 'Marketplace',
      question: 'How do I sell my crops as a farmer?',
      answer: 'As a farmer, you can list your crops by accessing your Farmer Dashboard. Click "Add New Listing" and provide details about your crop including price, quantity, description, and images. Your listing will be visible to buyers immediately.'
    },
    {
      id: '4',
      category: 'Advisory',
      question: 'How does the plant disease advisory work?',
      answer: 'Our plant disease advisory allows you to upload images of affected plants or browse our disease database. You\'ll receive expert treatment recommendations including fungicides, fertilizers, and cultural practices. You can also purchase recommended treatments directly from our inputs marketplace.'
    },
    {
      id: '5',
      category: 'Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods including credit/debit cards, UPI, and Razorpay. All transactions are secure and encrypted. You can choose your preferred payment method during checkout.'
    },
    {
      id: '6',
      category: 'Shipping',
      question: 'How does shipping work for agricultural products?',
      answer: 'We work with specialized logistics partners experienced in handling agricultural products. Shipping costs and delivery times vary based on product type, quantity, and location. Fresh produce is prioritized for faster delivery to maintain quality.'
    },
    {
      id: '7',
      category: 'Account',
      question: 'How do I switch between buyer and farmer roles?',
      answer: 'Currently, account types are set during registration. If you need to change your role, please contact our support team. We\'re working on a feature to allow users to have both buyer and farmer capabilities.'
    },
    {
      id: '8',
      category: 'Advisory',
      question: 'Are the treatment recommendations safe to use?',
      answer: 'All our treatment recommendations are provided by certified agricultural experts and follow established agricultural guidelines. However, always read product labels, follow dosage instructions, and observe safety periods before harvest.'
    },
    {
      id: '9',
      category: 'General',
      question: 'Is there a mobile app available?',
      answer: 'Currently, AgroConnect is available as a web application optimized for mobile devices. We\'re developing native mobile apps for iOS and Android, which will be available soon.'
    },
    {
      id: '10',
      category: 'Support',
      question: 'How can I get help if I have issues?',
      answer: 'You can get help through multiple channels: use our ChatKulim AI assistant for instant help, email us at support@agroconnect.com, or browse these FAQs. Our support team is available 24/7 to assist you.'
    }
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      'General': 'bg-blue-100 text-blue-800',
      'Marketplace': 'bg-green-100 text-green-800',
      'Advisory': 'bg-purple-100 text-purple-800',
      'Payments': 'bg-yellow-100 text-yellow-800',
      'Shipping': 'bg-orange-100 text-orange-800',
      'Account': 'bg-indigo-100 text-indigo-800',
      'Support': 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600">
          Find answers to common questions about AgroConnect. Can't find what you're looking for? 
          Contact our support team.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className={getCategoryColor(category)}>
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-8">
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={getCategoryColor(faq.category)}>
                    {faq.category}
                  </Badge>
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-8">
          <HelpCircle className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
          <p className="text-gray-600">
            Try searching with different keywords or contact our support team.
          </p>
        </div>
      )}

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Still Need Help?
          </CardTitle>
          <CardDescription>
            Our support team is here to help you with any questions or issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>support@agroconnect.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MessageCircle className="h-4 w-4" />
              <span>Use ChatKulim (bottom right) for instant help</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
