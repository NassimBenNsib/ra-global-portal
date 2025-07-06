module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Development-specific configuration to handle file watching issues
  autoReload: {
    enabled: true,
    // Ignore problematic paths that can cause chokidar issues
    ignored: [
      /node_modules/,
      /\.git/,
      /build/,
      /\.strapi/,
      /\.cache/,
      /\.tmp/,
      /public\/uploads/,
      // Handle special characters in path
      /\[.*\]/,
      /\(\)/,
      /\{\}/
    ]
  },
  // Additional watch options for chokidar
  watchIgnoreFiles: [
    '**/node_modules/**',
    '**/.git/**',
    '**/build/**',
    '**/.strapi/**',
    '**/.cache/**',
    '**/.tmp/**',
    '**/public/uploads/**',
    // Handle paths with special characters
    '**/*[*',
    '**/*]*',
    '**/*(*',
    '**/*)*',
    '**/*{*',
    '**/*}*'
  ]
});
