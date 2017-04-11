'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                component: 'main'
            });
    });