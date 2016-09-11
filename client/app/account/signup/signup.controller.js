'use strict';

class SignupController {
	//start-non-standard
	user = {};
	errors = {};
	submitted = false;
	roles = [];
	file = null;
	//end-non-standard

	constructor(Auth, $state, $mdToast, appConfig, Upload) {
		this.Auth = Auth;
		this.$state = $state;
		this.roles = appConfig.userRoles;
		this.upload = Upload;
		this.toast = $mdToast;
	}

	// upload on file select or drop
	uploadImage (file, _id) {
	        this.upload.upload({
	            url: '/api/upload-images',
	            data: {file: file, email: this.user.email, _id: _id}
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
				.then((user) => {
					console.log(user);
					// Account created, redirect to home and upload the image file if exists
					if (this.file) {
						this.uploadImage(this.file, user._id);
					}
					this.showSimpleToast = function () {
						this.toast.show(
							this.toast.simple()
								.parent(angular.element('.main-container'))
								.textContent('Usuario registrado correctamente')
								.position('top right')
								.hideDelay(3000)
							);
					};

					this.showSimpleToast();

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
