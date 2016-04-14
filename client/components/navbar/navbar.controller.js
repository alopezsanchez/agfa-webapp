'use strict';

class NavbarController {
  //start-non-standard

  

  constructor(Auth,$scope, $mdSidenav) {
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
}

angular.module('agfaWebappApp').controller('NavbarController',NavbarController);
	