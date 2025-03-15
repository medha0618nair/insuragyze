
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/insurance-categories" element={<InsuranceCategories />} />
          <Route path="/insurance/:categoryId" element={<InsuranceDetail />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/tools/policy-analysis" element={<PolicyAnalysisPage />} />
          <Route path="/tools/premium-calculator" element={<PremiumCalculatorPage />} />
          <Route path="/tools/coverage-optimizer" element={<CoverageOptimizerPage />} />
          <Route path="/chat-assistant" element={<ChatAssistantPage />} />
          <Route path="/tools/claim-checker" element={<ClaimCheckerPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
