'use strict';

class ErrorController {
  constructor($state, $rootScope) {
    this.state = $state;
    this.rootScope = $rootScope;
  }

  goBack() {
    this.state.go('main');
  }
}

angular.module('agfaWebappApp')
  .controller('ErrorController', ErrorController);
