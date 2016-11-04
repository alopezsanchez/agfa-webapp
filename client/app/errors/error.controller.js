'use strict';

class ErrorController {
  constructor($state, $rootScope) {
    this.state = $state;
    this.rootScope = $rootScope;
  }

  goBack() {
    try {
      this.state.go(this.rootScope.$previousState.name);
    } catch(e) {
      this.state.go('main');
    }

  }
}

angular.module('agfaWebappApp')
  .controller('ErrorController', ErrorController);
