'use strict';

(function() {
	class ConfirmController {
		constructor(User, Auth, $state, $http, $stateParams) {
			this.user = {};
			this.errors = {};
			this.submitted = false;

			this.Auth = Auth;
			this.state = $state;

			/*$http.get('/api/users/'+$stateParams.token+'/signUpToken').then(response => {
	      		this.user = response.data;
	    	});*/
		}

		confirm(form) {

		}
	}

	angular.module('agfaWebappApp')
		.controller('ConfirmController', ConfirmController);
})();
