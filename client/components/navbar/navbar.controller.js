'use strict';

var NavbarController = function ($scope, Auth, $mdSidenav, $translate, appConfig) {

	$translate(['app.components.navbar.users', 'app.components.navbar.competitions', 'app.components.navbar.teams', 'app.components.navbar.fields'])
		.then(values => {
			this.menu = [{
				'title': values['app.components.navbar.fields'],
				'state': 'fields',
				'icon': 'field'
			}, {
				'title': values['app.components.navbar.competitions'],
				'state': 'competitions',
				'icon': 'competition'
			}, {
				'title': values['app.components.navbar.teams'],
				'state': 'teams',
				'icon': 'helmet'
			}, {
				'title': values['app.components.navbar.users'],
				'state': 'admin',
				'icon': 'person',
				'adminOnly': true
			}];
		});

	this.isLoggedIn = Auth.isLoggedIn;
	this.isAdmin = Auth.isAdmin;
	Auth.getCurrentUser((user) => {
		this.user = user;
	});

	this.isAuthorized = (menuItem) => {
		return menuItem.adminOnly && !Auth.hasRole('admin') ? false : true;
	};

	this.imagesServer = appConfig.imagesServer;

	$scope.showMobileMainHeader = true;
	this.openSideNavPanel = function () {
		$mdSidenav('left').open();
	};
	this.closeSideNavPanel = function () {
		$mdSidenav('left').close();
	};

	this.toggleSideNavPanel = function () {
		$mdSidenav('left').toggle();
	};

};

angular
	.module('agfaWebappApp')
	.controller('NavbarController', NavbarController);
