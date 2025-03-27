
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ClaimDetails } from '@/pages/FraudDetectionPage';

interface ClaimDetailsFormProps {
  claimDetails: ClaimDetails;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const ClaimDetailsForm: React.FC<ClaimDetailsFormProps> = ({
  claimDetails,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <>
      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-2 text-white">Policy Information</h3>
      </div>
      
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
      
      <div>
        <Label htmlFor="claimDate" className="text-gray-300">Claim Date</Label>
        <Input
          id="claimDate"
          name="claimDate"
          type="date"
          value={claimDetails.claimDate}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="submissionMethod" className="text-gray-300">Submission Method</Label>
        <Select 
          value={claimDetails.submissionMethod} 
          onValueChange={(value: 'online' | 'phone' | 'agent' | 'email') => onSelectChange('submissionMethod', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="claimDescription" className="text-gray-300">Claim Description</Label>
        <Textarea
          id="claimDescription"
          name="claimDescription"
          rows={3}
          placeholder="Describe the claim details..."
          value={claimDetails.claimDescription}
          onChange={onInputChange}
          required
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
        />
      </div>
    </>
  );
};

export default ClaimDetailsForm;
