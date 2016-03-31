'use strict';

angular.module('agfaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('competitions', {
        url: '/competitions',
        templateUrl: 'app/competitions/competitions.html',
        controller: 'CompetitionsCtrl'
      })
      .state('newCompetition', {
          url : '/competitions/create',
          templateUrl : 'app/competitions/create/create.html',
          controller : 'CreateCtrl'
      });
  });
