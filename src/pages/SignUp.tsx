
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Lock, Mail, User, AlertCircle, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/insurance-categories');
      }
    };
    
    checkSession();
  }, [navigate]);

  const formatPhoneNumber = (input: string): string => {
    // Ensure phone number is in E.164 format
    let formatted = input.replace(/\D/g, '');
    
    // Check if it's an Indian number (10 digits with optional +91 prefix)
    if (formatted.startsWith('91') && formatted.length >= 12) {
      // Already has country code
      return '+' + formatted;
    } else if (formatted.length === 10) {
      // Indian number without country code
      return '+91' + formatted;
    } else if (formatted.length > 0 && !formatted.startsWith('1')) {
      // Handle US numbers as before
      formatted = '1' + formatted;
      return '+' + formatted;
    }
    
    return '+' + formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Format the phone number properly before proceeding
    const formattedPhone = formatPhoneNumber(phone);
    setPhone(formattedPhone);
    
    setIsLoading(true);

    try {
      // First, sign up the user with email and password
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: formattedPhone,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          }
        }
      });

      if (signUpError) throw signUpError;
      
      // If phone number provided, initiate SMS verification
      if (formattedPhone && formattedPhone.length > 10) {
        // Sign out from the email registration so we can do the phone verification
        await supabase.auth.signOut();
        
        // Send OTP to the phone number
        const { error: otpError } = await supabase.auth.signInWithOtp({
          phone: formattedPhone
        });

        if (otpError) throw otpError;
        
        toast({
          title: "Verification code sent",
          description: "Please check your phone for the verification code.",
        });
        
        // Navigate to OTP verification page
        navigate('/verify-otp', { state: { phone: formattedPhone, email } });
      } else {
        toast({
          title: "Account created!",
          description: "Welcome to InsuraAI. Your account has been created successfully.",
        });
        
        // If email confirmation is required, show a message
        if (!data.session) {
          toast({
            title: "Verify your email",
            description: "Please check your email to verify your account before signing in.",
          });
          navigate('/auth/signin');
        } else {
          // User is automatically signed in, redirect to main page
          navigate('/insurance-categories');
        }
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || 'Failed to create account. Please try again.');
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: err.message || "Please try again with different credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="cyber-card rounded-2xl p-8 shadow-xl border border-insura-neon/20">
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded-full bg-insura-neon/10 mb-4">
                <User className="w-8 h-8 text-insura-neon" />
              </div>
              <h1 className="text-2xl font-bold mb-2 insura-gradient-text">Sign Up for InsuraAI</h1>
              <p className="text-gray-400">Create your account to get personalized insurance recommendations</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-700/50 rounded-lg flex items-center text-red-400">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">Phone Number (for verification)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Format: +1XXXXXXXXXX (include country code)</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    placeholder="Create a password"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-insura-neon bg-gray-800 border-gray-700 rounded focus:ring-insura-neon focus:ring-opacity-25"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                  I agree to the <a href="#" className="text-insura-neon hover:underline">Terms of Service</a> and <a href="#" className="text-insura-neon hover:underline">Privacy Policy</a>
                </label>
              </div>

              <ButtonCustom
                variant="primary"
                size="lg"
                type="submit"
                fullWidth
                disabled={isLoading}
                className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20 mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </ButtonCustom>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400">
                Already have an account?{' '}
                <Link to="/auth/signin" className="text-insura-neon hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
