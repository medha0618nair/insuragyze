
import React, { useState, useRef, useEffect } from 'react';
import { ButtonCustom } from './ui/button-custom';
import { Send, Bot, User, Cpu, AlertCircle, CheckCircle } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your InsuraAI assistant. How can I help you with insurance today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample suggestions for quick user questions
  const suggestions = [
    "What does liability insurance cover?",
    "How can I lower my premium?",
    "What's the difference between HMO and PPO?",
    "How do I file a claim?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      let response = '';
      
      // Simple pattern matching for demo purposes
      if (inputValue.toLowerCase().includes('liability')) {
        response = "Liability insurance covers costs if you're responsible for damages to others or their property. It typically includes legal defense costs, medical expenses, and property damage.";
      } else if (inputValue.toLowerCase().includes('premium') || inputValue.toLowerCase().includes('lower')) {
        response = "You can lower your insurance premium by: 1) Bundling multiple policies, 2) Increasing your deductible, 3) Improving home/auto safety features, 4) Maintaining good credit, and 5) Asking about available discounts.";
      } else if (inputValue.toLowerCase().includes('hmo') || inputValue.toLowerCase().includes('ppo')) {
        response = "HMO (Health Maintenance Organization) plans typically have lower premiums but require referrals from primary care doctors and limit you to in-network providers. PPO (Preferred Provider Organization) plans offer more flexibility to see specialists and out-of-network providers but usually have higher premiums.";
      } else if (inputValue.toLowerCase().includes('claim')) {
        response = "To file a claim: 1) Contact your insurance company immediately, 2) Provide all required documentation (photos, police reports, etc.), 3) Meet with an adjuster if necessary, 4) Review the settlement offer, and 5) Follow up if you have questions about the outcome.";
      } else {
        response = "Thank you for your question. In a full implementation, I would analyze your question using natural language processing and provide a detailed, personalized response based on current insurance knowledge and your specific situation.";
      }
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Focus on the input after selecting a suggestion
    document.getElementById('chat-input')?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="chat-assistant" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-insura-lightblue text-insura-blue font-medium text-sm mb-4">
            AI Chat Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Get Instant Answers to Insurance Questions
          </h2>
          <p className="text-xl text-gray-600">
            Our AI assistant provides quick, accurate answers to your insurance questions without complicated jargon.
          </p>
        </div>

        <div className="glass-card max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-insura-blue p-4 text-white flex items-center">
            <div className="p-2 bg-white/20 rounded-full mr-3">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium">InsuraAI Assistant</h3>
              <p className="text-xs text-white/80">Online | Insurance Expert</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user' 
                      ? 'bg-insura-blue text-white rounded-tr-none' 
                      : 'bg-white shadow-sm border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div 
                      className={`p-1.5 rounded-full mr-2 ${
                        message.sender === 'user' 
                          ? 'bg-white/20' 
                          : 'bg-insura-lightblue'
                      }`}
                    >
                      {message.sender === 'user' 
                        ? <User className="w-3 h-3 text-white" /> 
                        : <Cpu className="w-3 h-3 text-insura-blue" />
                      }
                    </div>
                    <span 
                      className={`text-xs font-medium ${
                        message.sender === 'user' ? 'text-white/90' : 'text-gray-500'
                      }`}
                    >
                      {message.sender === 'user' ? 'You' : 'InsuraAI'}
                    </span>
                    <span 
                      className={`text-xs ml-auto ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className={message.sender === 'user' ? 'text-white' : 'text-gray-700'}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white shadow-sm border border-gray-200 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-insura-blue/60 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-insura-blue/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-insura-blue/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick Suggestions */}
          <div className="p-3 bg-gray-50 border-t border-gray-200 overflow-x-auto">
            <div className="flex gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex-shrink-0 bg-white border border-gray-200 hover:border-insura-blue text-gray-700 text-sm rounded-full px-4 py-2 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-3">
              <textarea
                id="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your insurance question here..."
                className="flex-grow resize-none rounded-lg border border-gray-300 focus:border-insura-blue focus:ring-2 focus:ring-insura-blue/20 p-3 focus:outline-none"
                rows={1}
              />
              <ButtonCustom
                variant="primary"
                onClick={handleSendMessage}
                className="self-end"
                disabled={inputValue.trim() === '' || isTyping}
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
              >
                Send
              </ButtonCustom>
            </div>
            
            <div className="mt-3 text-xs flex items-center text-gray-500">
              <div className="flex items-center mr-4">
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                <span>Privacy protected</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-3 h-3 mr-1 text-insura-blue" />
                <span>For informational purposes only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatAssistant;
