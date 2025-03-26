
import { API_URL } from './apiConfig';

export const checkClaimProbability = async (claimData: any) => {
  try {
    const response = await fetch(`${API_URL}/claim/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(claimData),
    });

    if (!response.ok) {
      throw new Error('Failed to check claim');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to check claim');
    }
    
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
