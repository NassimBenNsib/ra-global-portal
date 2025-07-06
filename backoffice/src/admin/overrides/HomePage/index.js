// src/admin/overrides/HomePage/index.js

import React from 'react';
import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';

const CustomHomePage = () => {
  return (
    <>
      <BaseHeaderLayout title="Custom Admin Dashboard 👨‍💻" subtitle="Your custom welcome message here!" as="h2" />
      <ContentLayout>
        <Box padding={8} background="neutral0">
          {/* You can add your own cards, stats, links, widgets here */}
          <h3 style={{ fontWeight: 'bold' }}>Welcome to your Admin Panel!</h3>
          <p>You can manage content, users, and plugins from the left menu.</p>
        </Box>
      </ContentLayout>
    </>
  );
};

export default CustomHomePage;
