'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Fix for i18n aliases validation error
    const originalRegisterMany = strapi?.admin?.services?.permission?.actionProvider?.registerMany;
    
    if (originalRegisterMany) {
      strapi.admin.services.permission.actionProvider.registerMany = function(actions) {
        // Filter out problematic aliases field from actions
        const filteredActions = actions.map(action => {
          if (action && typeof action === 'object' && action.aliases) {
            const { aliases, ...cleanAction } = action;
            return cleanAction;
          }
          return action;
        });
        
        return originalRegisterMany.call(this, filteredActions);
      };
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Additional i18n error handling
    try {
      // Ensure i18n plugin is properly loaded
      if (strapi.plugin('i18n')) {
        console.log('✅ i18n plugin loaded successfully');
      }
    } catch (error) {
      console.error('❌ Error during i18n plugin initialization:', error.message);
    }

    // Fix for chokidar/picomatch issue with special characters in path
    process.on('uncaughtException', (error) => {
      if (error.message && error.message.includes('Expected pattern to be a non-empty string')) {
        console.warn('⚠️  File watcher error caught and handled:', error.message);
        return; // Prevent crash
      }
      throw error; // Re-throw other uncaught exceptions
    });
  },
};
