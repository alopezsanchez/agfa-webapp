'use strict';

angular.module('agfaWebappApp')
  .controller('CompetitionsCtrl', function ($scope, $mdDialog) {
  	$scope.message = 'Hello';
	
	$scope.status = '  ';
	  
	$scope.showAdvanced = function(event) {
               $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true,           
                  template: '<md-dialog>' +
                              '  <md-dialog-content>' +
                              '     Welcome to TutorialsPoint.com' +
                              '  </md-dialog-content>' +
                              '</md-dialog>',
                  controller: function DialogController($scope, $mdDialog) {
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               });
            };
	
	/*function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	};*/
  });
