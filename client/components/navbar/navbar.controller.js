'use strict';

var NavbarController = function ($scope, Auth, $mdSidenav) {

    this.menu = [
		{
			'title' : 'Usuarios',
			'state' : 'admin',
			'icon'  : 'person'
		},
		{
			'title' : 'Competiciones',
			'state' : 'competitions',
			'icon'  : 'competition'
    },
    {
      'title' : 'Equipos',
      'state' : 'teams',
      'icon'  : 'helmet'
    }];


    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    $scope.showMobileMainHeader = true;
    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

	$scope.toggleSideNavPanel = function() {
        $mdSidenav('left').toggle();
    };

};

angular.module('agfaWebappApp').controller('NavbarController',NavbarController);
