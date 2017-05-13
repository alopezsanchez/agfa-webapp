'use strict';

class EditFieldController {

    constructor($http, $mdToast, $state) {
        this.$http = $http;
        this.$mdToast = $mdToast;
        this.$state = $state;

        this.title = 'Editar campo de juego';
        this.teams = [];

        this.$http.get('/api/teams').then((response) => {
            if (response.data.length) {
                this.teams = response.data;
            }
        }, (err) => {
            console.log(err);
        });
    }

    $onInit() {
        this.field = this.field.data;
    }

    confirm(form) {
        if (form.$valid) {
            this.$http.put(`/api/fields/${this.field._id}`, this.field).then(() => {
                this.showToast();
                this.$state.go('fields');
            }, err => console.log(err));
        }
    }

    showToast() {
        this.$mdToast.show(
            this.$mdToast.simple()
            .parent(angular.element(document.body))
            .textContent('Campo de juego editado correctamente')
            .position('top right')
            .hideDelay(3000));
    }
}

angular.module('agfaWebappApp')
    .controller('EditFieldController', EditFieldController);