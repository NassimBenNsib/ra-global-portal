'use strict';

/**
 * main-requirement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::main-requirement.main-requirement');
