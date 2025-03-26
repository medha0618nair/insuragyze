
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

export const analyzePolicyDocument = async (formData: FormData): Promise<PolicyAnalysisResult> => {
  try {
    console.log('Uploading document to:', DOC_ANALYSIS_API);
    console.log('FormData keys:', [...formData.keys()]);
    
    // Ensure the file is attached with the correct field name 'document'
    // If 'document' doesn't exist but a file exists under another key, adjust it
    if (!formData.has('document') && formData.has('file')) {
      const file = formData.get('file');
      formData.delete('file');
      formData.append('document', file as Blob);
    }
    
    const response = await fetch(DOC_ANALYSIS_API, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, the browser will set it with the boundary
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('Error in policy analysis:', error);
    
    // Re-throw the error to be handled by the component
    throw error;
  }
};
