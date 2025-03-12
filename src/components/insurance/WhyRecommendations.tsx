
import React from 'react';
import { Check } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

interface WhyRecommendationsProps {
  setShowResults: (show: boolean) => void;
  setActiveForm: (active: boolean) => void;
}

const WhyRecommendations: React.FC<WhyRecommendationsProps> = ({ 
  setShowResults, 
  setActiveForm 
}) => {
  return (
    <div className="mt-10 bg-black/50 rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-medium text-white mb-3">Why These Recommendations?</h3>
      <p className="text-gray-300 mb-4">
        Our AI analyzes multiple factors to find plans that best match your profile, including:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start">
          <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-gray-300">Your age and family composition</span>
        </li>
        <li className="flex items-start">
          <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-gray-300">Medical history and specific coverage needs</span>
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
      <div className="mt-4">
        <ButtonCustom
          variant="primary"
          size="sm"
          fullWidth
          className="bg-gradient-to-r from-insura-neon to-insura-purple"
          onClick={() => {
            setShowResults(false);
            setActiveForm(false);
          }}
        >
          Start a New Recommendation
        </ButtonCustom>
      </div>
    </div>
  );
};

export default WhyRecommendations;
