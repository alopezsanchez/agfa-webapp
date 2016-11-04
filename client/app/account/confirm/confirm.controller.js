'use strict';

class ConfirmController {

	constructor(User, Auth, $state, $http, $scope, $stateParams, $mdToast, appConfig, Upload) {
		//var _this = this;
		this.user = {};
		this.errors = {};
		this.submitted = false;
		this.roles = appConfig.userRoles;
		this.$http = $http;
		this.$scope = $scope;
		this.Auth = Auth;
		this.state = $state;
		this.upload = Upload;
		this.toast = $mdToast;
		this.defaultAvatar = appConfig.defaultAvatar;

		this.$http.get('/api/users/' + $stateParams.token + '/signUpToken').then((response) => {
			//$scope.user = response.data;
			if (!response.data) {
				return;
			}
			this.user = response.data;
		});

	}

	// upload on file select or drop
	uploadImage(file, _id, form) {
		if (file.type.indexOf('image/') !== -1) {
			this.upload.upload({
				url: '/api/upload-images',
				data: {
					file: file,
					email: this.user.email,
					_id: _id
				}
			}).then((resp) => {
					console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
					this.updateUser(form);
				})
				.catch((resp) => {
					this.errors.other = 'Error al subir la imagen.';
					console.log('Error status: ' + resp.status);
				});
			}
			else {
				this.errors.other = 'Formato incorrecto. Por favor, inserta una imagen.';
			}
		}

		confirm(form) {
			this.submitted = true;
			if (form.$valid) {
				if (this.$scope.file) {
					// Upload file and update user
					this.uploadImage(this.$scope.file, this.user._id, form);
				} else {
					this.updateUser(form);
				}
			}
		}

		updateUser(form) {
			this.$http.put(`/api/users/${this.user._id}/update`, this.user)
				.then(() => {
					// Account confirmed
					this.showSimpleToast = function() {
						this.toast.show(
							this.toast.simple()
							.parent(angular.element('.main-container'))
							.textContent('¡Te has registrado correctamente!')
							.position('top right')
							.hideDelay(3000)
						);
					};

					this.showSimpleToast();

					this.state.go('main');

					// TODO: Send mail to admins confirmating registration
				})
				.catch(err => {
					err = err.data;
					this.errors = {
						err
					};

					// Update validity of form fields that match the mongoose errors
					angular.forEach(err.errors, (error, field) => {
						form[field].$setValidity('mongoose', false);
						this.errors[field] = error.message;
					});
				});
		}
	}



	angular.module('agfaWebappApp')
		.controller('ConfirmController', ConfirmController);
