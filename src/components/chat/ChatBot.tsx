import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Leaf } from 'lucide-react';
import { getGeminiResponse } from '@/services/geminiService';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const styles = `
  .chat-container {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }

  .chat-container::-webkit-scrollbar {
    width: 8px;
    display: block;
  }

  .chat-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .chat-container::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  .chat-container::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  .custom-scrollbar {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #22c55e #f1f1f1;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #22c55e;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #16a34a;
  }
`;

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m AgroBot, your AI agricultural assistant. I can help you with crop advice, disease identification, fertilizer recommendations, weather insights, and market prices. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickSuggestions = [
    'How to identify tomato diseases?',
    'Best fertilizer for rice crops',
    'Weather impact on crop growth',
    'Organic farming tips',
    'Market prices for vegetables',
    'Soil testing recommendations'
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(inputText);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
      console.error('Error getting AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-green-600 hover:bg-green-700"
        size="icon"
      >
        <div className="relative">
          <Bot className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </Button>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-xl z-50 flex flex-col border-green-200">
        <CardHeader className="pb-3 bg-green-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <div className="relative mr-2">
                <Bot className="h-5 w-5" />
                <Leaf className="h-3 w-3 absolute -top-1 -right-1 text-green-300" />
              </div>
              AgroBot
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4 pt-0">
          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="mb-4 pt-4">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="custom-scrollbar mb-4 pr-2 space-y-3 max-h-[400px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900 border'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0">
                        <Bot className="h-4 w-4 mt-0.5 text-green-600" />
                      </div>
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-green-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex space-x-2 mt-auto pt-2 border-t border-gray-200 bg-white">
            <div className="relative flex-1">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyPress}
                placeholder="Ask about crops, diseases, fertilizers..."
                className="flex-1 border-green-200 focus:border-green-500 pr-12 h-10"
                disabled={isTyping}
                aria-label="Chat input"
              />
              {inputText.length > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {inputText.length}/500
                </span>
              )}
            </div>
            <Button 
              onClick={handleSendMessage} 
              size="sm"
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed h-10"
              disabled={isTyping || !inputText.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
