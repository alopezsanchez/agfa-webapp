'use strict';

class SignupController {
	//start-non-standard
	user = {};
	errors = {};
	submitted = false;
	roles = [];
	file = null;
	//end-non-standard

	constructor(Auth, $state, appConfig, Upload) {
		this.Auth = Auth;
		this.$state = $state;
		this.roles = appConfig.userRoles;
		this.upload = Upload;
	}

	// upload on file select or drop
	uploadImage (file) {
	        this.upload.upload({
	            url: '/api/upload-images',
	            data: {file: file, 'userId': this.user.name}
	        }).then(function (resp) {
	            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });
	  }

	register(form) {
		this.submitted = true;

		if (form.$valid) {
			this.Auth.createUser({
				name: this.user.name,
				email: this.user.email,
				password: this.user.password,
				role: this.user.role,
			})
				.then(() => {
					// Account created, redirect to home and upload the image file if exists
					this.uploadImage(this.file);
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
