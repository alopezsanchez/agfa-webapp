'use strict';

angular.module('agfaWebappApp', [
        'agfaWebappApp.auth',
        'agfaWebappApp.admin',
        'agfaWebappApp.constants',
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
    .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider, $mdIconProvider, $translateProvider) {
        $urlRouterProvider
            .otherwise('/error/404');

        $locationProvider.html5Mode(true);
        $mdIconProvider.icon('menu', './assets/icons/menu.svg', 24)
            .icon('home', './assets/icons/ic_home_black_36px.svg')
            .icon('competition', './assets/icons/trophy.svg')
            .icon('agfa', './assets/icons/agfa.jpg')
            .icon('settings', './assets/icons/settings.svg')
            .icon('logout', './assets/icons/logout.svg')
            .icon('email', './assets/icons/email.svg')
            .icon('password', './assets/icons/password.svg')
            .icon('add', './assets/icons/add.svg')
            .icon('person', './assets/icons/person.svg')
            .icon('delete', './assets/icons/delete.svg')
            .icon('image', './assets/icons/image.svg')
            .icon('login', './assets/icons/login.svg')
            .icon('file_upload', './assets/icons/file_upload.svg')
            .icon('football', './assets/icons/football.svg')
            .icon('shield', './assets/icons/shield.svg')
            .icon('helmet', './assets/icons/helmet.svg');


        /** ************* */

        var customPrimary = {
            '50': '#a8bac3',
            '100': '#99aeb8',
            '200': '#8aa2ae',
            '300': '#7a96a3',
            '400': '#6b8a99',
            '500': '#607D8B',
            '600': '#566f7c',
            '700': '#4b626d',
            '800': '#41545e',
            '900': '#36474f',
            'A100': '#b7c6cd',
            'A200': '#c6d2d8',
            'A400': '#d5dee2',
            'A700': '#2c3940'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
                customPrimary);

        var customAccent = {
            '50': '#000000',
            '100': '#000000',
            '200': '#000000',
            '300': '#07090a',
            '400': '#11171a',
            '500': '#1c2429',
            '600': '#304047',
            '700': '#3b4d56',
            '800': '#455b66',
            '900': '#4f6875',
            'A100': '#304047',
            'A200': '#263238',
            'A400': '#1c2429',
            'A700': '#5a7684'
        };
        $mdThemingProvider
            .definePalette('customAccent',
                customAccent);

        var customWarn = {
            '50': '#e8efa5',
            '100': '#e3eb90',
            '200': '#dde77a',
            '300': '#d8e464',
            '400': '#d2e04f',
            '500': '#CDDC39',
            '600': '#c6d626',
            '700': '#b1c022',
            '800': '#9daa1e',
            '900': '#89951a',
            'A100': '#eef3bb',
            'A200': '#f3f7d1',
            'A400': '#f9fbe6',
            'A700': '#757f16'
        };
        $mdThemingProvider
            .definePalette('customWarn',
                customWarn);

        var customBackground = {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#fbfbfc',
            '500': '#ECEFF1',
            '600': '#dde3e6',
            '700': '#cfd6db',
            '800': '#c0cad1',
            '900': '#b1bec6',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#a3b1bb'
        };
        $mdThemingProvider
            .definePalette('customBackground',
                customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground')

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