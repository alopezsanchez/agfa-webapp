'use strict';

class FieldController {
    constructor($mdDialog, $http, $mdToast) {
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$http = $http;

        this.title = 'Campos de juego';
        this.fields = [];

        this.$http.get('/api/fields').then((response) => {
            if (response.data.length) {
                this.fields = response.data;
            }
        });
    }

    createField(ev) {
        this.$mdDialog.show({
            templateUrl: 'app/field/create/create-field.html',
            controller: 'CreateFieldController',
            controllerAs: '$ctrl',
            targetEvent: ev,
            openFrom: angular.element(document.body.querySelector('.new-field-button')),
            clickOutsideToClose: true,
            escapeToClose: false,
            fullscreen: false
        }).then(() => {
            this.$http.get('/api/fields')
                .then(response => {
                    this.fields = response.data;
                });
        });
    }

    delete(field) {
        this.$http.delete(`/api/fields/${field._id}`).then(() => {

            // delete field from array
            this.fields.splice(this.fields.indexOf(field), 1);

            this.showSimpleToast = () => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                    .parent(angular.element(document.body))
                    .textContent('Campo eliminado')
                    .position('top right')
                    .hideDelay(3000)
                );
            };

            this.showSimpleToast();
        });
    }

    showConfirm(ev, field) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this.$mdDialog.confirm()
            .title('¿Está seguro de eliminar el ' + field.name + '?')
            .textContent('Este cambio es irreversible.')
            .ariaLabel('Eliminar campo de juego')
            .targetEvent(ev)
            .ok('Eliminar')
            .cancel('Cancelar');
        this.$mdDialog.show(confirm).then(() => {
            this.delete(field);
        });
    }
}

angular.module('agfaWebappApp')
    .controller('FieldController', FieldController);