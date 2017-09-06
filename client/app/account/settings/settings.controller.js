'use strict';

class SettingsController {
    constructor(Auth, appConfig, $mdToast, Upload, $state, $translate, $mdDialog, $scope) {
        this.errors = {};
        this.submitted = false;
        this.imagesServer = appConfig.imagesServer;
        this.defaultAvatar = appConfig.defaultAvatar;
        this.roles = appConfig.userRoles;
        this.Auth = Auth;
        this.upload = Upload;
        this.$state = $state;
        this.$mdToast = $mdToast;
        this.$translate = $translate;
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        this.isAdmin = Auth.isAdmin();
    }

    $onInit() {
        this.avatar = this.user.avatar;
    }

    changePassword(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {

                    this.$translate('app.account.settings.passwordChanged').then(value => {
                        this.showSimpleToast = function () {
                            this.$mdToast.show(
                                this.$mdToast.simple()
                                .parent(angular.element(document.body))
                                .textContent(value)
                                .position('top right')
                                .hideDelay(3000)
                            );
                        };

                        this.showSimpleToast();
                        this.$state.go('main');
                    });
                })
                .catch(() => {
                    form.password.$setValidity('mongoose', false);
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
        } else {
            if (form.file.$error.maxSize) {
                this.$translate(['app.account.settings.maxImageSize', 'app.account.settings.maxSize', 'accept']).then(values => {
                    this.$mdDialog.show(
                        this.$mdDialog.alert()
                        .parent(angular.element(document.querySelector('body')))
                        .clickOutsideToClose(false)
                        .title(values['app.account.settings.maxImageSize'])
                        .textContent(values['app.account.settings.maxSize'])
                        .ariaLabel('Upload Image Error')
                        .ok(values['accept'])
                    ).then(() => {
                        //this.file = null;
                        delete form.file.$error.maxSize;
                        delete form.$error.maxSize;
                        this.$scope.$broadcast('setFileToNull');
                    });
                });
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
                // Include new avatar filename to avoid override
                this.updateUser(form, resp.data.avatar);
            }).catch(() => {
                this.$translate('app.account.settings.uploadError').then(value => {
                    this.errors.other = value;
                });
            });
        } else {
            this.$translate('app.account.settings.incorrectImageFormat').then(value => {
                this.errors.other = value;
            });
        }
    }

    updateUser(form, avatar) {
        this.submitted = true;
        // update avatar filename before the request
        this.user.avatar = avatar || this.avatar;
        if (form.$valid) {
            this.Auth.updateUser(this.user, null)
                .then(() => {
                    this.$translate('app.account.settings.dataSaved').then(value => {
                        this.showSimpleToast = function () {
                            this.$mdToast.show(
                                this.$mdToast.simple()
                                .parent(angular.element(document.body))
                                .textContent(value)
                                .position('top right')
                                .hideDelay(3000)
                            );
                        };

                        this.showSimpleToast();
                        this.$state.go('main');
                    });
                })
                .catch((err) => {
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

    isDirty() {
        return true;
    }
}

angular.module('agfaWebappApp')
    .controller('SettingsController', SettingsController);
