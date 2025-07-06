module.exports = ({ env }) => ({
  onlyoffice: {
    enabled: false,
  },
  "import-export-entries": {
    enabled: false,
  },
  // 'location': {
  //     enabled: true,
  //     resolve: '@notum-cz/strapi-plugin-location',
  //   },
  editorjs: {
    enabled: true,
  },
  comments: {
    enabled: true,
    badWords: false,
    moderatorRoles: ["Authenticated"],
    approvalFlow: ["api::page.page"],
    entryLabel: {
      "*": ["Title", "title", "Name", "name", "Subject", "subject"],
      "api::page.page": ["MyField"],
    },
    blockedAuthorProps: ["name", "email"],
    reportReasons: {
      MY_CUSTOM_REASON: "MY_CUSTOM_REASON",
    },
  },
  ckeditor5: {
    enabled: true,
  },
  "content-versioning": {
    enabled: false,
  },
  upload: {
    config: {
      provider: "local",
      providerOptions: {
        sizeLimit: 1024 * 1024 * 1024,
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      locales: ["en", "fr", "ar"],
      defaultLocale: "en",
    },
  },
  seo: {
    enabled: false,
    config: {
      contentTypes: {
        "api::article.article": {
          metaTitle: {
            singularName: "Article",
            pluralName: "Articles",
            displayName: "Meta Title",
            default: "Default Title",
          },
          metaDescription: {
            singularName: "Description",
            pluralName: "Descriptions",
            displayName: "Meta Description",
            default: "Default Description",
          },
          metaKeywords: {
            singularName: "Keyword",
            pluralName: "Keywords",
            displayName: "Meta Keywords",
            default: "keyword1, keyword2, keyword3",
          },
          canonicalURL: {
            singularName: "Canonical URL",
            pluralName: "Canonical URLs",
            displayName: "Canonical URL",
            default: "https://www.example.com",
          },
          metaImage: {
            singularName: "Meta Image",
            pluralName: "Meta Images",
            displayName: "Meta Image",
            default: "https://www.example.com/default-image.jpg",
          },
        },
        "api::page.page": {
          metaTitle: {
            singularName: "Page",
            pluralName: "Pages",
            displayName: "Meta Title",
            default: "Default Page Title",
          },
          metaDescription: {
            singularName: "Description",
            pluralName: "Descriptions",
            displayName: "Meta Description",
            default: "Default Page Description",
          },
          metaKeywords: {
            singularName: "Keyword",
            pluralName: "Keywords",
            displayName: "Meta Keywords",
            default: "page, keyword1, keyword2",
          },
          canonicalURL: {
            singularName: "Canonical URL",
            pluralName: "Canonical URLs",
            displayName: "Canonical URL",
            default: "https://www.example.com/page",
          },
          metaImage: {
            singularName: "Meta Image",
            pluralName: "Meta Images",
            displayName: "Meta Image",
            default: "https://www.example.com/page-image.jpg",
          },
        },
      },
    },
  },
});
