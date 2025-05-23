
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InsuranceCategories from "./pages/InsuranceCategories";
import InsuranceDetail from "./pages/InsuranceDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PolicyAnalysisPage from "./pages/PolicyAnalysisPage";
import PremiumCalculatorPage from "./pages/PremiumCalculatorPage";
import CoverageOptimizerPage from "./pages/CoverageOptimizerPage";
import ChatAssistantPage from "./pages/ChatAssistantPage";
import ClaimCheckerPage from "./pages/ClaimCheckerPage";
import FraudDetectionPage from "./pages/FraudDetectionPage";
import VerifyOTP from "./pages/VerifyOTP";
import InsuranceRecommender from "./components/InsuranceRecommender";
import { AuthProvider } from "@/hooks/use-auth";
import PolicyVisualizationPage from "@/pages/PolicyVisualizationPage";
import CoverageSimulatorPage from "@/pages/CoverageSimulatorPage";

function App() {
  // Create a new QueryClient instance for each component render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/insurance-categories" element={<InsuranceCategories />} />
              <Route path="/insurance/:categoryId" element={<InsuranceDetail />} />
              <Route path="/insurance-recommender" element={<InsuranceRecommender />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/tools/policy-analysis" element={<PolicyAnalysisPage />} />
              <Route path="/tools/policy-visualization" element={<PolicyVisualizationPage />} />
              <Route path="/tools/premium-calculator" element={<PremiumCalculatorPage />} />
              <Route path="/tools/coverage-optimizer" element={<CoverageOptimizerPage />} />
              <Route path="/tools/coverage-simulator" element={<CoverageSimulatorPage />} />
              <Route path="/chat-assistant" element={<ChatAssistantPage />} />
              <Route path="/tools/claim-checker" element={<ClaimCheckerPage />} />
              <Route path="/tools/fraud-detection" element={<FraudDetectionPage />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
