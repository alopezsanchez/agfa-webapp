'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('teams', {
                url: '/teams',
                component: 'team'
            })
            .state('editTeam', {
                url: '/teams/edit/:id',
                component: 'editTeam'
            });
    });