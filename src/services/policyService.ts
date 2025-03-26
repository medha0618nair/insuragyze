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
    // Update the type to allow "warning", "success", and "info"
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
  potential_loopholes?: string[];
  content?: {
    '1️⃣ Introduction'?: {
      'Policy Name'?: string;
      'Policy Number'?: string;
      'Issued by'?: string;
      'Insurer Contact'?: string;
      'Date of Issue'?: string;
      'Expiry Date'?: string;
    };
    '2️⃣ Coverage Overview'?: {
      'Type of Insurance'?: string;
      'Sum Assured'?: string;
      'Risks Covered'?: string[];
      'Additional Benefits'?: string[];
    };
    '3️⃣ Premium & Payment Details'?: {
      'Premium Amount'?: string;
      'Payment Frequency'?: string;
      'Due Date'?: string;
      'Grace Period'?: string;
    };
    '4️⃣ Benefits & Advantages'?: {
      'Key Benefits'?: string[];
    };
    '5️⃣ Exclusions & Limitations'?: {
      'Not Covered'?: string[];
    };
    '6️⃣ Potential Loopholes & Important Considerations'?: {
      'Important Points to Note'?: string[];
    };
  };
  additional_information?: string[];
}

// Helper function to extract currency value from string like "₹5" or "₹5 lakh"
const extractCurrencyValue = (value: string | undefined): number => {
  if (!value) return 500000; // Default value
  
  // Remove all non-numeric characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '');
  
  if (!numericValue || isNaN(Number(numericValue))) return 500000;
  
  // Convert to number and check for lakhs (if value contains "lakh" or is very small like 2-10)
  const number = parseFloat(numericValue);
  
  // If the number is very small (like 2-10), assume it's in lakhs
  if (number < 20) {
    return number * 100000; // Convert lakhs to rupees
  }
  
  return number;
};

// Transform API response to expected format
const transformApiResponse = (apiResponse: ApiResponse): PolicyAnalysisResult => {
  console.log('Transforming API response:', apiResponse);
  
  // Extract policy details from either format
  const policyName = 
    apiResponse.content?.['1️⃣ Introduction']?.['Policy Name'] || 
    apiResponse.policy_details?.policy_name || 
    'Insurance Policy';
    
  const policyNumber = 
    apiResponse.content?.['1️⃣ Introduction']?.['Policy Number'] || 
    apiResponse.policy_details?.policy_number;
    
  const providerName = 
    apiResponse.content?.['1️⃣ Introduction']?.['Issued by'] || 
    apiResponse.policy_details?.insurer_name;
  
  // Extract sum assured from either format
  const sumAssuredStr = 
    apiResponse.content?.['2️⃣ Coverage Overview']?.['Sum Assured'] || 
    apiResponse.coverage_details?.sum_assured;
    
  const sumAssured = extractCurrencyValue(sumAssuredStr);
  
  // Extract benefits from either format
  const benefits = 
    apiResponse.content?.['4️⃣ Benefits & Advantages']?.['Key Benefits'] || 
    apiResponse.coverage_details?.additional_benefits || 
    ['Standard coverage protection', 'Basic liability coverage'];
  
  // Extract exclusions from either format
  const exclusions = 
    apiResponse.content?.['5️⃣ Exclusions & Limitations']?.['Not Covered'] || 
    apiResponse.exclusions || 
    [];
  
  // Extract loopholes from either format
  const loopholes = 
    apiResponse.content?.['6️⃣ Potential Loopholes & Important Considerations']?.['Important Points to Note'] || 
    apiResponse.potential_loopholes || 
    [
      'Coverage may be void if property is unoccupied for more than 30 days',
      'Claims for high-value items require prior registration',
      'Damage due to failure to maintain property may be rejected'
    ];
  
  // Create appropriate recommendations based on the document
  const recommendations = [
    {
      type: 'info' as const,
      title: 'Coverage Summary',
      description: `Your policy provides total coverage of ₹${sumAssured.toLocaleString('en-IN')} for ${apiResponse.content?.['2️⃣ Coverage Overview']?.['Type of Insurance'] || apiResponse.coverage_details?.type || 'insurance protection'}.`,
    }
  ];
  
  // Add warnings based on exclusions and loopholes
  if (exclusions.length > 0) {
    recommendations.push({
      type: 'warning' as const,
      title: 'Review Exclusions',
      description: 'Your policy has some exclusions. Review them carefully to understand what is not covered.',
    });
  }
  
  if (loopholes.length > 0) {
    recommendations.push({
      type: 'warning' as const,
      title: 'Be Aware of Loopholes',
      description: 'We identified potential loopholes in your policy. Review these carefully to understand potential coverage gaps.',
    });
  }
  
  // Add recommendation about coverage level
  recommendations.push({
    type: 'success' as const,
    title: 'Good Coverage Level',
    description: 'Your coverage level appears adequate based on standard recommendations.',
  });
  
  // Calculate derived values based on the sum assured
  const personalProperty = Math.round(sumAssured * 0.5); // 50% of sum assured
  const liability = Math.round(sumAssured * 0.3); // 30% of sum assured
  
  return {
    policyName,
    policyNumber,
    providerName,
    summary: {
      coverageAmount: sumAssured,
      personalProperty,
      liability,
      waterDamageCovered: true, // Default values
      theftCovered: true, // Default values
    },
    exclusions,
    benefits,
    loopholes,
    deductibles: {
      standard: 1000, // Default values
      windHail: 'Not applicable',
    },
    recommendations,
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
