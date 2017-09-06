'use strict';

class ConfirmController {

    constructor(User, Auth, $state, $http, $scope, $stateParams, $mdToast, appConfig, Upload, $mdDialog) {
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
        this.$mdDialog = $mdDialog;
        this.toast = $mdToast;
        this.defaultAvatar = appConfig.defaultAvatar;
        this.imagesServer = appConfig.imagesServer;
        this.title = 'Confirmación de registro';
        this.file = null;

        this.$http.get('/api/users/' + $stateParams.token + '/signUpToken').then((response) => {
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
                    // Include new avatar filename to avoid override
                    this.updateUser(form, resp.data.avatar);
                })
                .catch(() => {
                    this.errors.other = 'Error al subir la imagen.';
                });
        } else {
            this.errors.other = 'Formato incorrecto. Por favor, inserta una imagen.';
        }
    }

    confirm(form) {
        this.submitted = true;
        if (form.$valid) {
            if (this.file) {
                // Upload file and update user
                this.uploadImage(this.file, this.user._id, form);
            } else {
                this.updateUser(form);
            }
        }
    }

    updateUser(form, avatar) {
        // update avatar filename before the request
        this.user.avatar = avatar;
        this.$http.put(`/api/users/${this.user._id}/confirm`, this.user)
            .then(() => {
                // Account confirmed
                this.$mdDialog.show(
                    this.$mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(false)
                    .title('¡Te has registrado correctamente!')
                    .textContent('A partir de ahora podrás iniciar sesión con el usuario creado.')
                    .ariaLabel('Confirm dialog')
                    .ok('Aceptar')
                    //.targetEvent(ev)
                ).then(() => {
                    this.state.go('main');
                });

                // TODO: Send mail to admins confirmating registration
            }, err => {
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
