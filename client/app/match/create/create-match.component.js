'use strict';

const CreateMatch = {
    templateUrl: 'app/match/create/create-match.html',
    controller: 'CreateMatchController as $ctrl',
    bindings: {
        teams: '='
    },
    require: 'ngModel'
};

angular
    .module('agfaWebappApp')
    .component('createMatch', CreateMatch);