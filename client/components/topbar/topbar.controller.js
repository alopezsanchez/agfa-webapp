'use strict';

class TopbarController {
  isCollapsed = true;
  Auth = null;

  toggleSidenav() {
    this.$mdSidenav('left').toggle();
  }

  constructor($scope, Auth, $mdSidenav) {
    this.Auth = Auth;
    this.isLoggedIn = this.Auth.isLoggedIn;
    this.isAdmin = this.Auth.isAdmin;
    this.getCurrentUser = this.Auth.getCurrentUser;
    this.$mdSidenav = $mdSidenav;
  }
}

angular
  .module('agfaWebappApp')
  .controller('TopbarController', TopbarController);
