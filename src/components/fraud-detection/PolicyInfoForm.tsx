
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClaimData } from '@/services/claimService';

interface PolicyInfoFormProps {
  claimData: ClaimData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const PolicyInfoForm: React.FC<PolicyInfoFormProps> = ({
  claimData,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <>
      <div>
        <Label htmlFor="INSURANCE_TYPE" className="text-gray-300">Insurance Type</Label>
        <Select 
          value={claimData.INSURANCE_TYPE} 
          onValueChange={(value) => onSelectChange('INSURANCE_TYPE', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select insurance type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Auto">Auto</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
            <SelectItem value="Life">Life</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="PREMIUM_AMOUNT" className="text-gray-300">Premium Amount ($)</Label>
        <Input
          id="PREMIUM_AMOUNT"
          name="PREMIUM_AMOUNT"
          type="number"
          placeholder="e.g. 1200"
          value={claimData.PREMIUM_AMOUNT || ''}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="TENURE" className="text-gray-300">Tenure (years)</Label>
        <Input
          id="TENURE"
          name="TENURE"
          type="number"
          placeholder="e.g. 3"
          value={claimData.TENURE || ''}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </>
  );
};

export default PolicyInfoForm;
