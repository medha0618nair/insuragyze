
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PolicyAnalyzer from '@/components/PolicyAnalyzer';
import ChatAssistant from '@/components/ChatAssistant';
import Testimonials from '@/components/Testimonials';
import AITools from '@/components/AITools';
import Footer from '@/components/Footer';

const Index = () => {
  // Update page title when component mounts
  useEffect(() => {
    document.title = 'InsuraAI - Understand Insurance with AI';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-insura-cyberdark to-black overflow-x-hidden">
      <div className="absolute inset-0 cyber-dots-bg opacity-30 pointer-events-none"></div>
      <Navbar />
      <Hero />
      <Features />
      <PolicyAnalyzer />
      <ChatAssistant />
      <AITools />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
