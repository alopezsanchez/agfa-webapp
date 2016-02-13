'use strict';

angular.module('agfaWebappApp', [
  'agfaWebappApp.auth',
  'agfaWebappApp.admin',
  'agfaWebappApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
