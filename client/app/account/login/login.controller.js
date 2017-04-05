'use strict';

class LoginController {
    constructor(Auth, $state, appConfig) {
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.imagesServer = appConfig.imagesServer;

        this.Auth = Auth;
        this.$state = $state;
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
                })
                .catch(err => {
                    this.errors.other = err.message;
                });
        }
    }
}

angular.module('agfaWebappApp')
    .controller('LoginController', LoginController);