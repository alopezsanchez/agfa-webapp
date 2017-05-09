'use strict';

const Classification = {
    bindings: {
        competition: '='
    },
    require: {
        competitionDetailCtrl: '^^competitionDetail'
    },
    templateUrl: 'app/classification/classification.html',
    controller: 'ClassificationController as classification'
};

angular
    .module('agfaWebappApp')
    .component('classification', Classification);