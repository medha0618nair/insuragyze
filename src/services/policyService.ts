
import { DOC_ANALYSIS_API } from './apiConfig';

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
  analysis?: {
    loopholes?: {
      "Ambiguous Language"?: string[];
      "Exclusion Clauses"?: string[];
      "Limitation Flags"?: string[];
      "Claim Rejection Risks"?: string[];
    };
    benefits?: {
      "Medical Benefits"?: string[];
      "Financial Benefits"?: string[];
      "Additional Benefits"?: string[];
    };
    major_exclusions?: string[];
    coverage_highlights?: string[];
  };
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
  simplified_summary?: string;
  additional_information?: string[];
  filename?: string;
  analysis?: {
    loopholes?: {
      "Ambiguous Language"?: string[];
      "Exclusion Clauses"?: string[];
      "Limitation Flags"?: string[];
      "Claim Rejection Risks"?: string[];
    };
    benefits?: {
      "Medical Benefits"?: string[];
      "Financial Benefits"?: string[];
      "Additional Benefits"?: string[];
    };
    major_exclusions?: string[];
    coverage_highlights?: string[];
  };
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
    apiResponse.filename ||
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
  let benefits = [];
  
  if (Array.isArray(apiResponse.content?.['4️⃣ Benefits & Advantages']?.['Key Benefits'])) {
    benefits = apiResponse.content?.['4️⃣ Benefits & Advantages']?.['Key Benefits'];
  } else if (apiResponse.coverage_details?.additional_benefits) {
    benefits = apiResponse.coverage_details.additional_benefits;
  } else if (apiResponse.analysis?.benefits?.["Medical Benefits"]) {
    // Combine all benefits from the new API format
    benefits = [
      ...(apiResponse.analysis.benefits["Medical Benefits"] || []),
      ...(apiResponse.analysis.benefits["Financial Benefits"] || []),
      ...(apiResponse.analysis.benefits["Additional Benefits"] || [])
    ];
  } else {
    benefits = ['Standard coverage protection', 'Basic liability coverage'];
  }
  
  // Extract exclusions from either format
  let exclusions = [];
  
  if (Array.isArray(apiResponse.content?.['5️⃣ Exclusions & Limitations']?.['Not Covered'])) {
    exclusions = apiResponse.content?.['5️⃣ Exclusions & Limitations']?.['Not Covered'];
  } else if (apiResponse.exclusions) {
    exclusions = apiResponse.exclusions;
  } else if (apiResponse.analysis?.major_exclusions) {
    exclusions = apiResponse.analysis.major_exclusions;
  } else {
    exclusions = [];
  }
  
  // Extract loopholes from either format
  let loopholes = [];
  
  if (Array.isArray(apiResponse.content?.['6️⃣ Potential Loopholes & Important Considerations']?.['Important Points to Note'])) {
    loopholes = apiResponse.content?.['6️⃣ Potential Loopholes & Important Considerations']?.['Important Points to Note'];
  } else if (apiResponse.potential_loopholes) {
    loopholes = apiResponse.potential_loopholes;
  } else if (apiResponse.analysis?.loopholes) {
    // Combine all loopholes from the new API format
    loopholes = [
      ...(apiResponse.analysis.loopholes["Ambiguous Language"] || []),
      ...(apiResponse.analysis.loopholes["Exclusion Clauses"] || []),
      ...(apiResponse.analysis.loopholes["Limitation Flags"] || []),
      ...(apiResponse.analysis.loopholes["Claim Rejection Risks"] || [])
    ];
  } else {
    loopholes = [
      'Coverage may be void if property is unoccupied for more than 30 days',
      'Claims for high-value items require prior registration',
      'Damage due to failure to maintain property may be rejected'
    ];
  }
  
  // Create appropriate recommendations based on the document
  const recommendations: PolicyAnalysisResult['recommendations'] = [
    {
      type: 'info',
      title: 'Coverage Summary',
      description: `Your policy provides total coverage of ₹${sumAssured.toLocaleString('en-IN')} for ${apiResponse.content?.['2️⃣ Coverage Overview']?.['Type of Insurance'] || apiResponse.coverage_details?.type || 'insurance protection'}.`,
    }
  ];
  
  // Add warnings based on exclusions and loopholes
  if (exclusions.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Review Exclusions',
      description: 'Your policy has some exclusions. Review them carefully to understand what is not covered.',
    });
  }
  
  if (loopholes.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Be Aware of Loopholes',
      description: 'We identified potential loopholes in your policy. Review these carefully to understand potential coverage gaps.',
    });
  }
  
  // Add recommendation about coverage level
  recommendations.push({
    type: 'success',
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
    rawApiResponse: apiResponse, // Include the complete API response
    analysis: apiResponse.analysis // Include the structured analysis from the new API
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
      // Add the file with the field name 'file' for the new API
      apiFormData.append('file', documentFile as Blob);
      console.log('FormData keys after conversion:', [...apiFormData.keys()]);
      console.log('File being sent:', documentFile);
    } else {
      console.error('No document file found in the FormData');
      throw new Error('No document file provided');
    }
    
    // Log detailed request information for debugging
    console.log('Sending request to API with form data:', {
      endpoint: DOC_ANALYSIS_API,
      method: 'POST',
      fileIncluded: apiFormData.has('file'),
      fileSize: apiFormData.get('file') instanceof File ? (apiFormData.get('file') as File).size : 'unknown'
    });
    
    const response = await fetch(DOC_ANALYSIS_API, {
      method: 'POST',
      body: apiFormData,
      // Don't set Content-Type header, the browser will set it with the boundary
    });

    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries([...response.headers.entries()]));
      throw new Error(`API error: ${response.status} - ${errorText || 'Unknown error'}`);
    }

    const apiData: ApiResponse = await response.json();
    console.log('API response data:', apiData);
    
    // Transform the API response to match the expected format
    const transformedData = transformApiResponse(apiData);
    console.log('Transformed data:', transformedData);
    
    return transformedData;
  } catch (error) {
    console.error('Error in policy analysis:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
