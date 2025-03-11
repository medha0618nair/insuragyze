
import React from 'react';
import { Mail, PhoneCall, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 insura-gradient-text">InsuraAI</h3>
            <p className="text-gray-400 mb-6">
              Making insurance simple, accessible, and transparent with the power of artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-insura-blue transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-insura-blue transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-insura-blue transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-insura-blue transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a href="#policy-analyzer" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Policy Analyzer
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Features
                </a>
              </li>
              <li>
                <a href="#chat-assistant" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Chat Assistant
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-insura-blue flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Tech Plaza, Suite 500<br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="mr-3 text-insura-blue flex-shrink-0" />
                <a href="tel:+14155552671" className="text-gray-400 hover:text-white transition-colors duration-300">
                  (415) 555-2671
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-insura-blue flex-shrink-0" />
                <a href="mailto:info@insura-ai.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                  info@insura-ai.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Subscribe to Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest insurance trends and AI advancements.
            </p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-insura-blue"
              />
              <ButtonCustom 
                variant="primary" 
                size="md" 
                fullWidth
              >
                Subscribe
              </ButtonCustom>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 mt-12 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} InsuraAI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
