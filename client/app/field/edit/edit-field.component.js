'use strict';

const EditField = {
    bindings: {
        field: '<'
    },
    templateUrl: 'app/field/edit/edit-field.html',
    controller: 'EditFieldController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('editField', EditField);