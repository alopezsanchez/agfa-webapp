'use strict';

class SignupController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    roles = [];
    file = null;
    //end-non-standard

    constructor(Auth, $state, $mdToast, appConfig, Upload, $mdDialog, $translate) {
        this.Auth = Auth;
        this.$state = $state;
        this.roles = appConfig.userRoles;
        this.upload = Upload;
        this.toast = $mdToast;
        this.defaultAvatar = appConfig.defaultAvatar;
        this.$mdDialog = $mdDialog;
        this.$translate = $translate;
    }

    cancel() {
        this.$mdDialog.hide();
    }

    register(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Auth.createUser({
                name: this.user.name,
                email: this.user.email,
                avatar: this.defaultAvatar,
                role: this.user.role,
            }).then((user) => {
                // Account created, redirect to home and upload the image file if exists
                if (this.file) {
                    this.uploadImage(this.file, user._id);
                }
                this.showSimpleToast = () => {
                    let translatedString;
                    this.$translate('app.account.signup.registered').then(value => {
                        translatedString = value;

                        this.toast.show(
                            this.toast.simple()
                            .parent(angular.element(document.body))
                            .textContent(translatedString)
                            .position('top right')
                            .hideDelay(3000)
                        );
                    });
                };

                this.showSimpleToast();

                this.$mdDialog.hide();

                //this.$state.go('main');
            }, err => {
                err = err.data;
                this.errors = { err };

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