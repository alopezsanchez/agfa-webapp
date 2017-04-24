'use strict';

class CreateCompetitionController {
    constructor($http, $mdDialog, appConfig) {
        this.$http = $http;
        this.$mdDialog = $mdDialog;
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

    createWeek(ev) {
        this.$mdDialog.show({
            templateUrl: 'app/week/create-week.html',
            controller: 'CreateWeekController',
            controllerAs: '$ctrl',
            targetEvent: ev,
            openFrom: angular.element(document.body.querySelector('.new-week-button')),
            clickOutsideToClose: true,
            escapeToClose: true
        }).then(() => {
            /*this.$http.get('/api/teams').then(response => {
                this.teams = response.data;
            });*/
            console.log('hola');
        });
    }
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionController', CreateCompetitionController);