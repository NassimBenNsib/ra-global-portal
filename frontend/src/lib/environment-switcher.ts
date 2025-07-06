import config from '@/config';

/**
 * Environment Switcher Utility
 * 
 * This utility helps developers easily switch between different environments
 * without changing environment files manually.
 * 
 * Usage:
 * 1. Open browser console
 * 2. Type: switchToEnvironment('staging') or switchToEnvironment('production')
 * 3. Page will reload with new API endpoint
 * 
 * Note: This is for development only. In production, use proper environment variables.
 */

export type Environment = 'development' | 'staging' | 'production';

export const environmentSwitcher = {
  // Get current environment based on API URL
  getCurrentEnvironment(): Environment {
    const currentUrl = config.api.baseUrl;
    
    if (currentUrl.includes('localhost')) return 'development';
    if (currentUrl.includes('staging')) return 'staging';
    return 'production';
  },

  // Switch to a specific environment (development only)
  switchTo(env: Environment): void {
    if (config.isProduction) {
      console.warn('Environment switching is disabled in production');
      return;
    }

    const envConfig = config.environments[env];
    if (!envConfig) {
      console.error(`Environment "${env}" not found`);
      return;
    }

    // Store the new environment in session storage
    sessionStorage.setItem('dev_environment', env);
    
    console.log(`Switching to ${env} environment...`);
    console.log(`API URL: ${envConfig.apiUrl}`);
    
    // Reload the page to apply changes
    window.location.reload();
  },

  // Get environment from session storage (for development override)
  getDevEnvironment(): Environment | null {
    if (config.isProduction) return null;
    
    const devEnv = sessionStorage.getItem('dev_environment') as Environment;
    return devEnv && config.environments[devEnv] ? devEnv : null;
  },

  // Clear development environment override
  clearDevEnvironment(): void {
    sessionStorage.removeItem('dev_environment');
    console.log('Development environment override cleared');
    window.location.reload();
  },

  // Get effective configuration (with dev override if applicable)
  getEffectiveConfig() {
    const devEnv = this.getDevEnvironment();
    
    if (devEnv) {
      const envConfig = config.environments[devEnv];
      return {
        ...config,
        api: {
          ...config.api,
          baseUrl: envConfig.apiUrl,
        },
        app: {
          ...config.app,
          name: envConfig.appName,
        },
      };
    }
    
    return config;
  },

  // Show current configuration
  showConfig(): void {
    const effectiveConfig = this.getEffectiveConfig();
    const currentEnv = this.getCurrentEnvironment();
    const devOverride = this.getDevEnvironment();
    
    console.group('🔧 Environment Configuration');
    console.log('Current Environment:', currentEnv);
    if (devOverride) {
      console.log('Development Override:', devOverride);
    }
    console.log('API URL:', effectiveConfig.api.baseUrl);
    console.log('App Name:', effectiveConfig.app.name);
    console.log('Is Development:', config.isDevelopment);
    console.log('Full Config:', effectiveConfig);
    console.groupEnd();
  },
};

// Make functions available globally in development
if (config.isDevelopment && typeof window !== 'undefined') {
  (window as any).switchToEnvironment = environmentSwitcher.switchTo.bind(environmentSwitcher);
  (window as any).showEnvironmentConfig = environmentSwitcher.showConfig.bind(environmentSwitcher);
  (window as any).clearDevEnvironment = environmentSwitcher.clearDevEnvironment.bind(environmentSwitcher);
  
  // Show helpful message in console
  console.log(
    '%c🚀 RA Global Education Platform - Development Mode',
    'color: #3b82f6; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%cEnvironment switching available:',
    'color: #059669; font-weight: bold;'
  );
  console.log('• switchToEnvironment("development")');
  console.log('• switchToEnvironment("staging")');
  console.log('• switchToEnvironment("production")');
  console.log('• showEnvironmentConfig()');
  console.log('• clearDevEnvironment()');
}

export default environmentSwitcher;
