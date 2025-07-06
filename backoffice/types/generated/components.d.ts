import type { Schema, Attribute } from '@strapi/strapi';

export interface RequirementsRequirement extends Schema.Component {
  collectionName: 'components_requirements_requirements';
  info: {
    displayName: 'Requirement';
    description: '';
  };
  attributes: {};
}

export interface SharedCoverage extends Schema.Component {
  collectionName: 'components_shared_coverages';
  info: {
    displayName: 'Coverage';
    description: '';
  };
  attributes: {};
}

export interface SharedDocument extends Schema.Component {
  collectionName: 'components_shared_documents';
  info: {
    displayName: 'Document';
    description: '';
  };
  attributes: {};
}

export interface SharedProvider extends Schema.Component {
  collectionName: 'components_shared_providers';
  info: {
    displayName: 'Provider';
    description: '';
  };
  attributes: {};
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'requirements.requirement': RequirementsRequirement;
      'shared.coverage': SharedCoverage;
      'shared.document': SharedDocument;
      'shared.provider': SharedProvider;
      'shared.seo': SharedSeo;
    }
  }
}
