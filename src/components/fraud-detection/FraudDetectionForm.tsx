
import React from 'react';
import { Search } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import ClaimDetailsForm from './ClaimDetailsForm';
import CustomerInfoForm from './CustomerInfoForm';
import PolicyInfoForm from './PolicyInfoForm';
import ClaimInfoForm from './ClaimInfoForm';
import IncidentInfoForm from './IncidentInfoForm';
import { ClaimData } from '@/services/claimService';
import { ClaimDetails } from '@/pages/FraudDetectionPage';

interface FraudDetectionFormProps {
  claimData: ClaimData;
  claimDetails: ClaimDetails;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const FraudDetectionForm: React.FC<FraudDetectionFormProps> = ({
  claimData,
  claimDetails,
  isLoading,
  onInputChange,
  onSelectChange,
  onSubmit,
}) => {
  return (
    <div className="glass-card p-6 overflow-y-auto max-h-[800px]">
      <h2 className="text-2xl font-semibold mb-4 text-white">Claim Details</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Policy Information */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2 text-white">Policy Information</h3>
          </div>
          
          <ClaimDetailsForm
            claimDetails={claimDetails}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
          />
          
          <PolicyInfoForm
            claimData={claimData}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
          />

          {/* Customer Information */}
          <CustomerInfoForm
            claimData={claimData}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
          />

          {/* Claim Information */}
          <ClaimInfoForm
            claimData={claimData}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
          />

          {/* Incident Information */}
          <IncidentInfoForm
            claimData={claimData}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
          />
        </div>
        
        <ButtonCustom
          type="submit"
          variant="cyber"
          size="md"
          className="w-full mt-4"
          glow={true}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Check for Fraud
            </span>
          )}
        </ButtonCustom>
      </form>
    </div>
  );
};

export default FraudDetectionForm;
