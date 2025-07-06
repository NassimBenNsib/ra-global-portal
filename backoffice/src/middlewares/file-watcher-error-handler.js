/**
 * Custom middleware to handle file watcher issues with special characters in paths
 */

'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Handle file watcher errors globally
    const originalOn = process.on.bind(process);
    
    process.on = function(event, handler) {
      if (event === 'uncaughtException') {
        const wrappedHandler = (error) => {
          // Check if it's a chokidar/picomatch error
          if (error.message && error.message.includes('Expected pattern to be a non-empty string')) {
            console.warn('⚠️  File watcher error caught in middleware:', error.message);
            console.warn('⚠️  This is likely due to special characters in the project path');
            console.warn('⚠️  The application will continue running...');
            return; // Don't crash the process
          }
          // Call the original handler for other errors
          return handler(error);
        };
        return originalOn(event, wrappedHandler);
      }
      return originalOn(event, handler);
    };

    await next();
  };
};
