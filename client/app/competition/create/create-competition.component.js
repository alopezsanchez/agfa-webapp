'use strict';

const CreateCompetition = {
    templateUrl: 'app/competition/create/create-competition.html',
    controller: 'CreateCompetitionController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('createCompetition', CreateCompetition);