
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bot, Send, User, AlertCircle } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m InsuraBot, your AI insurance assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on your situation, I'd recommend looking into a comprehensive health insurance plan with at least $500,000 in coverage.",
        "To file a claim for that damage, you'll need to provide photos of the damage, a police report, and your policy number. I can help guide you through each step.",
        "The main difference between term and whole life insurance is that term life provides coverage for a specific period, while whole life provides lifetime coverage and includes a cash value component.",
        "Your auto insurance deductible is the amount you pay out of pocket before your insurance covers the rest. A higher deductible usually means lower premiums, but more cost if you have an accident.",
        "For a family of 4 in your area, I'd recommend checking health plans from BlueCross BlueShield, United Healthcare, and Kaiser Permanente. Each has different strengths depending on your needs."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What's the difference between HMO and PPO health plans?",
    "How much life insurance do I need for my family?",
    "What factors affect my auto insurance premium?",
    "Should I get flood insurance if I don't live in a flood zone?",
    "What does renters insurance typically cover?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-insura-cyberdark">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-400/10 text-teal-400 font-medium text-sm mb-4 border border-teal-400/20">
              AI Assistant
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              InsuraBot Chat Assistant
            </h1>
            <p className="text-xl text-gray-300">
              Get instant answers to all your insurance questions 24/7.
            </p>
          </div>

          <div className="cyber-card rounded-xl p-4 md:p-6 mb-6">
            <div className="bg-black/30 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">
                I can help with insurance questions, policy explanations, premium estimates, and claims procedures. While I provide accurate information, please consult with a licensed insurance agent for final decisions.
              </p>
            </div>
            
            <div className="h-[400px] overflow-y-auto mb-4 space-y-4 scrollbar-none p-2">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`flex max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-insura-purple/30 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl' 
                        : 'bg-gray-800/70 rounded-tr-2xl rounded-br-2xl rounded-tl-2xl'
                    } p-3`}
                  >
                    <div className="mr-3 mt-0.5">
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-insura-purple" />
                      ) : (
                        <Bot className="w-5 h-5 text-teal-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-300">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/70 rounded-tr-2xl rounded-br-2xl rounded-tl-2xl p-3 flex items-center">
                    <Bot className="w-5 h-5 text-teal-400 mr-3" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your insurance question here..."
                className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white resize-none"
                rows={3}
              />
              <button 
                onClick={handleSendMessage}
                disabled={inputText.trim() === ''}
                className="absolute right-3 bottom-3 p-2 rounded-full bg-teal-400/20 text-teal-400 hover:bg-teal-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Suggested Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputText(question);
                  }}
                  className="text-left py-2 px-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-gray-300 transition-colors text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-12 cyber-card p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-white">Why Chat With InsuraBot?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">24/7</span>
                </div>
                <h3 className="font-medium text-white text-center mb-2">Always Available</h3>
                <p className="text-gray-400 text-sm text-center">Get answers to your insurance questions anytime, day or night.</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">AI</span>
                </div>
                <h3 className="font-medium text-white text-center mb-2">Instant Knowledge</h3>
                <p className="text-gray-400 text-sm text-center">Trained on millions of insurance documents for accurate information.</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">🔒</span>
                </div>
                <h3 className="font-medium text-white text-center mb-2">Private & Secure</h3>
                <p className="text-gray-400 text-sm text-center">Your conversations are private and not stored after your session.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatAssistantPage;
