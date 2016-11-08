'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/agfawebapp-dev'
  },

  // Seed database on startup
  seedDB: false,

  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'agfawebapp-secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',

  adminEmail: 'alopezsanchez@gmail.com',

  from: 'no-reply-agfa@agfa.gal',

  mailTransport: 'smtps://alopezsanchez18%40gmail.com:' + process.env.AGFA + '@smtp.gmail.com'
};
