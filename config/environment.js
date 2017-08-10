/* eslint-env node */
/* global ga */

'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'celebscan',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      apiKey: ''
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.apiKey = process.env['API_KEY'] || '';
    ENV.APP.instrumentationKey = process.env['INSTRUMENTATION_KEY'] || '';
    ENV.APP.trackingKey = process.env['TRACKING_ID'] || '';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.APP.apiKey = process.env['API_KEY'] || '';
    ENV.APP.instrumentationKey = process.env['INSTRUMENTATION_KEY'] || '';
    ENV.APP.trackingKey = process.env['TRACKING_ID'] || '';
  }

  if (environment === 'production') {
    let secrets = require('./secrets.js');

    ENV.APP.apiKey = secrets.apiKey || '';
    ENV.APP.instrumentationKey = secrets.instrumentationKey || '';
    ENV.APP.trackingKey = secrets.trackingKey || '';
  }

  return ENV;
};
