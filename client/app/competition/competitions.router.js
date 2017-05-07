'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('competitions', {
                url: '/competitions',
                component: 'competition'
            })
            .state('createCompetitionStepOne', {
                url: '/competitions/create/step-one',
                component: 'createCompetitionStepOne',
                params: {
                    numberOfWeeks: null,
                    competition: null
                }
            });
    });