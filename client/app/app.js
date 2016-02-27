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
  'alAngularHero',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $mdIconProvider.icon('menu', './assets/images/menu.svg' , 24)
                    .icon('home', './assets/images/ic_home_black_36px.svg')
                    .icon('competition', './assets/images/trophy.svg')
                    .icon('agfa', './assets/images/agfa.jpg')
                    .icon('settings', './assets/images/settings.svg')
                    .icon('logout', './assets/images/logout.svg')
                    .icon('email', './assets/images/email.svg')
                    .icon('password', './assets/images/password.svg')
                    .icon('login', './assets/images/login.svg');

  });
