'use strict';

angular.module('agfaWebappApp')
  .directive('topbar', () => ({
    templateUrl: 'components/topbar/topbar.html',
    restrict: 'E',
    controller: 'TopbarController',
    controllerAs: 'top'
  }));
