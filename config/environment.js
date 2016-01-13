/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'a2s-client',
    podModulePrefix: 'a2s-client/pods',
    namespace:'api',
    namespaceStorage:'storage',
    // host:'http://a2s.a2system.net:4501',
    host:'http://192.168.1.36:4500',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'font-src': "'self' fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
      // 'connect-src' : "'self' 'unsafe-inline' http://a2s.a2system.net:4500",
      'connect-src' : "* 'unsafe-inline'",
      'script-src':"* 'unsafe-inline'",
      'default-src':"*",
      'img-src':"*"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['urlLogin'] = ENV['host']+"/"+ENV['namespace']+"/users/login";

  ENV['ember-simple-auth'] = {
    authenticationRoute:         'login',
    routeAfterAuthentication:    'todo',
    routeIfAlreadyAuthenticated: 'todo'
  };

  ENV.torii={
    providers:{
      'facebook-connect': {
        appId: '265782333595065',
        scope: 'email,user_birthday'
      }
    }
  };
  
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
