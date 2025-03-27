
import React from 'react';
import { Shield, Check } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import PlanCard from './PlanCard';
import { RecommendedPlan } from '@/types/insurance';

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
  return (
    <div className="animate-fade-in space-y-8">
      <div className="cyber-card p-6 border border-insura-neon/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-insura-neon mr-3" />
            <h3 className="text-xl font-bold text-white">Your Personalized Recommendations</h3>
          </div>
          <div className="flex space-x-4">
            <ButtonCustom
              variant="cyber-outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={onToggleCurrency}
            >
              {currency === 'USD' ? 'Show INR' : 'Show USD'}
            </ButtonCustom>
            <ButtonCustom
              variant="cyber-outline"
              size="sm"
              onClick={onResetForm}
            >
              Modify Your Details
            </ButtonCustom>
          </div>
        </div>
        <p className="mt-3 text-gray-300">
          Based on your profile as a {formData.age}-year-old {formData.smokingStatus.toLowerCase()}, 
          here are your top insurance matches ranked by suitability.
        </p>
      </div>

      <div className="space-y-6">
        {recommendedPlans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} currency={currency} />
        ))}
      </div>
      
      <div className="cyber-card p-6 border border-gray-800">
        <h3 className="text-lg font-medium text-white mb-3">Why These Recommendations?</h3>
        <p className="text-gray-400 mb-4">
          Our AI analyzes multiple factors to find plans that best match your profile, including:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">Your age and health preferences</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">Smoking status and pre-existing conditions</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">Your budget constraints and value priorities</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">Regional factors that affect insurance pricing</span>
          </li>
        </ul>
        <div className="mt-6">
          <ButtonCustom
            variant="cyber"
            size="md"
            fullWidth
            glow={true}
            onClick={onResetForm}
          >
            Start a New Recommendation
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResults;
