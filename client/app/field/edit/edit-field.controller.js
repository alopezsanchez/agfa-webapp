'use strict';

class EditFieldController {

    constructor($mdToast) {
        this.$mdToast = $mdToast;
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