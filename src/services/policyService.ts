
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

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('Error in policy analysis:', error);
    
    // Re-throw the error to be handled by the component
    throw error;
  }
};
