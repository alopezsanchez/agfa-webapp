'use strict';

const CreateCompetitionStepTwo = {
    bindings: {
        $transition$: '<'
    },
    templateUrl: 'app/competition/create/step-two/create-competition-step-two.html',
    controller: 'CreateCompetitionStepTwoController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('createCompetitionStepTwo', CreateCompetitionStepTwo);