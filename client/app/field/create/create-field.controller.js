'use strict';

class CreateFieldController {

    constructor($state, $mdDialog, $mdToast, $http, appConfig) {
        this.$mdToast = $mdToast;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$http = $http;

        this.submitted = false;
        this.teams = [];
        this.imagesServer = appConfig.imagesServer;

        this.$http.get('/api/teams').then((response) => {
            if (response.data.length) {
                this.teams = response.data;
            }
        }, (err) => {
            err = err.data;
            this.errors = {
                err
            };

            console.log(err);
        });
    }


    confirm(form) {
        this.submitted = true;
        if (form.$valid) {
            this.$http.post('/api/fields', this.field).then(() => {
                this.$mdDialog.hide();
                this.showToast();
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

    showToast() {
        this.$mdToast.show(
            this.$mdToast.simple()
            .parent(angular.element(document.body))
            .textContent('Campo de juego creado correctamente')
            .position('top right')
            .hideDelay(3000));
    }

}

angular.module('agfaWebappApp')
    .controller('CreateFieldController', CreateFieldController);