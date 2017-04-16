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
                templateUrl: 'app/team/edit/edit-team.html',
                controller: 'EditTeamCtrl',
                controllerAs: 'etc'
            });
    });