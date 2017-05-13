'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('fields', {
                url: '/fields',
                component: 'fields'
            })
            .state('editField', {
                url: '/fields/:id',
                component: 'editField',
                resolve: {
                    field: ($http, $stateParams) => {
                        return $http.get(`/api/fields/${$stateParams.id}`);
                    }
                }
            });
    });