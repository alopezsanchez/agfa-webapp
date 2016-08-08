'use strict';

class SignupController {
	//start-non-standard
	user = {};
	errors = {};
	submitted = false;
	roles = [];
	//end-non-standard

	constructor(Auth, $state, appConfig) {
		this.Auth = Auth;
		this.$state = $state;
		this.roles = appConfig.userRoles;
	}
	
	upload() {
		angular.element(document.querySelector('#input-file-id')).click();
	}

	register(form) {
		this.submitted = true;

		if (form.$valid) {
			this.Auth.createUser({
				name: this.user.name,
				email: this.user.email,
				password: this.user.password,
				role: this.user.role,
				image: this.user.image
			})
				.then(() => {
					// Account created, redirect to home
					this.$state.go('main');
				})
				.catch(err => {
					err = err.data;
					this.errors = {err};

					// Update validity of form fields that match the mongoose errors
					angular.forEach(err.errors, (error, field) => {
						form[field].$setValidity('mongoose', false);
						this.errors[field] = error.message;
					});
				});
		}
	}
}

angular.module('agfaWebappApp')
	.controller('SignupController', SignupController);
