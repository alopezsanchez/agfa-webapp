'use strict';

class CreateCompetitionStepOneController {
    constructor($http, $mdDialog, appConfig, $state) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.categories = appConfig.categories.map(function(item) {
            return {
                name: item,
                value: item.toLowerCase()
            };
        });

        this.teamsSelected = [];
        this.selectParentTeam = false;
    }

    $onInit() {
        this.title = 'Nueva Competición';
    }

    updateTeams() {
        var categorieSelected = this.categorie;
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
                competition: this.competition
            };

            // navigate to step 2 passing competition info by param
            this.$state.go('createCompetitionStepTwo', info);
        }
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