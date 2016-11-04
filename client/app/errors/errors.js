'use strict';

angular.module('agfaWebappApp')
  .config(($stateProvider) => {
    $stateProvider
      .state('404', {
        url: '/error/404',
        templateUrl: 'app/errors/404/404.html',
        controller: 'ErrorController',
        controllerAs: 'errorc',
        authenticate: true
      })
      .state('400', {
        url: '/error/400',
        templateUrl: 'app/errors/400/400.html',
        controller: 'ErrorController',
        controllerAs: 'errorc'
      });
  });
