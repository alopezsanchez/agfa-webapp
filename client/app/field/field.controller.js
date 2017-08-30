'use strict';

class FieldController {
    constructor($scope, $mdDialog, $http, $mdToast, $translate, $mdMedia) {
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$http = $http;
        this.$translate = $translate;
        this.$mdMedia = $mdMedia;

        this.title = 'Campos de juego';
        this.fields = [];

        this.$http.get('/api/fields').then((response) => {
            if (response.data.length) {
                this.fields = response.data;
            }
        });

        this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
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

    zoom(ev, field) {
        this.$mdDialog.show({
            templateUrl: 'app/field/map-zoom/map-zoom.html',
            controller: 'MapZoomController',
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                field: field
            },
            targetEvent: ev,
            openFrom: angular.element(document.body.querySelector('.zoom-button')),
            clickOutsideToClose: true,
            escapeToClose: true,
            fullscreen: false,
            hasBackdrop: false
        });
    }

    delete(field) {
        this.$http.delete(`/api/fields/${field._id}`).then(() => {

            // delete field from array
            this.fields.splice(this.fields.indexOf(field), 1);

            this.$translate('app.fields.deleted').then(value => {
                this.showSimpleToast = () => {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                        .parent(angular.element(document.body))
                        .textContent(value)
                        .position('top right')
                        .hideDelay(3000)
                    );
                };

                this.showSimpleToast();
            });
        });
    }

    showConfirm(ev, field) {

        this.$translate(['app.fields.confirmTitle', 'app.fields.confirmContent', 'app.fields.confirmAria', 'app.admin.confirmOk', 'cancel']).then(values => {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = this.$mdDialog.confirm()
                .title(values['app.fields.confirmTitle'] + field.name + '?')
                .textContent(values['app.fields.confirmContent'])
                .ariaLabel(values['app.fields.confirmAria'])
                .targetEvent(ev)
                .ok(values['app.admin.confirmOk'])
                .cancel(values['cancel']);
            this.$mdDialog.show(confirm).then(() => {
                this.delete(field);
            });
        });
    }
}

angular.module('agfaWebappApp')
    .controller('FieldController', FieldController);