'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('competitions', {
                url: '/competitions',
                templateUrl: 'app/competition/competitions.html',
                controller: 'CompetitionsCtrl'
            })
            .state('createCompetition', {
                url: '/competitions/create',
                component: 'createCompetition'
            });
    });