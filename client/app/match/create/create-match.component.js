'use strict';

const CreateMatch = {
    templateUrl: 'app/match/create/create-match.html',
    controller: 'CreateMatchController as $ctrl',
    bindings: {
        competition: '='
    }
};

angular
    .module('agfaWebappApp')
    .component('createMatch', CreateMatch);