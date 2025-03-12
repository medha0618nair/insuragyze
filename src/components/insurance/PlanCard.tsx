
import React from 'react';
import { Check, Heart, ThumbsUp } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { RecommendedPlan } from '@/types/insurance';

interface PlanCardProps {
  plan: RecommendedPlan;
  index: number;
  currency: 'USD' | 'INR';
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, index, currency }) => {
  return (
    <div 
      className={`cyber-card rounded-xl overflow-hidden border transition-all ${
        index === 0 ? 'border-insura-neon/70 shadow-lg shadow-insura-neon/20 scale-[1.02]' : 'border-gray-800 hover:shadow-lg hover:shadow-insura-purple/10 hover:-translate-y-1'
      }`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            {index === 0 && (
              <div className="inline-block px-3 py-1 rounded-full bg-insura-neon text-black text-xs font-medium mb-2 flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                Best Match
              </div>
            )}
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            <p className="text-sm text-gray-400">by {plan.provider}</p>
          </div>
          
          <div className="flex items-center">
            <div className="bg-insura-neon/10 rounded-lg py-2 px-3 flex items-center">
              <ThumbsUp className="h-5 w-5 text-insura-neon mr-1" />
              <span className="font-bold text-insura-neon">{plan.suitabilityScore}% Match</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Monthly Premium</p>
            <p className="text-xl font-bold text-white">
              {currency === 'USD' ? plan.monthlyPremium : plan.monthlyPremiumINR}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Coverage Amount</p>
            <p className="text-xl font-bold text-white">
              {currency === 'USD' ? plan.coverageAmount : plan.coverageAmountINR}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Best For</p>
            <p className="text-base font-medium text-gray-300">{plan.description}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">Key Benefits</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {plan.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center">
                <Check className="h-4 w-4 text-insura-neon mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <ButtonCustom
            variant={index === 0 ? "primary" : "outline"}
            className={index === 0 ? "bg-gradient-to-r from-insura-neon to-insura-purple" : "text-insura-neon border-insura-neon"}
          >
            Get More Details
          </ButtonCustom>
          
          <ButtonCustom
            variant={index === 0 ? "outline" : "ghost"}
            className={index === 0 ? "text-insura-neon border-insura-neon" : "text-gray-300"}
          >
            Compare
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
