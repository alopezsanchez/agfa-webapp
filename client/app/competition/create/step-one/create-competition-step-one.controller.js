'use strict';

class CreateCompetitionStepOneController {
    constructor($http, $mdDialog, appConfig, $state, $stateParams, $mdToast, $translate, $q) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$mdToast = $mdToast;
        this.$translate = $translate;
        this.$q = $q;
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

    canShowWeeks() {
        return this.competition && this.competition.name && this.competition.year && this.competition.category && this.competition.teamsSelected && this.numberOfWeeks && this.numberOfMatches;
    }

    updateTeams() {
        var categorySelected = this.competition.category;
        this.teamsSelected = [];
        this.selectParentTeam = false;

        this.$http({
            url: '/api/teams/',
            method: 'GET',
            params: {
                categories: categorySelected
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

        this.weeks = [];
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
        this.$translate('app.competitions.create.created').then(value => {
            this.$mdToast.show(
                this.$mdToast.simple()
                .parent(angular.element(document.body))
                .textContent(value)
                .position('top right')
                .hideDelay(3000));
        });

    }

    submit(form) {
        if (form.$valid) {
            this.competition.weeks = this.weeks;
            this.competition.active = false;
            this.competition.teams = this.competition.teamsSelected.map((team) => {
                return team._id;
            });
            delete this.competition.teamsSelected;

            // create weeks
            let weeks = [];
            let promises = [];

            angular.forEach(this.competition.weeks, (week) => {
                promises.push(this.$http.post('/api/weeks', week));
            });

            this.$q.all(promises).then((results) => {
                results.map(week => {
                    weeks.push(week.data._id);
                });

                this.competition.weeks = weeks;
                this.$http.post('/api/competitions', this.competition)
                    .then(() => {
                        this.showToast();
                        this.$state.go('competitions');
                    }, (err) => {
                        console.log(err);
                    });
            });
        }
    }
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionStepOneController', CreateCompetitionStepOneController);
