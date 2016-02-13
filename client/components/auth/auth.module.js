'use strict';

angular.module('agfaWebappApp.auth', [
  'agfaWebappApp.constants',
  'agfaWebappApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
