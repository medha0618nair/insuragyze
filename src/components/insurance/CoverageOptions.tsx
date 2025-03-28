
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
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
        {categoryInfo.name} Benefits & Exclusions
      </h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-insura-neon">Key Benefits</h3>
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
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-500">Major Exclusions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryInfo.commonQuestions.slice(0, 2).map((question, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-3 mt-1">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-gray-300">{question.answer}</p>
            </div>
          ))}
        </div>
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
