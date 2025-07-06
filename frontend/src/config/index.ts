// Application configuration - Change these values to switch environments
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:1337/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT as string) || 10000,
    version: import.meta.env.VITE_API_VERSION || 'v1',
  },
  
  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'RA Global Education Platform',
    defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
  },
  
  // File Upload Configuration
  upload: {
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE as string) || 10485760, // 10MB
    allowedTypes: import.meta.env.VITE_ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'application/pdf'
    ],
  },
  
  // Environment Detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Quick Environment Switching (for development)
  environments: {
    development: {
      apiUrl: 'http://localhost:1337/api',
      appName: 'RA Global Education Platform (Dev)',
    },
    staging: {
      apiUrl: 'https://staging-api.raglobal.com/api',
      appName: 'RA Global Education Platform (Staging)',
    },
    production: {
      apiUrl: 'https://api.raglobal.com/api',
      appName: 'RA Global Education Platform',
    },
  },
  
  // Storage keys
  storage: {
    authToken: 'auth_token',
    userPreferences: 'user_preferences',
    language: 'preferred_language',
    theme: 'ra-global-theme',
  },
  
  // Routes
  routes: {
    home: '/',
    login: '/auth/login',
    register: '/auth/register',
    dashboard: {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    },
    unauthorized: '/unauthorized',
  },
} as const;

// Helper function to switch environments (useful for development)
export const switchEnvironment = (env: keyof typeof config.environments) => {
  const envConfig = config.environments[env];
  if (envConfig) {
    // This would typically be handled by environment variables in production
    console.log(`Switching to ${env} environment:`, envConfig);
    return envConfig;
  }
  return null;
};

// Validation function to ensure required config is present
export const validateConfig = () => {
  const requiredFields = [
    config.api.baseUrl,
    config.app.name,
  ];
  
  const missingFields = requiredFields.filter(field => !field);
  
  if (missingFields.length > 0) {
    console.error('Missing required configuration fields:', missingFields);
    return false;
  }
  
  return true;
};

// Initialize configuration validation
if (config.isDevelopment) {
  validateConfig();
}

export default config;
