'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('competitions', {
                url: '/competitions',
                component: 'competition'
            })
            .state('createCompetition', {
                url: '/competitions/create',
                component: 'createCompetition'
            });
    });