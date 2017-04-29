'use strict';

class CreateCompetitionStepTwoController {
    constructor($http, $mdDialog, appConfig, $state, $stateParams) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$stateParams = $stateParams;

        this.teamsSelected = [];
        this.title = 'Nueva competición';
        this.selectParentTeam = false;
        this.competition = this.$stateParams.competition;
        this.numberOfWeeks = this.$stateParams.numberOfWeeks;
    }

    $onInit() {}

    goBack() {
        if (this.$transition$.from().name) {
            this.$state.go(this.$transition$.from().name, {
                numberOfWeeks: this.numberOfWeeks,
                competition: this.competition
            });
        }
    }
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionStepTwoController', CreateCompetitionStepTwoController);