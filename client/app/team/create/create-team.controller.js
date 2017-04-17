'use strict';

class CreateTeamController {

    constructor($scope, User, $http, Team, $state, $mdDialog, $mdToast, appConfig) {

        this.clubs = [];
        this.team = {};
        this.$http = $http;
        this.state = $state;
        this.toast = $mdToast;
        this.$mdDialog = $mdDialog;
        this.clubTeams = [];
        this.parentTeam = null;
        this.searchText = '';
        this.searchTerm = '';
        this.submitted = false;
        this.Team = Team;
        this.clubSelected = null;
        this.categoriesSelected = null;
        this.errors = {};
        this.selectParentTeam = false;
        this.allCategories = appConfig.categories.map(function(item) {
            return {
                name: item,
                value: item.toLowerCase()
            };
        });

        $http.get('/api/users/clubs')
            .then((response) => {
                this.clubs = response.data;
                this.clubs.map(function(club) {
                    club.value = club.name.toLowerCase();
                });
            });

    }

    selectedItemChange() {
        var item = this.clubSelected;
        // obtain the club teams
        this.$http({
                url: '/api/teams/',
                method: 'GET',
                params: {
                    club: item._id
                }
            })
            .then((response) => {
                this.clubTeams = response.data;
                if (this.clubTeams.length) {
                    this.selectParentTeam = true;
                }
            }, err => {
                err = err.data;
                this.errors = {
                    err
                };
            });
    }

    create(form) {
        if (form.$valid) {
            this.team.club = this.clubSelected;
            this.team.parentTeam = JSON.parse(this.parentTeam);
            this.team.categories = this.categoriesSelected;
            this.$http.post('/api/teams', this.team)
                .then(() => {
                    this.$mdDialog.hide();
                    this.showToast();
                    this.state.go('teams');
                }, err => {
                    err = err.data;
                    this.errors = {
                        err
                    };

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, (error, field) => {
                        form[field].$setValidity('mongoose', false);
                        this.errors[field] = error.message;
                    });
                });
        }
    }

    showToast() {
        this.toast.show(
            this.toast.simple()
            .parent(angular.element(document.body))
            .textContent('Equipo creado correctamente')
            .position('top right')
            .hideDelay(3000));
    }
}

angular.module('agfaWebappApp')
    .controller('CreateTeamController', CreateTeamController);