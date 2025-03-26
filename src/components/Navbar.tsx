
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, LogOut, User } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial user session
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    getInitialSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      
      // Close the menu
      setIsMenuOpen(false);
      
      // Navigate to home
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred while signing out",
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMenuOpen(false);
  };

  // Get user name and avatar from Supabase user metadata
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userAvatar = user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;

  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-md border-b border-insura-neon/20 fixed w-full z-50">
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
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-insura-neon/30">
                    <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-gray-300">{userName}</span>
                </div>
                <ButtonCustom 
                  variant="ghost" 
                  size="sm" 
                  className="text-insura-neon hover:text-white hover:bg-insura-neon/20"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </ButtonCustom>
              </div>
            ) : (
              <>
                <Link to="/auth/signin">
                  <ButtonCustom variant="ghost" size="sm" 
                    className="text-insura-neon hover:text-white hover:bg-insura-neon/20">
                    Sign In
                  </ButtonCustom>
                </Link>
                <Link to="/auth/signup">
                  <ButtonCustom variant="primary" size="sm" 
                    className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20">
                    Get Started
                  </ButtonCustom>
                </Link>
              </>
            )}
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
        <div className="px-4 py-3 space-y-3 bg-black/95 backdrop-blur-md shadow-md">
          <button 
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-insura-neon/10 text-gray-300 hover:text-insura-neon transition-colors"
          >
            Features
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
          
          {user ? (
            <div className="pt-2 space-y-2">
              <div className="flex items-center space-x-2 px-3 py-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-insura-neon/30">
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-300">{userName}</span>
              </div>
              
              <button 
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col space-y-2">
              <Link to="/auth/signin" className="w-full">
                <ButtonCustom variant="ghost" size="sm" fullWidth 
                  className="text-insura-neon hover:bg-insura-neon/10">
                  Sign In
                </ButtonCustom>
              </Link>
              <Link to="/auth/signup" className="w-full">
                <ButtonCustom variant="primary" size="sm" fullWidth
                  className="bg-gradient-to-r from-insura-neon to-insura-purple">
                  Get Started
                </ButtonCustom>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
