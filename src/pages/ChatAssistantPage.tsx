
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bot, Send, User, AlertCircle, Globe } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
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

const ChatAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m InsuraBot, your AI insurance assistant. How can I help you today? You can chat with me in any Indian language!',
      timestamp: new Date(),
      language: 'en'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
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
    if (inputText.trim() === '') return;
    
    // Detect language of input
    const detectedLanguage = detectLanguage(inputText);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
      language: detectedLanguage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Responses in different languages
      const botResponses: Record<string, string[]> = {
        en: [
          "Based on your situation, I'd recommend looking into a comprehensive health insurance plan with at least $500,000 in coverage.",
          "To file a claim for that damage, you'll need to provide photos of the damage, a police report, and your policy number. I can help guide you through each step.",
          "The main difference between term and whole life insurance is that term life provides coverage for a specific period, while whole life provides lifetime coverage and includes a cash value component."
        ],
        hi: [
          "आपकी स्थिति के आधार पर, मैं आपको कम से कम ₹50,00,000 की कवरेज के साथ एक व्यापक स्वास्थ्य बीमा योजना देखने की सलाह दूंगा।",
          "उस क्षति के लिए दावा दायर करने के लिए, आपको क्षति की तस्वीरें, पुलिस रिपोर्ट और आपकी पॉलिसी नंबर प्रदान करने की आवश्यकता होगी। मैं आपको प्रत्येक चरण से गुजरने में मदद कर सकता हूं।",
          "टर्म और होल लाइफ इंश्योरेंस के बीच मुख्य अंतर यह है कि टर्म लाइफ एक निश्चित अवधि के लिए कवरेज प्रदान करता है, जबकि होल लाइफ आजीवन कवरेज प्रदान करता है और इसमें एक नकद मूल्य घटक शामिल होता है।"
        ],
        kn: [
          "ನಿಮ್ಮ ಸ್ಥಿತಿಯನ್ನು ಆಧರಿಸಿ, ಕನಿಷ್ಠ ₹50,00,000 ಕವರೇಜ್ ಹೊಂದಿರುವ ಸಮಗ್ರ ಆರೋಗ್ಯ ವಿಮಾ ಯೋಜನೆಯನ್ನು ನೋಡಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ.",
          "ಆ ಹಾನಿಗೆ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಲು, ನೀವು ಹಾನಿಯ ಫೋಟೋಗಳನ್ನು, ಪೊಲೀಸ್ ವರದಿಯನ್ನು ಮತ್ತು ನಿಮ್ಮ ಪಾಲಿಸಿ ಸಂಖ್ಯೆಯನ್ನು ಒದಗಿಸಬೇಕಾಗುತ್ತದೆ. ಪ್ರತಿ ಹಂತದಲ್ಲೂ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ಮಾಡಲು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.",
          "ಟರ್ಮ್ ಮತ್ತು ಹೋಲ್ ಲೈಫ್ ಇನ್ಶುರೆನ್ಸ್ ನಡುವಿನ ಮುಖ್ಯ ವ್ಯತ್ಯಾಸವೆಂದರೆ, ಟರ್ಮ್ ಲೈಫ್ ನಿರ್ದಿಷ್ಟ ಅವಧಿಗೆ ಕವರೇಜ್ ಒದಗಿಸುತ್ತದೆ, ಆದರೆ ಹೋಲ್ ಲೈಫ್ ಜೀವನಾವಧಿ ಕವರೇಜ್ ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ನಗದು ಮೌಲ್ಯದ ಘಟಕವನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ."
        ],
        // Additional languages follow the same pattern
        ta: [
          "உங்கள் நிலைமையின் அடிப்படையில், குறைந்தபட்சம் ₹50,00,000 காப்பீட்டுடன் கூடிய ஒரு விரிவான சுகாதார காப்பீட்டுத் திட்டத்தைப் பரிந்துரைக்கிறேன்.",
          "அந்த சேதத்திற்கான உரிமைகோரலை தாக்கல் செய்ய, நீங்கள் சேதத்தின் புகைப்படங்கள், காவல்துறை அறிக்கை மற்றும் உங்கள் பாலிசி எண் ஆகியவற்றை வழங்க வேண்டும். ஒவ்வொரு படியிலும் உங்களுக்கு வழிகாட்ட நான் உதவ முடியும்."
        ],
        te: [
          "మీ పరిస్థితిని బట్టి, కనీసం ₹50,00,000 కవరేజీతో సమగ్ర ఆరోగ్య బీమా ప్లాన్‌ను చూడాలని నేను సిఫార్సు చేస్తున్నాను.",
          "ఆ నష్టానికి క్లెయిమ్ దాఖలు చేయడానికి, మీరు నష్టం యొక్క ఫోటోలు, పోలీసు నివేదిక మరియు మీ పాలసీ సంఖ్యను అందించాలి. ప్రతి దశలో మీకు మార్గనిర్దేశం చేయడానికి నేను సహాయం చేయగలను."
        ]
      };
      
      // Get responses for the detected language, or default to English
      const availableResponses = botResponses[detectedLanguage] || botResponses.en;
      const randomResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
        language: detectedLanguage
      };
      
      setMessages(prev => [...prev, botMessage]);
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

  const suggestedQuestions = [
    { text: "What's the difference between HMO and PPO health plans?", lang: "en" },
    { text: "How much life insurance do I need for my family?", lang: "en" },
    { text: "बीमा योजनाओं के बीच अंतर क्या है?", lang: "hi" },
    { text: "ಜೀವ ವಿಮೆಯ ಪ್ರಯೋಜನಗಳೇನು?", lang: "kn" },
    { text: "காப்பீட்டு பாலிசியை எப்படி தேர்வு செய்வது?", lang: "ta" }
  ];

  const getLanguageDirection = (langCode: string) => {
    // Urdu is written right-to-left
    return langCode === 'ur' ? 'rtl' : 'ltr';
  };

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
              InsuraBot Multilingual Assistant
            </h1>
            <p className="text-xl text-gray-300">
              Get instant answers in multiple Indian languages to all your insurance questions 24/7.
            </p>
          </div>

          <div className="cyber-card rounded-xl p-4 md:p-6 mb-6">
            <div className="bg-black/30 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">
                I can help with insurance questions in multiple Indian languages. Type in your preferred language, and I'll respond accordingly.
              </p>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white text-sm">Chat History</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center text-sm text-teal-400 hover:text-teal-300 transition-colors">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>Languages</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-2 bg-gray-800 border border-gray-700">
                  <div className="max-h-60 overflow-y-auto">
                    {indianLanguages.map((language) => (
                      <button 
                        key={language.code}
                        onClick={() => setSelectedLanguage(language.code)}
                        className={`w-full text-left p-2 rounded text-sm hover:bg-gray-700 transition-colors ${
                          selectedLanguage === language.code ? 'bg-gray-700' : ''
                        }`}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="h-[400px] overflow-y-auto mb-4 space-y-4 scrollbar-none p-2">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  dir={getLanguageDirection(message.language || 'en')}
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
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {message.language && (
                          <span className="bg-gray-700 text-xs rounded px-1">
                            {indianLanguages.find(l => l.code === message.language)?.code || message.language}
                          </span>
                        )}
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
                placeholder={`Type in any Indian language...`}
                className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white resize-none"
                rows={3}
                dir={getLanguageDirection(selectedLanguage)}
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
                    setInputText(question.text);
                    setSelectedLanguage(question.lang);
                  }}
                  className="text-left py-2 px-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-gray-300 transition-colors text-sm"
                  dir={getLanguageDirection(question.lang)}
                >
                  {question.text}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-12 cyber-card p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-white">Why Use Our Multilingual Assistant?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">🗣️</span>
                </div>
                <h3 className="font-medium text-white text-center mb-2">Multiple Languages</h3>
                <p className="text-gray-400 text-sm text-center">Support for Hindi, Kannada, Tamil, Telugu, and more Indian languages.</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">🔄</span>
                </div>
                <h3 className="font-medium text-white text-center mb-2">Automatic Detection</h3>
                <p className="text-gray-400 text-sm text-center">The system detects your language and responds accordingly.</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">🇮🇳</span>
                </div>
                <h3 className="font-medium text-white text-center mb-2">India-Focused</h3>
                <p className="text-gray-400 text-sm text-center">Specialized in Indian insurance policies and regional considerations.</p>
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
