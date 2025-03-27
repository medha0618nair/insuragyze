
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
  // Handler for the quick claim switch toggle
  const handleQuickClaimToggle = (checked: boolean) => {
    onSelectChange('quick_claim', checked ? '1' : '0');
  };

  return (
    <>
      <div className="md:col-span-2 mt-4">
        <h3 className="text-xl font-semibold mb-2 text-white">Fraud Detection Parameters</h3>
        <p className="text-sm text-gray-400 mb-4">
          Please provide these 5 key parameters required by our fraud detection AI model.
        </p>
      </div>

      <div>
        <Label htmlFor="CLAIM_AMOUNT" className="text-gray-300">1. Claim Amount ($)</Label>
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
        <p className="text-xs text-gray-400 mt-1">
          The total amount being claimed in USD
        </p>
      </div>

      <div>
        <Label htmlFor="days_to_loss" className="text-gray-300">2. Days to Loss</Label>
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
        <p className="text-xs text-gray-400 mt-1">
          Number of days between policy start date and the incident
        </p>
      </div>

      <div>
        <Label htmlFor="claim_premium_ratio" className="text-gray-300">3. Claim/Premium Ratio</Label>
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
          Ratio of claim amount to premium amount (auto-calculated if left empty)
        </p>
      </div>

      <div>
        <Label htmlFor="avg_claim_amount" className="text-gray-300">4. Average Claim Amount ($)</Label>
        <Input
          id="avg_claim_amount"
          name="avg_claim_amount"
          type="number"
          placeholder="e.g. 4000"
          value={claimData.avg_claim_amount || ''}
          onChange={onInputChange}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <p className="text-xs text-gray-400 mt-1">
          Average claim amount for similar incidents
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="quick_claim" className="text-gray-300">5. Quick Claim Filing</Label>
          <Switch 
            id="quick_claim"
            checked={claimData.quick_claim === 1 || claimData.quick_claim === '1'}
            onCheckedChange={handleQuickClaimToggle}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Was the claim filed unusually quickly after the incident?
        </p>
      </div>
    </>
  );
};

export default ClaimInfoForm;
