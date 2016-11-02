'use strict';

angular.module('agfaWebappApp')
  .config(($stateProvider) => {
    $stateProvider
      .state('404', {
        url: '/404',
        templateUrl: 'app/errors/404/404.html',
        controller: 'ErrorController',
        controllerAs: 'errorc'
      });
  });
