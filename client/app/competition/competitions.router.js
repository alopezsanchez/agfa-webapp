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
            })
            .state('competitionDetail', {
                url: '/competitions/:id',
                component: 'competitionDetail',
                resolve: {
                    competition: ($http, $stateParams) => {
                        return $http.get(`/api/competitions/${$stateParams.id}`);
                    },
                    weeksToUpdate: () => {
                        return [];
                    }
                }
            });
    });
