
import React, { useState } from 'react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { InsuranceCategory } from '@/types/insurance';
import { InsuranceFormData } from '@/services/api';
import { toast } from 'sonner';

interface InsuranceFormProps {
  categoryInfo: InsuranceCategory;
  isLoading: boolean;
  handleFormSubmit: (formData: InsuranceFormData) => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ 
  categoryInfo, 
  isLoading, 
  handleFormSubmit 
}) => {
  const [formData, setFormData] = useState<InsuranceFormData>({
    fullName: '',
    email: '',
    age: '',
    zipCode: '',
    features: [],
    budget: '',
    smokingStatus: 'Non-Smoker'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return { ...prev, features: [...prev.features, value] };
      } else {
        return { ...prev, features: prev.features.filter(feature => feature !== value) };
      }
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.age || !formData.zipCode || !formData.budget) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    handleFormSubmit(formData);
  };

  return (
    <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
        Tell Us About Your Needs
      </h2>
      <p className="text-gray-300 mb-8 text-center">
        Fill out this form to get personalized {categoryInfo.name.toLowerCase()} recommendations tailored just for you.
      </p>
      
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Age</label>
            <input 
              type="number" 
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Zip Code</label>
            <input 
              type="text" 
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
              placeholder="Enter your zip code"
              required
            />
          </div>
        </div>

        {categoryInfo.id === 'health' && (
          <div>
            <label className="block text-white text-sm font-medium mb-2">Smoking Status</label>
            <select 
              name="smokingStatus"
              value={formData.smokingStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
            >
              <option value="Non-Smoker">Non-Smoker</option>
              <option value="Smoker">Smoker</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-white text-sm font-medium mb-2">Which features are most important to you?</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryInfo.coverageOptions.slice(0, 6).map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`option-${index}`}
                  name="features"
                  value={option}
                  onChange={handleCheckboxChange}
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
          <label className="block text-white text-sm font-medium mb-2">Monthly Budget (in ₹)</label>
          <input 
            type="number" 
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon" 
            placeholder="Enter your monthly budget in INR"
            min="1000"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Enter your maximum monthly budget in Indian Rupees (₹)
          </p>
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
