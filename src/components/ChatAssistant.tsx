import React, { useState, useRef, useEffect } from 'react';
import { ButtonCustom } from './ui/button-custom';
import { Send, Bot, User, Cpu, AlertCircle, CheckCircle, Globe } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  language?: string;
}

const indianLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' },
  { code: 'ur', name: 'اردو (Urdu)' }
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your InsuraAI assistant. How can I help you with insurance today? You can chat with me in any Indian language!",
      sender: 'ai',
      timestamp: new Date(),
      language: 'en'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  // Sample suggestions for quick user questions in different languages
  const suggestions = [
    { text: "What does liability insurance cover?", lang: "en" },
    { text: "How can I lower my premium?", lang: "en" },
    { text: "स्वास्थ्य बीमा की क्या आवश्यकता है?", lang: "hi" },
    { text: "ಆರೋಗ್ಯ ವಿಮೆ ಪ್ರಯೋಜನಗಳೇನು?", lang: "kn" },
    { text: "காப்பீடு தேர்வு செய்வது எப்படி?", lang: "ta" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detect language from input text
  const detectLanguage = (text: string): string => {
    // This is a simple detection based on script characteristics
    // For a production app, consider using a proper language detection library
    
    // Check for Devanagari script (Hindi, Marathi)
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    
    // Check for Kannada script
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
    
    // Check for Tamil script
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
    
    // Check for Telugu script
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
    
    // Check for Malayalam script
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
    
    // Check for Bengali script
    if (/[\u0980-\u09FF]/.test(text)) return 'bn';
    
    // Check for Gujarati script
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
    
    // Check for Punjabi (Gurmukhi) script
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa';
    
    // Check for Odia script
    if (/[\u0B00-\u0B7F]/.test(text)) return 'or';
    
    // Check for Assamese/Bengali script
    if (/[\u0980-\u09FF]/.test(text)) return 'as';
    
    // Check for Urdu script (Arabic-based)
    if (/[\u0600-\u06FF]/.test(text)) return 'ur';
    
    // Default to English or selected language
    return selectedLanguage;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Detect language of input text
    const detectedLanguage = detectLanguage(inputValue);
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      language: detectedLanguage
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      // Responses in different languages
      const responses: Record<string, string[]> = {
        en: [
          "Liability insurance covers costs if you're responsible for damages to others or their property. It typically includes legal defense costs, medical expenses, and property damage.",
          "You can lower your insurance premium by: 1) Bundling multiple policies, 2) Increasing your deductible, 3) Improving home/auto safety features, 4) Maintaining good credit, and 5) Asking about available discounts.",
          "HMO plans typically have lower premiums but require referrals from primary care doctors and limit you to in-network providers. PPO plans offer more flexibility but usually have higher premiums."
        ],
        hi: [
          "लायबिलिटी इंश्योरेंस आपके द्वारा दूसरों या उनकी संपत्ति को हुए नुकसान के लिए जिम्मेदार होने पर लागत को कवर करता है। इसमें आमतौर पर कानूनी रक्षा लागत, चिकित्सा खर्च और संपत्ति के नुकसान शामिल होते हैं।",
          "आप अपने बीमा प्रीमियम को कम कर सकते हैं: 1) कई पॉलिसियों को बंडल करके, 2) अपनी कटौती बढ़ाकर, 3) घर/ऑटो सुरक्षा सुविधाओं में सुधार करके, 4) अच्छा क्रेडिट बनाए रखकर, और 5) उपलब्ध छूट के बारे में पूछकर।"
        ],
        kn: [
          "ಹೊಣೆಗಾರಿಕೆ ವಿಮೆಯು ಇತರರಿಗೆ ಅಥವಾ ಅವರ ಆಸ್ತಿಗೆ ಹಾನಿಗಾಗಿ ನೀವು ಜವಾಬ್ದಾರರಾಗಿದ್ದರೆ ವೆಚ್ಚಗಳನ್ನು ಭರಿಸುತ್ತದೆ. ಇದು ಸಾಮಾನ್ಯವಾಗಿ ಕಾನೂನು ರಕ್ಷಣಾ ವೆಚ್ಚ, ವೈದ್ಯಕೀಯ ವೆಚ್ಚ ಮತ್ತು ಆಸ್ತಿ ಹಾನಿಯನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.",
          "ನಿಮ್ಮ ವಿಮಾ ಪ್ರೀಮಿಯಂ ಅನ್ನು ಹೀಗೆ ಕಡಿಮೆ ಮಾಡಬಹುದು: 1) ಬಹು ಪಾಲಿಸಿಗಳನ್ನು ಬಂಡಲ್ ಮಾಡುವುದರಿಂದ, 2) ನಿಮ್ಮ ವಿನಾಯಿತಿಯನ್ನು ಹೆಚ್ಚಿಸುವುದರಿಂದ, 3) ಮನೆ/ವಾಹನ ಸುರಕ್ಷತಾ ಆಯಾಮಗಳನ್ನು ಸುಧಾರಿಸುವುದರಿಂದ, 4) ಉತ್ತಮ ಕ್ರೆಡಿಟ್ ನಿರ್ವಹಿಸುವುದರಿಂದ, ಮತ್ತು 5) ಲಭ್ಯವಿರುವ ರಿಯಾಯಿತಿಗಳ ಬಗ್ಗೆ ಕೇಳುವುದರಿಂದ."
        ],
        // Other languages can be added in the same pattern
        ta: [
          "பொறுப்பு காப்பீடு மற்றவர்களுக்கு அல்லது அவர்களின் சொத்துக்களுக்கு சேதம் ஏற்படுத்தியதற்கு நீங்கள் பொறுப்பாக இருந்தால் செலவுகளை உள்ளடக்குகிறது. இது சட்ட பாதுகாப்பு செலவுகள், மருத்துவ செலவுகள் மற்றும் சொத்து சேதம் ஆகியவற்றை உள்ளடக்குகிறது."
        ],
        te: [
          "బాధ్యతా బీమా మీరు ఇతరులకు లేదా వారి ఆస్తికి నష్టానికి బాధ్యులైతే ఖర్చులను కవర్ చేస్తుంది. ఇది సాధారణంగా చట్టపరమైన రక్షణ ఖర్చులు, వైద్య ఖర్చులు మరియు ఆస్తి నష్టాన్ని కలిగి ఉంటుంది."
        ]
      };
      
      // Get responses for the detected language or default to English
      const languageResponses = responses[detectedLanguage] || responses.en;
      const randomResponse = languageResponses[Math.floor(Math.random() * languageResponses.length)];
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
        language: detectedLanguage
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
      
      // Show toast notification for language change if detected
      if (detectedLanguage !== selectedLanguage) {
        toast.info(`Detected ${indianLanguages.find(lang => lang.code === detectedLanguage)?.name || detectedLanguage} language input`);
        setSelectedLanguage(detectedLanguage);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: { text: string, lang: string }) => {
    setInputValue(suggestion.text);
    setSelectedLanguage(suggestion.lang);
    // Focus on the input after selecting a suggestion
    document.getElementById('chat-input')?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getLanguageDirection = (langCode: string) => {
    // Urdu is written right-to-left
    return langCode === 'ur' ? 'rtl' : 'ltr';
  };

  return (
    <section id="chat-assistant" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-insura-lightblue text-insura-blue font-medium text-sm mb-4">
            Multilingual AI Chat Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Get Insurance Answers in Your Language
          </h2>
          <p className="text-xl text-gray-600">
            Our AI assistant provides quick, accurate answers to your insurance questions in multiple Indian languages.
          </p>
        </div>

        <div className="glass-card max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-insura-blue p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-white/20 rounded-full mr-3">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">InsuraAI Multilingual Assistant</h3>
                <p className="text-xs text-white/80">Online | Insurance Expert</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center text-sm text-white hover:text-white/80 transition-colors">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>Languages</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2 bg-white border border-gray-200 shadow-lg">
                <div className="max-h-60 overflow-y-auto">
                  {indianLanguages.map((language) => (
                    <button 
                      key={language.code}
                      onClick={() => setSelectedLanguage(language.code)}
                      className={`w-full text-left p-2 rounded text-sm hover:bg-gray-100 transition-colors ${
                        selectedLanguage === language.code ? 'bg-insura-lightblue/20 text-insura-blue' : 'text-gray-700'
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                dir={getLanguageDirection(message.language || 'en')}
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
                      className={`text-xs ml-auto flex items-center gap-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                      {message.language && (
                        <span className={`${message.sender === 'user' ? 'bg-white/20' : 'bg-gray-200'} text-xs rounded px-1`}>
                          {indianLanguages.find(l => l.code === message.language)?.code || message.language}
                        </span>
                      )}
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
                  dir={getLanguageDirection(suggestion.lang)}
                >
                  {suggestion.text}
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
                placeholder="Type in any Indian language..."
                className="flex-grow resize-none rounded-lg border border-gray-300 focus:border-insura-blue focus:ring-2 focus:ring-insura-blue/20 p-3 focus:outline-none"
                rows={1}
                dir={getLanguageDirection(selectedLanguage)}
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
            
            <div className="mt-3 text-xs flex items-center justify-between text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  <span>Privacy protected</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1 text-insura-blue" />
                  <span>For informational purposes only</span>
                </div>
              </div>
              <div className="flex items-center">
                <Globe className="w-3 h-3 mr-1 text-gray-500" />
                <span>13 languages supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatAssistant;
