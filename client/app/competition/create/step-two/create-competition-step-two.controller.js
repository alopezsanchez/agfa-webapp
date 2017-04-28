'use strict';

class CreateCompetitionStepTwoController {
    constructor($http, $mdDialog, appConfig, $stateParams) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$stateParams = $stateParams;

        this.teamsSelected = [];
        this.title = 'Nueva competición';
        this.selectParentTeam = false;
        this.competition = this.$stateParams.competition;
        this.numberOfWeeks = this.$stateParams.numberOfWeeks;
    }
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionStepTwoController', CreateCompetitionStepTwoController);