'use strict';

angular.module('agfaWebappApp', [
  'agfaWebappApp.auth',
  'agfaWebappApp.admin',
  'agfaWebappApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngMaterial',
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
                    .icon('login', './assets/images/login.svg');

  });
