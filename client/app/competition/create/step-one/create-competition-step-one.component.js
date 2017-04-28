'use strict';

const CreateCompetitionStepOne = {
    templateUrl: 'app/competition/create/step-one/create-competition-step-one.html',
    controller: 'CreateCompetitionStepOneController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('createCompetitionStepOne', CreateCompetitionStepOne);