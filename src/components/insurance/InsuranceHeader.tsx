
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { InsuranceCategory } from '@/types/insurance';

interface InsuranceHeaderProps {
  categoryInfo: InsuranceCategory;
  setActiveForm: (active: boolean) => void;
}

const InsuranceHeader: React.FC<InsuranceHeaderProps> = ({ categoryInfo, setActiveForm }) => {
  return (
    <div className="mb-16 text-center">
      <Link to="/insurance-categories" className="inline-flex items-center text-insura-neon mb-4 hover:underline">
        <ArrowRight className="w-4 h-4 mr-1 rotate-180" /> Back to Categories
      </Link>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-black to-gray-900 flex items-center justify-center border-2 border-insura-neon/30">
          {categoryInfo.icon}
        </div>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
        {categoryInfo.name}
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        {categoryInfo.longDescription}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <ButtonCustom 
          variant="primary" 
          size="lg"
          className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
          onClick={() => setActiveForm(true)}
        >
          Find {categoryInfo.name} Plans
        </ButtonCustom>
        <ButtonCustom 
          variant="outline" 
          size="lg"
          className="text-insura-neon border-insura-neon hover:bg-insura-neon/10"
        >
          Learn More
        </ButtonCustom>
      </div>
    </div>
  );
};

export default InsuranceHeader;
