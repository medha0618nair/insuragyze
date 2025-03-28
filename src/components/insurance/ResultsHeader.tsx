
import React from 'react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Shield, RefreshCw } from 'lucide-react';

interface ResultsHeaderProps {
  currency: 'USD' | 'INR';
  toggleCurrency: () => void;
  setShowResults: (show: boolean) => void;
  setActiveForm: (active: boolean) => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  currency, 
  toggleCurrency, 
  setShowResults, 
  setActiveForm 
}) => {
  return (
    <div className="cyber-card p-6 mb-8 rounded-2xl border border-insura-neon/30">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-insura-neon mr-3" />
          <h3 className="text-xl font-bold text-white">Your Personalized Recommendations</h3>
        </div>
        <div className="flex space-x-4">
          <ButtonCustom
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-insura-neon border-insura-neon"
            onClick={toggleCurrency}
          >
            <RefreshCw className="h-4 w-4" />
            {currency === 'USD' ? 'Show INR' : 'Show USD'}
          </ButtonCustom>
          <ButtonCustom
            variant="outline"
            size="sm"
            onClick={() => {
              setShowResults(false);
              setActiveForm(true);
            }}
          >
            Modify Your Details
          </ButtonCustom>
        </div>
      </div>
      <p className="mt-3 text-gray-300">
        Based on your profile, here are your top insurance plans with key benefits and major exclusions.
      </p>
    </div>
  );
};

export default ResultsHeader;
