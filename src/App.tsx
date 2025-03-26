
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from './components/ui/sonner';

// Import pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyOTP from './pages/VerifyOTP';
import InsuranceCategories from './pages/InsuranceCategories';
import InsuranceDetail from './pages/InsuranceDetail';
import PolicyAnalysisPage from './pages/PolicyAnalysisPage';
import ChatAssistantPage from './pages/ChatAssistantPage';
import ClaimCheckerPage from './pages/ClaimCheckerPage';
import CoverageOptimizerPage from './pages/CoverageOptimizerPage';
import PremiumCalculatorPage from './pages/PremiumCalculatorPage';
import InsurancePlanFinderPage from './pages/InsurancePlanFinderPage';
import FraudDetectionPage from './pages/FraudDetectionPage';

import './App.css';

function App() {
  return (
    <ThemeProvider enableSystem={true} defaultTheme="system">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/insurance" element={<InsuranceCategories />} />
          <Route path="/insurance/:categoryId" element={<InsuranceDetail />} />
          <Route path="/policy-analysis" element={<PolicyAnalysisPage />} />
          <Route path="/chat-assistant" element={<ChatAssistantPage />} />
          <Route path="/claim-checker" element={<ClaimCheckerPage />} />
          <Route path="/coverage-optimizer" element={<CoverageOptimizerPage />} />
          <Route path="/premium-calculator" element={<PremiumCalculatorPage />} />
          <Route path="/insurance-finder" element={<InsurancePlanFinderPage />} />
          <Route path="/fraud-detection" element={<FraudDetectionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
      <SonnerToaster />
    </ThemeProvider>
  );
}

export default App;
