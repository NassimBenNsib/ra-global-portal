'use strict';

module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  
  // Ensure proper handling of i18n and other plugins
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};
  
  // Important: return the modified config
  return config;
};
