'use strict';

const Classification = {
    templateUrl: 'app/classification/classification.html',
    controller: 'ClassificationController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('classification', Classification);