
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClaimData } from '@/services/claimService';

interface IncidentInfoFormProps {
  claimData: ClaimData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const IncidentInfoForm: React.FC<IncidentInfoFormProps> = ({
  claimData,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <>
      <div className="md:col-span-2 mt-4">
        <h3 className="text-xl font-semibold mb-2 text-white">Incident Information</h3>
      </div>

      <div>
        <Label htmlFor="INCIDENT_SEVERITY" className="text-gray-300">Incident Severity</Label>
        <Select 
          value={claimData.INCIDENT_SEVERITY} 
          onValueChange={(value) => onSelectChange('INCIDENT_SEVERITY', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Minor">Minor</SelectItem>
            <SelectItem value="Moderate">Moderate</SelectItem>
            <SelectItem value="Major">Major</SelectItem>
            <SelectItem value="Severe">Severe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="INCIDENT_HOUR_OF_THE_DAY" className="text-gray-300">Incident Hour (0-23)</Label>
        <Input
          id="INCIDENT_HOUR_OF_THE_DAY"
          name="INCIDENT_HOUR_OF_THE_DAY"
          type="number"
          min="0"
          max="23"
          placeholder="e.g. 14"
          value={claimData.INCIDENT_HOUR_OF_THE_DAY || ''}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="ANY_INJURY" className="text-gray-300">Any Injury (0 = No, 1 = Yes)</Label>
        <RadioGroup 
          value={claimData.ANY_INJURY.toString()} 
          onValueChange={(value) => onSelectChange('ANY_INJURY', value)}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="injury-no" />
            <Label htmlFor="injury-no" className="text-gray-300">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="injury-yes" />
            <Label htmlFor="injury-yes" className="text-gray-300">Yes</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="RISK_SEGMENTATION" className="text-gray-300">Risk Segmentation</Label>
        <Select 
          value={claimData.RISK_SEGMENTATION} 
          onValueChange={(value) => onSelectChange('RISK_SEGMENTATION', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select risk level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low Risk">Low Risk</SelectItem>
            <SelectItem value="Medium Risk">Medium Risk</SelectItem>
            <SelectItem value="High Risk">High Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default IncidentInfoForm;
