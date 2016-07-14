/*'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('agfaWebappApp'));
  beforeEach(module('stateMock'));

  var scope;
  var MainController;
  var state;
  var $httpBackend;
  var location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state, $location) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectPOST('/auth/local')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    location = $location;
    
    MainController = $controller('MainController', {
      $scope: scope,
      $location: location
    });
  }));

  it('should redirect to login', function() {
    //$httpBackend.flush();
    //state.go('login');
    //expect(state.current.name).to.equal('/login');
    state.expectTransitionTo('login');
  });
});*/
