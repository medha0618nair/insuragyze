
import React from 'react';
import { Check, Heart, ThumbsUp, Star, Shield, TrendingUp, Info, Share2 } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { RecommendedPlan } from '@/types/insurance';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlanCardProps {
  plan: RecommendedPlan;
  index: number;
  currency: 'USD' | 'INR';
  onShare?: (planName: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, index, currency, onShare }) => {
  // Determine if this is the best match
  const isBestMatch = index === 0;
  
  // Get gradient based on index for dynamic coloring
  const getGradient = () => {
    if (isBestMatch) return "from-insura-neon/20 to-insura-purple/20";
    if (index === 1) return "from-blue-500/10 to-blue-700/10";
    if (index === 2) return "from-teal-500/10 to-teal-700/10";
    return "from-slate-700/20 to-slate-800/20";
  };

  // Handle share button click
  const handleShare = () => {
    if (onShare) onShare(plan.name);
  };

  return (
    <Card 
      className={`cyber-card overflow-hidden border transition-all duration-300 hover:shadow-lg backdrop-blur-sm bg-gradient-to-r ${getGradient()} ${
        isBestMatch ? 'border-insura-neon/70 shadow-lg shadow-insura-neon/20 scale-[1.02]' : 'border-gray-800/50 hover:shadow-insura-purple/10 hover:-translate-y-1'
      }`}
    >
      <CardHeader className="p-6 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {isBestMatch && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-insura-neon to-insura-purple text-black text-xs font-medium mb-2 animate-pulse">
                <Star className="h-3 w-3 mr-1" />
                Best Match
              </div>
            )}
            <CardTitle className="text-xl font-bold text-white">{plan.name}</CardTitle>
            <CardDescription className="text-sm text-gray-400">by {plan.provider}</CardDescription>
          </div>
          
          <div className="flex items-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg py-2 px-3 flex items-center border border-insura-neon/30">
              <ThumbsUp className="h-5 w-5 text-insura-neon mr-1" />
              <span className="font-bold text-insura-neon">{plan.suitabilityScore}% Match</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-1">Monthly Premium</p>
            <p className="text-xl font-bold text-white flex items-center">
              {currency === 'USD' ? plan.monthlyPremium : plan.monthlyPremiumINR}
              <span className="ml-2 text-xs py-0.5 px-1.5 bg-insura-neon/10 text-insura-neon rounded">
                {currency}
              </span>
            </p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-1">Coverage Amount</p>
            <p className="text-xl font-bold text-white">
              {currency === 'USD' ? plan.coverageAmount : plan.coverageAmountINR}
            </p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-1">Best For</p>
            <p className="text-base font-medium text-gray-300">{plan.description}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-1 text-insura-neon" />
            Key Benefits
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {plan.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center group transition-all duration-300">
                <div className="h-6 w-6 rounded-full bg-insura-neon/10 flex items-center justify-center mr-2 group-hover:bg-insura-neon/20">
                  <Check className="h-4 w-4 text-insura-neon flex-shrink-0" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
        <ButtonCustom
          variant={isBestMatch ? "primary" : "outline"}
          className={isBestMatch 
            ? "bg-gradient-to-r from-insura-neon to-insura-purple hover:opacity-90 transition-opacity" 
            : "text-insura-neon border-insura-neon hover:bg-insura-neon/10"
          }
        >
          Get More Details
        </ButtonCustom>
        
        <ButtonCustom
          variant="ghost"
          className="text-gray-300 hover:text-white"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </ButtonCustom>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
