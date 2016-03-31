'use strict';

describe('Controller: CompetitionsCtrl', function () {

  // load the controller's module
  beforeEach(module('agfaWebappApp'));

  var CompetitionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompetitionsCtrl = $controller('CompetitionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
