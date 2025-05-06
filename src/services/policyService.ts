
import { DOC_ANALYSIS_API } from './apiConfig';
import axios from 'axios';

export interface PolicyAnalysisResult {
  simplifiedExplanation: string;
  keyPoints?: string[];
  covered?: string[];
  notCovered?: string[];
  potentialIssues?: string[];
  coverageScore?: number;
  overallRiskScore?: number;
  coverageAdequacy?: string;
  riskScore?: {
    coverageScore?: number;
    clarityScore?: number;
    exclusionRisk?: number;
    premiumValue?: number;
  };
  coverage?: {
    medical?: number;
    property?: number;
    liability?: number;
    personal?: number;
  };
}

export const analyzePolicyDocument = async (formData: FormData): Promise<PolicyAnalysisResult> => {
  try {
    console.log('Sending document for analysis...');
    
    // Create a new FormData object with the correct field name
    const apiFormData = new FormData();
    const documentFile = formData.get('document');
    
    if (documentFile instanceof File) {
      // The API expects 'file' not 'document'
      apiFormData.append('file', documentFile);
      console.log('File added to FormData with key "file":', documentFile.name, documentFile.type, documentFile.size);
    } else {
      throw new Error('No document file found in FormData');
    }
    
    // Use the direct URL for the analysis API
    const response = await axios.post(DOC_ANALYSIS_API, apiFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Analysis response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing policy document:', error);
    throw error;
  }
};
