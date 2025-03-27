
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ClaimDetails } from '@/pages/FraudDetectionPage';

interface ClaimDetailsFormProps {
  claimDetails: ClaimDetails;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const ClaimDetailsForm: React.FC<ClaimDetailsFormProps> = ({
  claimDetails,
  onInputChange,
}) => {
  return (
    <>
      <div>
        <Label htmlFor="policyNumber" className="text-gray-300">Policy Number</Label>
        <Input
          id="policyNumber"
          name="policyNumber"
          placeholder="e.g. POL-12345"
          value={claimDetails.policyNumber}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </>
  );
};

export default ClaimDetailsForm;
