'use strict';

class SettingsController {
    constructor(Auth, appConfig, $mdToast) {
        this.errors = {};
        this.submitted = false;
        this.title = 'Editar perfil';
        this.imagesServer = appConfig.imagesServer;
        this.defaultAvatar = appConfig.defaultAvatar;
        this.roles = appConfig.userRoles;
        this.Auth = Auth;
        this.$mdToast = $mdToast;
        this.isAdmin = Auth.isAdmin();

        // Retrieve current user information
        this.user = Auth.getCurrentUser();
    }

    changePassword(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {
                    this.message = 'Password successfully changed.';
                })
                .catch(() => {
                    form.password.$setValidity('mongoose', false);
                    this.errors.other = 'Incorrect password';
                    this.message = '';
                });
        }
    }

    updateUser(form) {
        this.submitted = true;

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

                    // TODO: Transition to main???
                })
                .catch((err) => {
                    form.password.$setValidity('mongoose', false);
                    this.errors.other = 'Incorrect password';
                });
        }
    }
}

angular.module('agfaWebappApp')
    .controller('SettingsController', SettingsController);