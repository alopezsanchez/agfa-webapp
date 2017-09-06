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
  SESSION_SECRET:   process.env.AGFA_SECRET || 'agfawebapp-secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',

  adminEmail: process.env.AGFA_ADMIN_MAIL || 'agfa@agfa.gal',

  from: process.env.AGFA_GMAIL_MAIL ||'no-reply-agfa@agfa.gal',

  mailTransport: 'smtps://' + process.env.AGFA_GMAIL_MAIL + ':' + process.env.AGFA_GMAIL_KEY + '@smtp.gmail.com'
};
