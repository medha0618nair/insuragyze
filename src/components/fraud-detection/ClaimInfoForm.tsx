
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClaimData } from '@/services/claimService';

interface ClaimInfoFormProps {
  claimData: ClaimData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const ClaimInfoForm: React.FC<ClaimInfoFormProps> = ({
  claimData,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <>
      <div className="md:col-span-2 mt-4">
        <h3 className="text-xl font-semibold mb-2 text-white">Claim Information</h3>
      </div>

      <div>
        <Label htmlFor="CLAIM_AMOUNT" className="text-gray-300">Claim Amount ($)</Label>
        <Input
          id="CLAIM_AMOUNT"
          name="CLAIM_AMOUNT"
          type="number"
          placeholder="e.g. 5000"
          value={claimData.CLAIM_AMOUNT || ''}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="days_to_loss" className="text-gray-300">Days to Loss</Label>
        <Input
          id="days_to_loss"
          name="days_to_loss"
          type="number"
          placeholder="e.g. 30"
          value={claimData.days_to_loss || ''}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="claim_premium_ratio" className="text-gray-300">Claim/Premium Ratio</Label>
        <Input
          id="claim_premium_ratio"
          name="claim_premium_ratio"
          type="number"
          step="0.01"
          placeholder="e.g. 1.5"
          value={claimData.claim_premium_ratio || ''}
          onChange={onInputChange}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <p className="text-xs text-gray-400 mt-1">
          Optional: Auto-calculated if left empty
        </p>
      </div>

      <div>
        <Label htmlFor="CLAIM_STATUS" className="text-gray-300">Claim Status</Label>
        <Select 
          value={claimData.CLAIM_STATUS} 
          onValueChange={(value) => onSelectChange('CLAIM_STATUS', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Pending Documentation">Pending Documentation</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ClaimInfoForm;
