'use strict';

describe('Controller: CreateTeamCtrl', function () {

  // load the controller's module
  beforeEach(module('agfaWebappApp'));

  var CreateTeamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateTeamCtrl = $controller('CreateTeamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
