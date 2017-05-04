'use strict';

class CreateCompetitionStepTwoController {
    constructor($http, $mdDialog, appConfig, $state, $stateParams, $mdEditDialog) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$mdEditDialog = $mdEditDialog;

        this.teamsSelected = [];
        this.title = 'Nueva competición';
        this.selectParentTeam = false;
        this.competition = this.$stateParams.competition;
        this.numberOfWeeks = this.$stateParams.numberOfWeeks;
        this.numberOfMatches = this.$stateParams.numberOfMatches;

        console.log(this.competition);

        this.weeks = new Array(this.numberOfWeeks);
        this.weeks = this.weeks.map((week, index) => {
            week.id = index + 1;
            week.matches = new Array(this.numberOfMatches);
            return week;
        });

        console.log(this.weeks);
    }


    $onInit() {}

    goBack() {
        if (this.$transition$.from().name) {
            this.$state.go(this.$transition$.from().name, {
                numberOfWeeks: this.numberOfWeeks,
                numberOfMatches: this.numberOfMatches,
                competition: this.competition
            });
        } else {
            this.$state.go('createCompetitionStepOne');
        }
    }

    editTime(event, match) {
        event.stopPropagation();

        this.$mdEditDialog.small({
            messages: {
                required: 'Campo obligatorio'
            },
            modelValue: match.time,
            placeholder: 'Hora',
            save: function(input) {
                match.time = input.$modelValue;
            },
            targetEvent: event,
            validators: {
                required: true
            }
        });
    }
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionStepTwoController', CreateCompetitionStepTwoController);