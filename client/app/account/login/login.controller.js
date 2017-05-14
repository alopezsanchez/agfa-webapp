'use strict';

class LoginController {
    constructor(Auth, $state, appConfig, $translate) {
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.imagesServer = appConfig.imagesServer;

        this.Auth = Auth;
        this.$state = $state;
        this.$translate = $translate;
    }

    login(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.login({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    // Logged in, redirect to home
                    this.$state.go('main');
                }, () => {
                    this.$translate('app.account.login.error').then(value => {
                        this.errors.other = value;
                    });
                });
        }
    }
}

angular.module('agfaWebappApp')
    .controller('LoginController', LoginController);