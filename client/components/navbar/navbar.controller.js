'use strict';

class NavbarController {
  //start-non-standard

  
  /*this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);  
  };*/

  isCollapsed = true;
  //end-non-standard

  /**
   * Hide or Show the 'left' sideNav area
   */
  /*toggleList() {
    $mdSidenav('left').toggle();
  }*/
  openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);  
  };
    

  constructor(Auth) {
    this.menu = [{  
        'title' : 'Competiciones',
        'state' : 'competition',
        'icon'  : 'competition'
    }];
    
    var originatorEv;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('agfaWebappApp').controller('NavbarController',NavbarController,/*['$mdDialog']*/);
