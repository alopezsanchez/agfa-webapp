'use strict';

class SettingsController {
    constructor(Auth, appConfig, $mdToast, Upload, $state) {
        this.errors = {};
        this.submitted = false;
        this.title = 'Editar perfil';
        this.imagesServer = appConfig.imagesServer;
        this.defaultAvatar = appConfig.defaultAvatar;
        this.roles = appConfig.userRoles;
        this.Auth = Auth;
        this.upload = Upload;
        this.$state = $state;
        this.$mdToast = $mdToast;
        this.isAdmin = Auth.isAdmin();

        // Retrieve current user information
        /*this.user = Auth.getCurrentUser();*/
    }

    $onInit() {
        this.avatar = this.user.avatar;
        console.log(this.user);
    }

    changePassword(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {
                    this.showSimpleToast = function() {
                        this.$mdToast.show(
                            this.$mdToast.simple()
                            .parent(angular.element(document.body))
                            .textContent('Contraseña cambiada correctamente')
                            .position('top right')
                            .hideDelay(3000)
                        );
                    };

                    this.showSimpleToast();
                    this.$state.go('main');
                })
                .catch(() => {
                    form.password.$setValidity('mongoose', false);
                    //this.errors.other = 'Contraseña actual incorrecta';
                    this.message = 'Contraseña actual incorrecta';
                });
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
                    console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
                    // Include new avatar filename to avoid override
                    this.updateUser(form, resp.data.avatar);
                })
                .catch((resp) => {
                    this.errors.other = 'Error al subir la imagen.';
                    console.log('Error status: ' + resp.status);
                });
        } else {
            this.errors.other = 'Formato incorrecto. Por favor, inserta una imagen.';
        }
    }

    updateUser(form, avatar) {
        this.submitted = true;
        // update avatar filename before the request
        this.user.avatar = avatar;
        if (form.$valid) {
            this.Auth.updateUser(this.user, null)
                .then(() => {
                    this.showSimpleToast = function() {
                        this.$mdToast.show(
                            this.$mdToast.simple()
                            .parent(angular.element(document.body))
                            .textContent('Cambios guardados correctamente')
                            .position('top right')
                            .hideDelay(3000)
                        );
                    };

                    this.showSimpleToast();
                    this.$state.go('main');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

angular.module('agfaWebappApp')
    .controller('SettingsController', SettingsController);