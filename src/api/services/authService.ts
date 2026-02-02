import api from '../axios';
import type { AuthResponse, ApiResponse } from '../../types';

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post<ApiResponse<any>>('/auth/logout');
    return response.data;
  },
  
  refresh: async () => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/refresh');
    return response.data;
  }
};


