
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Shield, 
  Home, 
  User, 
  FileText, 
  MessageSquare, 
  CheckSquare, 
  BarChart3, 
  Calculator, 
  Search,
  AlertTriangle
} from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';
import { useAuth } from '@/hooks/use-auth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems: NavItem[] = [
    { label: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { label: 'Insurance Plans', path: '/insurance', icon: <Shield className="h-5 w-5" /> },
    { label: 'Policy Analysis', path: '/policy-analysis', icon: <FileText className="h-5 w-5" /> },
    { label: 'Chat Assistant', path: '/chat-assistant', icon: <MessageSquare className="h-5 w-5" /> },
    { label: 'Claim Checker', path: '/claim-checker', icon: <CheckSquare className="h-5 w-5" /> },
    { label: 'Coverage Optimizer', path: '/coverage-optimizer', icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Premium Calculator', path: '/premium-calculator', icon: <Calculator className="h-5 w-5" /> },
    { label: 'Insurance Finder', path: '/insurance-finder', icon: <Search className="h-5 w-5" /> },
    { label: 'Fraud Detection', path: '/fraud-detection', icon: <AlertTriangle className="h-5 w-5" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-insura-neon" />
              <span className="ml-2 text-xl font-bold tracking-wider">InsuraGuard</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-800 ${
                      location.pathname === item.path ? 'bg-gray-800 text-insura-neon' : 'text-gray-300'
                    }`}
                    onClick={closeMenu}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* User authentication buttons/profile */}
          <div className="hidden md:block">
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center text-sm text-gray-300 hover:text-white">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                      alt="User avatar"
                    />
                    <span className="ml-2">{user.name}</span>
                  </Link>
                  <ButtonCustom
                    variant="outline"
                    size="sm"
                    onClick={logout}
                  >
                    Sign Out
                  </ButtonCustom>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/sign-in">
                    <ButtonCustom variant="ghost" size="sm">
                      Sign In
                    </ButtonCustom>
                  </Link>
                  <Link to="/sign-up">
                    <ButtonCustom variant="primary" size="sm">
                      Sign Up
                    </ButtonCustom>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  location.pathname === item.path ? 'bg-gray-900 text-insura-neon' : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={closeMenu}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            {/* Mobile authentication buttons */}
            <div className="pt-4 pb-3 border-t border-gray-700">
              {user ? (
                <>
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                        alt="User avatar"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.name}</div>
                      <div className="text-sm font-medium text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700">
                      Your Profile
                    </Link>
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 px-2 space-y-1">
                  <Link to="/sign-in" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700">
                    Sign In
                  </Link>
                  <Link to="/sign-up" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
