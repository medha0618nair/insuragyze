
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-insura-blue">Insura<span className="text-insura-darkblue">AI</span></span>
            </a>
            <div className="hidden md:flex ml-10 space-x-6">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-600 hover:text-insura-blue transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('insurance-recommender')} 
                className="text-gray-600 hover:text-insura-blue transition-colors"
              >
                Insurance Finder
              </button>
              <button 
                onClick={() => scrollToSection('policy-analyzer')} 
                className="text-gray-600 hover:text-insura-blue transition-colors"
              >
                Policy Analyzer
              </button>
              <button 
                onClick={() => scrollToSection('chat-assistant')} 
                className="text-gray-600 hover:text-insura-blue transition-colors"
              >
                Chat Assistant
              </button>
              <button 
                onClick={() => scrollToSection('ai-tools')} 
                className="text-gray-600 hover:text-insura-blue transition-colors"
              >
                AI Tools
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ButtonCustom variant="ghost" size="sm">Sign In</ButtonCustom>
            <ButtonCustom variant="primary" size="sm">Get Started</ButtonCustom>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-insura-blue transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 py-3 space-y-3 bg-white shadow-md">
          <button 
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-lightblue text-gray-600 hover:text-insura-blue transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('insurance-recommender')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-lightblue text-gray-600 hover:text-insura-blue transition-colors"
          >
            Insurance Finder
          </button>
          <button 
            onClick={() => scrollToSection('policy-analyzer')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-lightblue text-gray-600 hover:text-insura-blue transition-colors"
          >
            Policy Analyzer
          </button>
          <button 
            onClick={() => scrollToSection('chat-assistant')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-lightblue text-gray-600 hover:text-insura-blue transition-colors"
          >
            Chat Assistant
          </button>
          <button 
            onClick={() => scrollToSection('ai-tools')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-lightblue text-gray-600 hover:text-insura-blue transition-colors"
          >
            AI Tools
          </button>
          
          <div className="pt-2 flex flex-col space-y-2">
            <ButtonCustom variant="ghost" size="sm" fullWidth>Sign In</ButtonCustom>
            <ButtonCustom variant="primary" size="sm" fullWidth>Get Started</ButtonCustom>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
