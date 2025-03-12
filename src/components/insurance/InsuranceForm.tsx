
import React from 'react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { InsuranceCategory } from '@/types/insurance';

interface InsuranceFormProps {
  categoryInfo: InsuranceCategory;
  isLoading: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ 
  categoryInfo, 
  isLoading, 
  handleFormSubmit 
}) => {
  return (
    <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
        Tell Us About Your Needs
      </h2>
      <p className="text-gray-300 mb-8 text-center">
        Fill out this form to get personalized {categoryInfo.name.toLowerCase()} recommendations tailored just for you.
      </p>
      
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Age</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Zip Code</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your zip code"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Which features are most important to you?</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryInfo.coverageOptions.slice(0, 6).map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`option-${index}`}
                  className="w-4 h-4 text-insura-neon bg-gray-900 border-gray-700 rounded focus:ring-insura-neon focus:ring-opacity-25"
                />
                <label htmlFor={`option-${index}`} className="ml-2 text-sm text-gray-300">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Monthly Budget</label>
          <select className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon" required>
            <option value="">Select your budget range</option>
            <option value="budget1">$0 - $50 per month</option>
            <option value="budget2">$50 - $100 per month</option>
            <option value="budget3">$100 - $200 per month</option>
            <option value="budget4">$200 - $300 per month</option>
            <option value="budget5">$300+ per month</option>
          </select>
        </div>

        <div className="pt-4">
          <ButtonCustom
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding Your Best Plans...
              </>
            ) : "Get My Personalized Recommendations"}
          </ButtonCustom>
        </div>
      </form>
    </div>
  );
};

export default InsuranceForm;
