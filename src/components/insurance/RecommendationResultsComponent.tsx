
import React, { useState, useEffect } from 'react';
import { Shield, Check, BadgeIndianRupee, TrendingUp, Info } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import PlanCard from './PlanCard';
import { RecommendedPlan } from '@/types/insurance';
import { toast } from 'sonner';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecommendationResultsProps {
  recommendedPlans: RecommendedPlan[];
  formData: {
    age: string;
    smokingStatus: string;
  };
  currency: 'USD' | 'INR';
  onResetForm: () => void;
  onToggleCurrency: () => void;
}

const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  recommendedPlans,
  formData,
  currency,
  onResetForm,
  onToggleCurrency
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState<'cards' | 'carousel'>('cards');
  const [showInsights, setShowInsights] = useState(false);

  // Add animation when component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  // Simulate sharing a plan
  const handleSharePlan = (planName: string) => {
    // In a real implementation, this would open a share dialog or copy link to clipboard
    toast.success(`Share link for "${planName}" copied to clipboard!`);
  };

  const toggleView = () => {
    setActiveView(prev => prev === 'cards' ? 'carousel' : 'cards');
  };

  return (
    <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <Card className="mb-8 border border-insura-neon/20 bg-gradient-to-r from-slate-900 to-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-insura-neon mr-3" />
              <CardTitle className="text-white">Your Personalized Recommendations</CardTitle>
            </div>
            <div className="flex space-x-3">
              <ButtonCustom
                variant="outline"
                size="sm"
                className="text-insura-neon border-insura-neon"
                onClick={onToggleCurrency}
              >
                <BadgeIndianRupee className="w-4 h-4 mr-2" />
                {currency === 'USD' ? 'Show INR' : 'Show USD'}
              </ButtonCustom>
              
              <ButtonCustom
                variant="outline"
                size="sm"
                onClick={toggleView}
              >
                {activeView === 'cards' ? 'Carousel View' : 'Card View'}
              </ButtonCustom>
              
              <ButtonCustom
                variant="outline"
                size="sm"
                onClick={onResetForm}
              >
                Modify Details
              </ButtonCustom>
            </div>
          </div>
          <CardDescription className="text-gray-300">
            Based on your profile as a {formData.age}-year-old {formData.smokingStatus.toLowerCase()}, 
            here are your top insurance matches ranked by suitability.
          </CardDescription>
        </CardHeader>
      </Card>

      {activeView === 'carousel' ? (
        <div className="mt-8">
          <Carousel className="w-full">
            <CarouselContent>
              {recommendedPlans.map((plan, index) => (
                <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <PlanCard plan={plan} index={index} currency={currency} onShare={handleSharePlan} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      ) : (
        <div className="space-y-6">
          {recommendedPlans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`transform transition-all duration-500 hover:scale-[1.02] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} 
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <PlanCard key={plan.id} plan={plan} index={index} currency={currency} onShare={handleSharePlan} />
            </div>
          ))}
        </div>
      )}
      
      <Card className="mt-10 bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              <Info className="h-5 w-5 mr-2 text-insura-neon" />
              Why These Recommendations?
            </CardTitle>
            <ButtonCustom
              variant="ghost"
              size="sm"
              onClick={() => setShowInsights(!showInsights)}
              className="text-gray-400 hover:text-white"
            >
              {showInsights ? 'Hide Details' : 'Show Details'}
            </ButtonCustom>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-300 mb-4">
            Our AI analyzes multiple factors to find plans that best match your profile:
          </p>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ${
            showInsights ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <Card className="bg-slate-800/50 border border-slate-700/30">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm text-insura-neon">Profile Analysis</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Your age: <span className="text-white font-medium">{formData.age} years</span></span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Smoking status: <span className="text-white font-medium">{formData.smokingStatus}</span></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border border-slate-700/30">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm text-insura-neon">Coverage Optimization</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Budget constraints and value priorities</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Regional factors affecting insurance pricing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <ul className={`space-y-2 mt-4 ${showInsights ? 'hidden' : 'block'}`}>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">Your age and health preferences</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">Smoking status and pre-existing conditions</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">Your budget constraints and value priorities</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">Regional factors that affect insurance pricing</span>
            </li>
          </ul>
        </CardContent>
        
        <CardFooter>
          <ButtonCustom
            variant="primary"
            size="sm"
            fullWidth
            onClick={onResetForm}
            className="bg-gradient-to-r from-insura-blue to-insura-neon"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Start a New Recommendation
          </ButtonCustom>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecommendationResults;
