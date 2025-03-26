
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
    <div className="animate-fade-in">
      <div className="bg-insura-blue/5 rounded-2xl p-6 mb-8 border border-insura-blue/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-insura-blue mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Your Personalized Recommendations</h3>
          </div>
          <div className="flex space-x-2">
            <ButtonCustom
              variant="outline"
              size="sm"
              className="text-insura-blue border-insura-blue"
              onClick={onToggleCurrency}
            >
              {currency === 'USD' ? 'Show INR' : 'Show USD'}
            </ButtonCustom>
            <ButtonCustom
              variant="outline"
              size="sm"
              onClick={onResetForm}
            >
              Modify Your Details
            </ButtonCustom>
          </div>
        </div>
        <p className="mt-3 text-gray-600">
          Based on your profile as a {formData.age}-year-old {formData.smokingStatus.toLowerCase()}, 
          here are your top insurance matches ranked by suitability.
        </p>
      </div>

      <div className="space-y-6">
        {recommendedPlans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} currency={currency} />
        ))}
      </div>
      
      <div className="mt-10 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Why These Recommendations?</h3>
        <p className="text-gray-600 mb-4">
          Our AI analyzes multiple factors to find plans that best match your profile, including:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Your age and health preferences</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Smoking status and pre-existing conditions</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Your budget constraints and value priorities</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Regional factors that affect insurance pricing</span>
          </li>
        </ul>
        <div className="mt-4">
          <ButtonCustom
            variant="primary"
            size="sm"
            fullWidth
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
