'use strict';

class CreateCompetitionStepOneController {
    constructor($http, $mdDialog, appConfig, $state, $stateParams, $mdToast) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$mdToast = $mdToast;
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

    onChangeWeeks() {
        if (this.numberOfWeeks < 1) {
            this.numberOfWeeks = 1;
        }

        if (this.weeks && this.weeks.length >= this.numberOfWeeks) {
            return;
        }

        for (let i = 1, l = this.numberOfWeeks; i <= l; i++) {
            this.weeks.push({
                number: i,
                matches: null
            });
        }
    }

    onChangeMatches() {
        if (this.numberOfMatches < 1) {
            this.numberOfMatches = 1;
        }

        this.weeks = this.weeks.map((week) => {
            if (week.matches && week.matches.length >= this.numberOfMatches) {
                return week;
            }
            week.matches = [];
            for (let i = 1, l = this.numberOfMatches; i <= l; i++) {
                week.matches.push({
                    number: i
                });
            }
            return week;
        });
    }

    showToast() {
        this.$mdToast.show(
            this.$mdToast.simple()
            .parent(angular.element(document.body))
            .textContent('Competición creada correctamente')
            .position('top right')
            .hideDelay(3000));
    }

    submit(form) {
        if (form.$valid) {
            this.competition.weeks = this.weeks;
            this.competition.active = false;

            this.$http.post('/api/competitions', this.competition)
                .then(() => {
                    this.showToast();
                    this.$state.go('competitions');
                }, (err) => {
                    console.log(err);
                });
        }
    }
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionStepOneController', CreateCompetitionStepOneController);