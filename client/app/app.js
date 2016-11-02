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
  .config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider, $mdIconProvider, $translateProvider) {
    $urlRouterProvider
      .otherwise('/404');

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
      .icon('file_upload', './assets/icons/file_upload.svg');

    $mdThemingProvider.theme('default').primaryPalette('indigo')
      .accentPalette('orange');

    $translateProvider.translations('es', {
      HEADLINE: 'Asociación Gallega de Fútbol Americano',
      INTRO_TEXT: 'And it has i18n support!'
    });

    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy(null);

  })
  .run(function ($rootScope, appConfig) {
    // add images server base URL to rootScope
    $rootScope.imagesServer = appConfig.imagesServer;

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
      $rootScope.$previousState = from;
    });
  });
