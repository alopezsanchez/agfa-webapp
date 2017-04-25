'use strict';

var NavbarController = function($scope, Auth, $mdSidenav, appConfig) {

    this.menu = [{
        'title': 'Usuarios',
        'state': 'admin',
        'icon': 'person'
    }, {
        'title': 'Competiciones',
        'state': 'competitions',
        'icon': 'competition'
    }, {
        'title': 'Equipos',
        'state': 'teams',
        'icon': 'helmet'
    }, {
        'title': 'Campos de juego',
        'state': 'fields',
        'icon': 'field'
    }];

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    Auth.getCurrentUser((user) => {
        this.user = user;
    });

    this.imagesServer = appConfig.imagesServer;

    $scope.showMobileMainHeader = true;
    this.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    this.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

    this.toggleSideNavPanel = function() {
        $mdSidenav('left').toggle();
    };

};

angular
    .module('agfaWebappApp')
    .controller('NavbarController', NavbarController);