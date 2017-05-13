'use strict';

const EditField = {
    templateUrl: 'app/field/eidt/edit-field.html',
    controller: 'FieldController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('editField', EditField);