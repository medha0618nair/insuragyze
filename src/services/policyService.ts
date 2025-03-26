
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
  rawApiResponse?: object; // Store the complete API response
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
  potential_loopholes?: string[]; // Add this field to the interface
  content?: {
    '6️⃣ Potential Loopholes & Important Considerations'?: {
      'Important Points to Note'?: string[];
    };
  };
}

// Transform API response to expected format
const transformApiResponse = (apiResponse: ApiResponse): PolicyAnalysisResult => {
  console.log('Transforming API response:', apiResponse);
  
  // Extract sum_assured and convert to number (already in INR)
  const sumAssured = apiResponse.coverage_details?.sum_assured 
    ? parseFloat(apiResponse.coverage_details.sum_assured) * 100000 // Convert lakhs to rupees
    : 500000; // Default value
  
  // Extract loopholes from the response
  let loopholes: string[] = [];
  
  // Check for loopholes in the new API response format
  if (apiResponse.content && 
      apiResponse.content['6️⃣ Potential Loopholes & Important Considerations'] && 
      apiResponse.content['6️⃣ Potential Loopholes & Important Considerations']['Important Points to Note']) {
    loopholes = apiResponse.content['6️⃣ Potential Loopholes & Important Considerations']['Important Points to Note'];
  } else if (apiResponse.potential_loopholes) {
    // Fallback to direct potential_loopholes field if available
    loopholes = apiResponse.potential_loopholes;
  } else {
    // Default fallback loopholes
    loopholes = [
      'Coverage may be void if property is unoccupied for more than 30 days',
      'Claims for high-value items require prior registration',
      'Damage due to failure to maintain property may be rejected'
    ];
  }
  
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
    exclusions: apiResponse.exclusions || [],
    benefits: apiResponse.coverage_details?.additional_benefits || 
      ['Standard coverage protection', 'Basic liability coverage'],
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
    rawApiResponse: apiResponse // Include the complete API response
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
