'use strict';

angular.module('agfaWebappApp', [
        'agfaWebappApp.auth',
        'agfaWebappApp.admin',
        'agfaWebappApp.constants',
        'uiGmapgoogle-maps',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngMessages',
        'ui.router',
        'ui.bootstrap',
        'ngMaterial',
        'ngFileUpload',
        'alAngularHero',
        'validation.match',
        'pascalprecht.translate'
    ])
    .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider, $mdIconProvider, $translateProvider, uiGmapGoogleMapApiProvider) {

        uiGmapGoogleMapApiProvider.configure({
            //key: 'AIzaSyDahCsMz5gJRUIzIB3_15w3OYgp8g7O4XA',
            v: '3', //defaults to latest 3.X anyhow
            libraries: 'geometry,visualization'
        });

        $urlRouterProvider
            .otherwise('/error/404');

        $locationProvider.html5Mode(true);
        $mdIconProvider
            .icon('competition', './assets/icons/trophy.svg')
            .icon('football', './assets/icons/football.svg')
            .icon('shield', './assets/icons/shield.svg')
            .icon('field', './assets/icons/field.svg')
            .icon('helmet', './assets/icons/helmet.svg');


        /** ************* */

        var customPrimary = {
            '50': '#2269b6',
            '100': '#1e5ca1',
            '200': '#1a508b',
            '300': '#164476',
            '400': '#123760',
            '500': '#0E2B4B',
            '600': '#0a1f36',
            '700': '#061220',
            '800': '#02060b',
            '900': '#000000',
            'A100': '#2675cc',
            'A200': '#3382d9',
            'A400': '#488fdd',
            'A700': '#000000'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
                customPrimary);

        var customAccent = {
            '50': '#00343b',
            '100': '#004b54',
            '200': '#00626e',
            '300': '#007887',
            '400': '#008fa1',
            '500': '#00a5ba',
            '600': '#00d3ed',
            '700': '#08e3ff',
            '800': '#21e6ff',
            '900': '#3be9ff',
            'A100': '#00d3ed',
            'A200': '#00BCD4',
            'A400': '#00a5ba',
            'A700': '#54ecff'
        };
        $mdThemingProvider
            .definePalette('customAccent',
                customAccent);

        var customWarn = {
            '50': '#ff9853',
            '100': '#ff883a',
            '200': '#ff7920',
            '300': '#ff6a07',
            '400': '#ec5e00',
            '500': '#d35400',
            '600': '#b94a00',
            '700': '#a04000',
            '800': '#863600',
            '900': '#6d2b00',
            'A100': '#ffa76d',
            'A200': '#ffb686',
            'A400': '#ffc6a0',
            'A700': '#532100'
        };
        $mdThemingProvider
            .definePalette('customWarn',
                customWarn);

        var customBackground = {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#ffffff',
            '500': '#F4F5F7',
            '600': '#e5e8ec',
            '700': '#d6dae2',
            '800': '#c8cdd7',
            '900': '#b9bfcc',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#aab2c1'
        };
        $mdThemingProvider
            .definePalette('customBackground',
                customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent');
        // .warnPalette('customWarn')
        //.backgroundPalette('customBackground')

        /** ************* */


        $translateProvider.translations('es', {
            HEADLINE: 'Asociación Gallega de Fútbol Americano',
            INTRO_TEXT: 'And it has i18n support!'
        });

        $translateProvider.preferredLanguage('es');
        $translateProvider.useSanitizeValueStrategy(null);

    })
    .run(function($rootScope, appConfig) {
        // add images server base URL to rootScope
        $rootScope.imagesServer = appConfig.imagesServer;

        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from) {
            $rootScope.$previousState = from;
        });
    });