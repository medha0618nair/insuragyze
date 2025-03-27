
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClaimData } from '@/services/claimService';

interface CustomerInfoFormProps {
  claimData: ClaimData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  claimData,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <>
      <div className="md:col-span-2 mt-4">
        <h3 className="text-xl font-semibold mb-2 text-white">Customer Information</h3>
      </div>

      <div>
        <Label htmlFor="AGE" className="text-gray-300">Age</Label>
        <Input
          id="AGE"
          name="AGE"
          type="number"
          placeholder="e.g. 35"
          value={claimData.AGE || ''}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <Label htmlFor="MARITAL_STATUS" className="text-gray-300">Marital Status</Label>
        <Select 
          value={claimData.MARITAL_STATUS} 
          onValueChange={(value) => onSelectChange('MARITAL_STATUS', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Single">Single</SelectItem>
            <SelectItem value="Married">Married</SelectItem>
            <SelectItem value="Divorced">Divorced</SelectItem>
            <SelectItem value="Widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="EMPLOYMENT_STATUS" className="text-gray-300">Employment Status</Label>
        <Select 
          value={claimData.EMPLOYMENT_STATUS} 
          onValueChange={(value) => onSelectChange('EMPLOYMENT_STATUS', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select employment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Employed">Employed</SelectItem>
            <SelectItem value="Self-employed">Self-employed</SelectItem>
            <SelectItem value="Unemployed">Unemployed</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
            <SelectItem value="Student">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="CUSTOMER_EDUCATION_LEVEL" className="text-gray-300">Education Level</Label>
        <Select 
          value={claimData.CUSTOMER_EDUCATION_LEVEL} 
          onValueChange={(value) => onSelectChange('CUSTOMER_EDUCATION_LEVEL', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High School">High School</SelectItem>
            <SelectItem value="College">College</SelectItem>
            <SelectItem value="Bachelor">Bachelor</SelectItem>
            <SelectItem value="Master">Master</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="SOCIAL_CLASS" className="text-gray-300">Social Class</Label>
        <Select 
          value={claimData.SOCIAL_CLASS} 
          onValueChange={(value) => onSelectChange('SOCIAL_CLASS', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Working">Working</SelectItem>
            <SelectItem value="Middle">Middle</SelectItem>
            <SelectItem value="Upper-middle">Upper-middle</SelectItem>
            <SelectItem value="Upper">Upper</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="HOUSE_TYPE" className="text-gray-300">House Type</Label>
        <Select 
          value={claimData.HOUSE_TYPE} 
          onValueChange={(value) => onSelectChange('HOUSE_TYPE', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select house type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Condominium">Condominium</SelectItem>
            <SelectItem value="Single Family">Single Family</SelectItem>
            <SelectItem value="Townhouse">Townhouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="NO_OF_FAMILY_MEMBERS" className="text-gray-300">Number of Family Members</Label>
        <Input
          id="NO_OF_FAMILY_MEMBERS"
          name="NO_OF_FAMILY_MEMBERS"
          type="number"
          placeholder="e.g. 4"
          value={claimData.NO_OF_FAMILY_MEMBERS || ''}
          onChange={onInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </>
  );
};

export default CustomerInfoForm;
