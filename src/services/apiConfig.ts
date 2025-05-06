
// Base API configuration
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const DOC_ANALYSIS_API = 'https://ds-9034.onrender.com/analyze-policy';
export const RECOMMENDATION_MODEL_API = 'https://rec-model2.onrender.com/recommend';
export const FRAUD_DETECTION_API = 'https://fraud-detection-1-p7zi.onrender.com'; // Updated to the new fraud detection API

// Create axios instance for API requests
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance specifically for policy analysis
export const policyAnalysisClient = axios.create({
  baseURL: DOC_ANALYSIS_API,
  headers: {
    'Content-Type': 'application/json',
  },
});
