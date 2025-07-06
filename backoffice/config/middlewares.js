module.exports = [
  "strapi::logger",
  "strapi::errors",
  // "strapi::security",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["'self'", "https:", "http:", "editor.unlayer.com"],
          "frame-src": ["'self'", "https:", "http:"],
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "*",
            "self",
            "data:",
            "blob:",
            "cdn.jsdelivr.net",
            "strapi.io",
            "s3.amazonaws.com",
            "https://market-assets.strapi.io",
            "https://tile.openstreetmap.org",
            "https://a.tile.openstreetmap.org",
            "https://b.tile.openstreetmap.org",
            "https://c.tile.openstreetmap.org",
          ],
          "media-src": ["'self'", "data:", "blob:"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  // "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",

];
