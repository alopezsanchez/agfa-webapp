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
    $mdIconProvider.icon('menu', './assets/icons/menu.svg' , 24)
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
                    .icon('login', './assets/icons/login.svg');
					
	$mdThemingProvider.theme('default').primaryPalette('indigo')
    .accentPalette('orange');

  });
