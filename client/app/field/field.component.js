'use strict';

const Fields = {
    templateUrl: 'app/field/field.html',
    controller: 'FieldController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('fields', Fields);