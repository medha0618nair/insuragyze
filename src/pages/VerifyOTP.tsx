
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'email'>('sms');

  useEffect(() => {
    // Extract state from location if available
    if (location.state) {
      setPhone(location.state.phone || '');
      setEmail(location.state.email || '');
      setVerificationMethod(location.state.phone ? 'sms' : 'email');
    }

    // Check if user is already logged in with a verified session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/insurance-categories');
      }
    };
    
    checkSession();
  }, [location, navigate]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (verificationMethod === 'sms') {
        // Verify OTP using Supabase Auth Verify OTP endpoint
        const { data, error } = await supabase.auth.verifyOtp({
          phone,
          token: otp,
          type: 'sms'
        });

        if (error) throw error;

        toast({
          title: "Phone number verified successfully!",
          description: "Your account is now fully verified.",
        });
      } else {
        // Verify email OTP
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: 'signup'
        });

        if (error) throw error;

        toast({
          title: "Email verified successfully!",
          description: "Your account is now fully verified.",
        });
      }
      
      navigate('/insurance-categories');
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || 'Failed to verify OTP. Please try again.');
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: err.message || "Please check your code and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (verificationMethod === 'sms') {
        const { error } = await supabase.auth.signInWithOtp({
          phone: phone
        });

        if (error) throw error;

        toast({
          title: "Code resent",
          description: "A new verification code has been sent to your phone."
        });
      } else {
        // Resend email verification
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email
        });

        if (error) throw error;

        toast({
          title: "Code resent",
          description: "A new verification code has been sent to your email."
        });
      }
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.message || 'Failed to resend verification code.');
      toast({
        variant: "destructive",
        title: "Failed to resend code",
        description: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getVerificationTarget = () => {
    if (verificationMethod === 'sms') {
      // Format the phone number for display
      let displayPhone = phone;
      if (phone && phone.length > 8) {
        // Show last 4 digits for privacy
        displayPhone = "..." + phone.slice(-4);
      }
      return displayPhone || "your phone";
    } else {
      // Mask email for display
      let displayEmail = email;
      if (email && email.includes('@')) {
        const [username, domain] = email.split('@');
        displayEmail = username.slice(0, 3) + "***@" + domain;
      }
      return displayEmail || "your email";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="cyber-card rounded-2xl p-8 shadow-xl border border-insura-neon/20">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 insura-gradient-text">
                Verify Your {verificationMethod === 'sms' ? 'Phone' : 'Email'}
              </h1>
              <p className="text-gray-400">
                Enter the 6-digit code sent to {getVerificationTarget()}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-700/50 rounded-lg flex items-center text-red-400">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="mt-2 flex flex-col items-center justify-center space-y-4">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-gray-800 border-gray-700 text-white" />
                    <InputOTPSlot index={1} className="bg-gray-800 border-gray-700 text-white" />
                    <InputOTPSlot index={2} className="bg-gray-800 border-gray-700 text-white" />
                    <InputOTPSlot index={3} className="bg-gray-800 border-gray-700 text-white" />
                    <InputOTPSlot index={4} className="bg-gray-800 border-gray-700 text-white" />
                    <InputOTPSlot index={5} className="bg-gray-800 border-gray-700 text-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <ButtonCustom
                variant="primary"
                size="lg"
                type="submit"
                fullWidth
                disabled={isLoading || otp.length < 6}
                className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  'Verify Code'
                )}
              </ButtonCustom>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-insura-neon text-sm hover:underline focus:outline-none"
              >
                Didn't receive a code? Resend
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyOTP;
