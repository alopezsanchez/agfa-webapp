'use strict';

angular.module('agfaWebappApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                component: 'login'
            })
            .state('logout', {
                url: '/logout?referrer',
                referrer: 'main',
                controller: function($state, Auth) {
                    // quiero que cuando me deslogueo vaya al main (de momento)
                    var referrer = //$state.params.referrer ||
                        //$state.current.referrer ||
                        'main';
                    Auth.logout();
                    $state.go(referrer);
                }
            })
            .state('settings', {
                url: '/settings',
                component: 'settings',
                authenticate: true,
                resolve: {
                    user: (Auth) => {
                        return Auth.getCurrentUser();
                    }
                }
            })
            .state('confirm', {
                url: '/confirm/:token',
                component: 'confirm',
                authenticate: false
            });
    })
    .run(function($rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.authenticate) {
                next.referrer = current.name;
            }
        });
    });