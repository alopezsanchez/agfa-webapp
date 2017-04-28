'use strict';

describe('Controller: CreateCtrl', function () {

  // load the controller's module
  beforeEach(module('agfaWebappApp'));

  var CreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateCtrl = $controller('CreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
