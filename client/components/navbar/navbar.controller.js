'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },
  {
    'title' : 'Competiciones',
    'state' : 'competition'
  }];

  isCollapsed = true;
  //end-non-standard

  /**
   * Hide or Show the 'left' sideNav area
   */
  toggleList() {
    $mdSidenav('left').toggle();
  }


  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('agfaWebappApp').controller('NavbarController',NavbarController,['$mdSidenav']);
