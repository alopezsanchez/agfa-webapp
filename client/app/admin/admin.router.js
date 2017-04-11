'use strict';

angular.module('agfaWebappApp.admin')
    .config(function($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                component: 'admin',
                authenticate: 'admin'
            });
    });