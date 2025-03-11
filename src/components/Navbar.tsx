
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';
import { Link } from 'react-router-dom';

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
    <nav className="bg-insura-cyberdark/90 backdrop-blur-md shadow-md border-b border-insura-neon/20 fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold insura-gradient-text">Insura<span className="text-insura-neon">AI</span></span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-6">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-300 hover:text-insura-neon transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('insurance-recommender')} 
                className="text-gray-300 hover:text-insura-neon transition-colors"
              >
                Insurance Finder
              </button>
              <button 
                onClick={() => scrollToSection('policy-analyzer')} 
                className="text-gray-300 hover:text-insura-neon transition-colors"
              >
                Policy Analyzer
              </button>
              <button 
                onClick={() => scrollToSection('chat-assistant')} 
                className="text-gray-300 hover:text-insura-neon transition-colors"
              >
                Chat Assistant
              </button>
              <button 
                onClick={() => scrollToSection('ai-tools')} 
                className="text-gray-300 hover:text-insura-neon transition-colors"
              >
                AI Tools
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth/signin">
              <ButtonCustom variant="ghost" size="sm" 
                className="text-insura-neon hover:text-white hover:bg-insura-neon/20">
                Sign In
              </ButtonCustom>
            </Link>
            <Link to="/insurance-categories">
              <ButtonCustom variant="primary" size="sm" 
                className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20">
                Get Started
              </ButtonCustom>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-300 hover:text-insura-neon transition-colors focus:outline-none"
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
        <div className="px-4 py-3 space-y-3 bg-insura-cyberdark/95 backdrop-blur-md shadow-md">
          <button 
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-neon/10 text-gray-300 hover:text-insura-neon transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('insurance-recommender')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-neon/10 text-gray-300 hover:text-insura-neon transition-colors"
          >
            Insurance Finder
          </button>
          <button 
            onClick={() => scrollToSection('policy-analyzer')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-neon/10 text-gray-300 hover:text-insura-neon transition-colors"
          >
            Policy Analyzer
          </button>
          <button 
            onClick={() => scrollToSection('chat-assistant')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-neon/10 text-gray-300 hover:text-insura-neon transition-colors"
          >
            Chat Assistant
          </button>
          <button 
            onClick={() => scrollToSection('ai-tools')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-neon/10 text-gray-300 hover:text-insura-neon transition-colors"
          >
            AI Tools
          </button>
          
          <div className="pt-2 flex flex-col space-y-2">
            <Link to="/auth/signin" className="w-full">
              <ButtonCustom variant="ghost" size="sm" fullWidth 
                className="text-insura-neon hover:bg-insura-neon/10">
                Sign In
              </ButtonCustom>
            </Link>
            <Link to="/insurance-categories" className="w-full">
              <ButtonCustom variant="primary" size="sm" fullWidth
                className="bg-gradient-to-r from-insura-neon to-insura-purple">
                Get Started
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
