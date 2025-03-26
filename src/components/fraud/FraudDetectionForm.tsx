
import React from 'react';
import { useForm } from 'react-hook-form';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ClaimFraudData } from '@/services/fraudDetectionService';
import { toast } from 'sonner';

interface FraudDetectionFormProps {
  onSubmit: (data: ClaimFraudData) => void;
  isLoading: boolean;
}

const FraudDetectionForm: React.FC<FraudDetectionFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<ClaimFraudData>({
    defaultValues: {
      policyNumber: '',
      policyStartDate: '',
      lossDate: '',
      reportDate: '',
      insuranceType: 'Health',
      premiumAmount: 1000,
      claimAmount: 5000,
      incidentSeverity: 'Minor Loss',
      policeReportAvailable: false,
      incidentHour: 12,
      authorityContacted: 'None',
      anyInjury: false,
      customerAge: 35,
      employmentStatus: 'Employed',
      maritalStatus: 'Married',
      socialClass: 'Middle',
      educationLevel: 'Bachelor',
      houseType: 'Own',
      familyMembers: 2,
      riskSegmentation: 'M',
      tenure: 3
    }
  });

  const handleSubmit = (data: ClaimFraudData) => {
    // Validate dates
    try {
      const policyDate = new Date(data.policyStartDate);
      const lossDate = new Date(data.lossDate);
      const reportDate = new Date(data.reportDate);
      
      if (lossDate < policyDate) {
        toast.error('Loss date cannot be before policy start date');
        return;
      }
      
      if (reportDate < lossDate) {
        toast.error('Report date cannot be before loss date');
        return;
      }
      
      onSubmit(data);
    } catch (error) {
      toast.error('Invalid date format');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Claim Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="policyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. POL-12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="insuranceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select insurance type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Auto">Auto</SelectItem>
                      <SelectItem value="Property">Property</SelectItem>
                      <SelectItem value="Life">Life</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="policyStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="premiumAmount"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Premium Amount (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      value={value}
                      onChange={e => onChange(Number(e.target.value))}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lossDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loss/Incident Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="claimAmount"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Claim Amount (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      value={value}
                      onChange={e => onChange(Number(e.target.value))}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="incidentSeverity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Severity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Minor Loss">Minor Loss</SelectItem>
                      <SelectItem value="Major Loss">Major Loss</SelectItem>
                      <SelectItem value="Total Loss">Total Loss</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Incident Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="incidentHour"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Incident Hour (0-23)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="23"
                      value={value}
                      onChange={e => onChange(Number(e.target.value))}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="authorityContacted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authority Contacted</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Police, Fire Dept, None" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="policeReportAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Police Report Available</FormLabel>
                    <FormDescription>
                      Check if a police report was filed
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="anyInjury"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Any Injury Reported</FormLabel>
                    <FormDescription>
                      Check if any injuries occurred
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="customerAge"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Customer Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="18" 
                      max="100"
                      value={value}
                      onChange={e => onChange(Number(e.target.value))}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Employed">Employed</SelectItem>
                      <SelectItem value="Self-employed">Self-employed</SelectItem>
                      <SelectItem value="Unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="socialClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Upper">Upper</SelectItem>
                      <SelectItem value="Middle">Middle</SelectItem>
                      <SelectItem value="Lower">Lower</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Bachelor">Bachelor</SelectItem>
                      <SelectItem value="Master">Master</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="houseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Own">Own</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Company Provided">Company Provided</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="familyMembers"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Family Members</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="20"
                      value={value}
                      onChange={e => onChange(Number(e.target.value))}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="riskSegmentation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Segmentation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="L">Low Risk (L)</SelectItem>
                      <SelectItem value="M">Medium Risk (M)</SelectItem>
                      <SelectItem value="H">High Risk (H)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tenure"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Customer Tenure (Years)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="50"
                      value={value}
                      onChange={e => onChange(Number(e.target.value))}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <ButtonCustom 
          type="submit" 
          size="lg"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Claim...
            </>
          ) : "Analyze Claim for Fraud"}
        </ButtonCustom>
      </form>
    </Form>
  );
};

export default FraudDetectionForm;
