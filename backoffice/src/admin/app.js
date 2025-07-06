import AuthLogo from "./../extensions/logo.jpg";
import MenuLogo from "./../extensions/logo.jpg";
import favicon from "./../extensions/favicon.jpg";
// import ckeditor5Dll from "ckeditor5/build/ckeditor5-dll.js";
// import ckeditor5MrkdownDll from "@ckeditor/ckeditor5-markdown-gfm/build/markdown-gfm.js";
// import { Box } from '@strapi/design-system/Box';

const config = {
  // Replace the Strapi logo in auth (login) views
  auth: {
    logo: AuthLogo,
  },
  // Replace the favicon
  head: {
    favicon: favicon,
  },
  // Add new locales, including Tunisian Arabic
  // locales: ["fr", "ar", "en", "ar-TN"],
  // Replace the Strapi logo in the main navigation
  // menu: {
  //     logo: () => (
  //       <Box padding={2} style={{ pointerEvents: 'none', opacity: 0.9 }}>
  //         <img src={MenuLogo} alt="Custom Logo" style={{ width: '100%' }} />
  //       </Box>
  //     ),
  // },
  // Override or extend the theme
  theme: {
    // overwrite light theme properties
    light: {
      colors: {
        primary100: "#e0f2ff",
        primary200: "#b3daff",
        primary500: "#80c8ff",
        primary600: "#4db6ff",
        primary700: "#1aa3ff",
        primary800: "#0086cc",
        primary900: "#005999",
        primary1000: "#003366",
        danger700: "#ff0000",
      },
    },
    // overwrite dark theme properties
    dark: {
      colors: {
        primary100: "#e0f2ff",
        primary200: "#b3daff",
        primary500: "#80c8ff",
        primary600: "#4db6ff",
        primary700: "#1aa3ff",
        primary800: "#0086cc",
        primary900: "#005999",
        primary1000: "#003366",
        danger700: "#ff0000",
      },
    },
  },
  // Extend the translations
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "RA Gloabl",
      "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
      "Auth.form.welcome.title": "Welcome Back",
      "Auth.form.welcome.subtitle": "Please login to your account.",
      "Auth.form.email.placeholder": "e.g. someone@gmail.com",
    },
    fr: {
      "app.components.LeftMenu.navbrand.title": "RA Gloabl",
      "app.components.LeftMenu.navbrand.workplace": "Panneau d'Administration",
      "Auth.form.welcome.title": "Bon Retour",
      "Auth.form.welcome.subtitle": "Veuillez vous connecter à votre compte.",
      "Auth.form.email.placeholder": "ex. quelquun@gmail.com",
    },
  },
  // Disable video tutorials
  tutorials: false,
  // Disable notifications about new Strapi releases
  notifications: { releases: false, tutorials: false },
  recommendations: {
    disabled: true,
  },
  // Add more options for the insurance company context
  customSettings: {
    companyName: "RA Gloabl",
    website: "https://raglobal.tn",
    contactEmail: "info@raglobal.tn",
  },
  isEnabled: false,
  settings: {
    auditLogs: false,
    sentry: false,
    releases: false,
  },
};

const bootstrap = (app) => {




  if (window.location.pathname === '/admin') {
    window.location.replace('/admin/content-manager');
  }

};


export default {
  config,
  bootstrap,
};
