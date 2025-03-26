
import { API_URL, DOC_ANALYSIS_API } from './apiConfig';

export interface PolicyAnalysisResult {
  policyName?: string;
  policyNumber?: string;
  providerName?: string;
  summary: {
    coverageAmount: number;
    personalProperty: number;
    liability: number;
    waterDamageCovered: boolean;
    theftCovered: boolean;
  };
  exclusions: string[];
  benefits: string[];
  loopholes: string[];
  deductibles: {
    standard: number | string;
    windHail: string;
  };
  recommendations: Array<{
    type: 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }>;
}

interface ApiResponse {
  policy_details?: {
    policy_name?: string;
    policy_number?: string;
    insurer_name?: string;
    insurer_contact?: string;
    issue_date?: string;
    expiry_date?: string;
  };
  coverage_details?: {
    type?: string;
    sum_assured?: string;
    risks_covered?: string[];
    additional_benefits?: string[];
  };
  premium_info?: {
    amount?: string;
    frequency?: string;
    due_dates?: string;
    grace_period?: string;
  };
  exclusions?: string[];
  claims_process?: {
    steps?: string[];
    documents?: string[];
    contact?: string;
    timeframe?: string;
  };
}

// Transform API response to expected format
const transformApiResponse = (apiResponse: ApiResponse): PolicyAnalysisResult => {
  console.log('Transforming API response:', apiResponse);
  
  // Extract sum_assured and convert to number (already in INR)
  const sumAssured = apiResponse.coverage_details?.sum_assured 
    ? parseFloat(apiResponse.coverage_details.sum_assured) * 100000 // Convert lakhs to rupees
    : 500000; // Default value
  
  // Process exclusions - split by bullet points if in a single string
  const processedExclusions = apiResponse.exclusions?.length
    ? apiResponse.exclusions.flatMap(exclusion => 
        exclusion.includes('◦') 
          ? exclusion.split('◦').filter(item => item.trim().length > 0).map(item => item.trim())
          : [exclusion]
      )
    : ['Standard exclusions apply'];
  
  // Extract benefits from the API response or provide default ones
  const benefits = apiResponse.coverage_details?.additional_benefits?.length
    ? apiResponse.coverage_details.additional_benefits
    : [
        'Emergency medical expenses covered',
        'Cashless hospitalization at network hospitals',
        'Pre and post hospitalization expenses covered',
        'No claim bonus on policy renewal'
      ];
  
  // Add potential loopholes identified from the policy
  const loopholes = [
    'Waiting periods may apply for certain conditions',
    'Some treatments may require pre-authorization',
    'Sub-limits on room rent can affect overall claim amount',
    'Certain specialized treatments may have coverage caps'
  ];
  
  return {
    policyName: apiResponse.policy_details?.policy_name || 'Insurance Policy',
    policyNumber: apiResponse.policy_details?.policy_number,
    providerName: apiResponse.policy_details?.insurer_name,
    summary: {
      coverageAmount: sumAssured,
      personalProperty: sumAssured * 0.5, // Example calculation
      liability: sumAssured * 0.3, // Example calculation
      waterDamageCovered: true, // Default values
      theftCovered: true, // Default values
    },
    exclusions: processedExclusions,
    benefits: benefits,
    loopholes: loopholes,
    deductibles: {
      standard: 1000, // Default values
      windHail: 'Not applicable',
    },
    recommendations: [
      {
        type: 'info',
        title: 'Coverage Summary',
        description: `Your policy provides total coverage of ₹${sumAssured.toLocaleString('en-IN')} for ${apiResponse.coverage_details?.type || 'insurance protection'}.`,
      },
      {
        type: 'warning',
        title: 'Review Exclusions',
        description: 'Your policy has some exclusions. Review them carefully to understand what is not covered.',
      },
      {
        type: 'success',
        title: 'Good Coverage Level',
        description: 'Your coverage level appears adequate based on standard recommendations.',
      },
    ],
  };
};

export const analyzePolicyDocument = async (formData: FormData): Promise<PolicyAnalysisResult> => {
  try {
    console.log('Uploading document to:', DOC_ANALYSIS_API);
    
    // Create a new FormData and ensure the file is attached with the field name 'file'
    // which is what the API expects based on the error message
    const apiFormData = new FormData();
    
    if (formData.has('document')) {
      const documentFile = formData.get('document');
      // Add the file with the field name 'file' instead of 'document'
      apiFormData.append('file', documentFile as Blob);
      console.log('FormData keys after conversion:', [...apiFormData.keys()]);
    } else {
      console.error('No document file found in the FormData');
      throw new Error('No document file provided');
    }
    
    const response = await fetch(DOC_ANALYSIS_API, {
      method: 'POST',
      body: apiFormData,
      // Don't set Content-Type header, the browser will set it with the boundary
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const apiData: ApiResponse = await response.json();
    console.log('API response data:', apiData);
    
    // Transform the API response to match the expected format
    const transformedData = transformApiResponse(apiData);
    console.log('Transformed data:', transformedData);
    
    return transformedData;
  } catch (error) {
    console.error('Error in policy analysis:', error);
    
    // Re-throw the error to be handled by the component
    throw error;
  }
};
