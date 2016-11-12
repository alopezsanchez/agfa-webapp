'use strict';

angular.module('agfaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('teams', {
      url: '/teams',
      templateUrl: 'app/team/team.html',
      controller: 'TeamCtrl',
      controllerAs: 'tc'
    })
    .state('newTeam', {
      url: '/teams/create',
      templateUrl: 'app/team/create/create-team.html',
      controller: 'CreateTeamCtrl',
      controllerAs: 'ctc'
    });
  });
