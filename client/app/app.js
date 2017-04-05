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
            '50': '#ffb8a1',
            '100': '#ffa588',
            '200': '#ff916e',
            '300': '#ff7e55',
            '400': '#ff6a3b',
            '500': '#FF5722',
            '600': '#ff4408',
            '700': '#ee3900',
            '800': '#d43300',
            '900': '#bb2d00',
            'A100': '#ffcbbb',
            'A200': '#ffdfd4',
            'A400': '#fff2ee',
            'A700': '#a12700'
        };
        $mdThemingProvider
            .definePalette('customWarn',
                customWarn);

        var customBackground = {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#fbfcfc',
            '300': '#ecf0f1',
            '400': '#dee4e7',
            '500': '#CFD8DC',
            '600': '#c0ccd1',
            '700': '#b1c0c6',
            '800': '#a3b4bc',
            '900': '#94a8b1',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#859ca6'
        };
        $mdThemingProvider
            .definePalette('customBackground',
                customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground');

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