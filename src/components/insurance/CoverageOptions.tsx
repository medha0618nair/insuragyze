
import React from 'react';
import { Check } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { InsuranceCategory } from '@/types/insurance';

interface CoverageOptionsProps {
  categoryInfo: InsuranceCategory;
  setActiveForm: (active: boolean) => void;
}

const CoverageOptions: React.FC<CoverageOptionsProps> = ({ categoryInfo, setActiveForm }) => {
  return (
    <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto mb-16">
      <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
        What {categoryInfo.name} Typically Covers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryInfo.coverageOptions.map((option, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-3 mt-1">
              <Check className="w-5 h-5 text-insura-neon" />
            </div>
            <p className="text-gray-300">{option}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <ButtonCustom 
          variant="primary" 
          size="lg"
          className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
          onClick={() => setActiveForm(true)}
        >
          Find {categoryInfo.name} Plans
        </ButtonCustom>
      </div>
    </div>
  );
};

export default CoverageOptions;
