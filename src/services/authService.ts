
import { API_URL } from './apiConfig';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends UserCredentials {
  name: string;
}

export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to sign in');
    }
    
    localStorage.setItem('user', JSON.stringify(result.data.user));
    localStorage.setItem('token', result.data.token);
    
    return result.data;
  } catch (error) {
    console.error('Authentication Error:', error);
    throw error;
  }
};

export const signUp = async (data: SignUpData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to sign up');
    }
    
    localStorage.setItem('user', JSON.stringify(result.data.user));
    localStorage.setItem('token', result.data.token);
    
    return result.data;
  } catch (error) {
    console.error('Authentication Error:', error);
    throw error;
  }
};

export const signOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
