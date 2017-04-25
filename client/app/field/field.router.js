'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('fields', {
                url: '/fields',
                component: 'fields'
            });
    });