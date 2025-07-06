import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '@/config';
import { environmentSwitcher } from './environment-switcher';

// Get effective configuration (with development overrides)
const effectiveConfig = environmentSwitcher.getEffectiveConfig();

// API Configuration from centralized config
const API_CONFIG = {
  BASE_URL: effectiveConfig.api.baseUrl,
  TIMEOUT: effectiveConfig.api.timeout,
  VERSION: effectiveConfig.api.version,
} as const;

// Create the main API instance
export const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add authentication token
api.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem(config.storage.authToken);
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add API version header if needed
    if (API_CONFIG.VERSION) {
      requestConfig.headers['API-Version'] = API_CONFIG.VERSION;
    }
    
    return requestConfig;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle different error status codes
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem(config.storage.authToken);
          if (window.location.pathname !== config.routes.login) {
            window.location.href = config.routes.login;
          }
          break;
        case 403:
          // Forbidden - redirect to unauthorized page
          if (window.location.pathname !== config.routes.unauthorized) {
            window.location.href = config.routes.unauthorized;
          }
          break;
        case 404:
          console.error('Resource not found:', error.config?.url);
          break;
        case 500:
          console.error('Server error:', data?.message || 'Internal server error');
          break;
        default:
          console.error('API Error:', data?.message || error.message);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
    } else {
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/local',
    REGISTER: '/auth/local/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    EMAIL_CONFIRMATION: '/auth/email-confirmation',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  
  // Users
  USERS: {
    ME: '/users/me',
    PROFILE: '/users/me?populate=profile',
    UPDATE_PROFILE: '/users/me',
    UPLOAD_AVATAR: '/upload',
  },
  
  // Courses
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
    PROGRESS: (id: string) => `/courses/${id}/progress`,
  },
  
  // Categories
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: string) => `/categories/${id}`,
  },
  
  // Instructors
  INSTRUCTORS: {
    LIST: '/instructors',
    DETAIL: (id: string) => `/instructors/${id}`,
    COURSES: (id: string) => `/instructors/${id}/courses`,
  },
  
  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    COURSES: '/admin/courses',
    ANALYTICS: '/admin/analytics',
  },
  
  // File uploads
  UPLOAD: '/upload',
} as const;

// Helper functions for common API operations
export const apiHelpers = {
  // Get with automatic error handling
  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<T>(endpoint, config);
    return response.data;
  },

  // Post with automatic error handling
  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.post<T>(endpoint, data, config);
    return response.data;
  },

  // Put with automatic error handling
  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.put<T>(endpoint, data, config);
    return response.data;
  },

  // Delete with automatic error handling
  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.delete<T>(endpoint, config);
    return response.data;
  },

  // Upload file with progress tracking
  async uploadFile(
    file: File,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<any> {
    const formData = new FormData();
    formData.append('files', file);

    const response = await api.post(API_ENDPOINTS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return response.data;
  },

  // Build query string from object
  buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });
    
    return searchParams.toString();
  },

  // Get full URL for an endpoint
  getFullUrl(endpoint: string): string {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  },
};

// Export API configuration for use in other files
export { API_CONFIG };

// Default export
export default api;
