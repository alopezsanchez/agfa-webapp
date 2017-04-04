'use strict';

var NavbarController = function($scope, Auth, $mdSidenav, appConfig) {

    this.userSettings = [{
        title: 'Mi perfil',
        state: 'settings',
        icon: 'settings'
    }];

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