
import React from 'react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { InsuranceCategory } from '@/types/insurance';

interface FAQSectionProps {
  categoryInfo: InsuranceCategory;
  setActiveForm: (active: boolean) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ categoryInfo, setActiveForm }) => {
  return (
    <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
        Common Questions About {categoryInfo.name}
      </h2>
      <div className="space-y-6">
        {categoryInfo.commonQuestions.map((qa, index) => (
          <div key={index} className="bg-black/60 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-3 text-white">{qa.question}</h3>
            <p className="text-gray-300">{qa.answer}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <ButtonCustom 
          variant="outline" 
          size="lg"
          className="text-insura-neon border-insura-neon hover:bg-insura-neon/10"
          onClick={() => setActiveForm(true)}
        >
          Compare {categoryInfo.name} Plans
        </ButtonCustom>
      </div>
    </div>
  );
};

export default FAQSection;
