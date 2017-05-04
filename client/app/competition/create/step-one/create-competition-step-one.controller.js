'use strict';

class CreateCompetitionStepOneController {
    constructor($http, $mdDialog, appConfig, $state, $stateParams) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.categories = appConfig.categories.map(function(item) {
            return {
                name: item,
                value: item.toLowerCase()
            };
        });

        this.teamsSelected = [];
        this.selectParentTeam = false;
        this.weeks = [];
    }

    $onInit() {
        this.title = 'Nueva Competición';

        this.competition = this.$stateParams.competition;
        this.numberOfWeeks = this.$stateParams.numberOfWeeks;

        if (this.competition && this.competition.categorie) {
            this.updateTeams();
        }
    }

    updateTeams() {
        var categorieSelected = this.competition.categorie;
        this.teamsSelected = [];
        this.selectParentTeam = false;

        this.$http({
            url: '/api/teams/',
            method: 'GET',
            params: {
                categories: categorieSelected
            }
        }).then((response) => {
            this.teams = response.data;
            if (this.teams.length) {
                this.hasTeams = true;
            }
        }, err => {
            err = err.data;
            this.errors = {
                err
            };
        });
    }

    goToStep2(form) {
        if (form.$valid) {
            const info = {
                numberOfWeeks: this.numberOfWeeks,
                numberOfMatches: this.numberOfMatches,
                competition: this.competition
            };

            // navigate to step 2 passing competition info by param
            this.$state.go('createCompetitionStepTwo', info);
        }
    }

    onChangeWeeks() {
        if (this.numberOfWeeks < 1) {
            this.numberOfWeeks = 1;
        }

        for (let i = 1, l = this.numberOfWeeks; i <= l; i++) {
            this.weeks.push({
                number: i,
                matches: null
            });
        }

        console.log(this.weeks);
    }

    onChangeMatches() {
        if (this.numberOfMatches < 1) {
            this.numberOfMatches = 1;
        }

        this.weeks = this.weeks.map((week) => {
            week.matches = [];
            for (let i = 1, l = this.numberOfMatches; i <= l; i++) {
                week.matches.push({
                    number: i
                });
            }
            return week;
        });

        console.log(this.weeks);

    }

    /*createWeek(ev) {
        this.$mdDialog.show({
            templateUrl: 'app/week/create-week.html',
            controller: 'CreateWeekController',
            controllerAs: '$ctrl',
            targetEvent: ev,
            openFrom: angular.element(document.body.querySelector('.new-week-button')),
            clickOutsideToClose: true,
            escapeToClose: true
        }).then(() => {
            console.log('hola');
        });
    }*/
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionStepOneController', CreateCompetitionStepOneController);