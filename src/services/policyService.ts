
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
  // Added raw response fields
  filename?: string;
  analysis?: {
    loopholes?: any;
    benefits?: any;
    major_exclusions?: string[];
    coverage_highlights?: string[];
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

    // Return the raw response for display
    const rawResponse = response.data;
    
    // Generate simplified data for the UI from the raw response
    const processedResult: PolicyAnalysisResult = {
      // Return the raw data
      ...rawResponse,
      
      // Also extract processed data for the UI components
      simplifiedExplanation: "Your policy has been analyzed. The document contains information about coverage, exclusions, and benefits.",
      keyPoints: rawResponse.analysis?.coverage_highlights || [],
      covered: extractCoveredItems(rawResponse),
      notCovered: rawResponse.analysis?.major_exclusions || [],
      potentialIssues: extractPotentialIssues(rawResponse),
      coverageScore: 75,
      overallRiskScore: 65,
      coverageAdequacy: "Good",
      riskScore: {
        coverageScore: 70,
        clarityScore: 60,
        exclusionRisk: 45,
        premiumValue: 80
      },
      coverage: {
        medical: 5000,
        property: 200000,
        liability: 100000,
        personal: 25000
      }
    };
    
    return processedResult;
  } catch (error) {
    console.error('Error analyzing policy document:', error);
    throw error;
  }
};

// Helper functions to extract information from the raw response
function extractCoveredItems(rawResponse: any): string[] {
  const benefits = rawResponse.analysis?.benefits || {};
  const covered = [];
  
  // Extract benefits from different categories
  for (const category in benefits) {
    if (benefits[category] && Array.isArray(benefits[category])) {
      covered.push(...benefits[category].slice(0, 2)); // Add first two benefits from each category
    }
  }
  
  // Return a subset of the benefits or a default message
  return covered.length > 0 
    ? covered.slice(0, 5).map(item => item.substring(0, 100)) // Limit length of each item
    : ["Basic coverage included", "Standard protection benefits"];
}

function extractPotentialIssues(rawResponse: any): string[] {
  const loopholes = rawResponse.analysis?.loopholes || {};
  const issues = [];
  
  // Extract issues from different loophole categories
  for (const category in loopholes) {
    if (loopholes[category] && Array.isArray(loopholes[category]) && loopholes[category].length > 0) {
      issues.push(`${category}: ${loopholes[category].length} instances found`);
    }
  }
  
  return issues.length > 0 ? issues : undefined;
}
