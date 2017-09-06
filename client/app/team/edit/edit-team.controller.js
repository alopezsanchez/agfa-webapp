'use strict';

class EditTeamController {

    constructor($scope, User, $http, Team, $state, $mdToast, $stateParams, $translate, appConfig) {

        this.clubs = [];
        this.team = {};
        this.$http = $http;
        this.state = $state;
        this.stateParams = $stateParams;
        this.$translate = $translate;
        this.toast = $mdToast;
        this.clubTeams = [];
        this.parentTeam = null;
        this.searchText = '';
        this.submitted = false;
        this.Team = Team;
        this.clubSelected = null;
        this.errors = {};
        this.categoriesSelected = [];
        this.selectParentTeam = false;
        this.allCategories = appConfig.categories.map(function(item) {
            return {
                name: item,
                value: item.toLowerCase()
            };
        });

        $http.get(`/api/teams/${$stateParams.id}`)
            .then((response) => {
                this.team = response.data;
                this.clubSelected = this.team.club._id;
                this.categoriesSelected = this.team.categories;

                if (this.team.parentTeam) {
                    this.selectParentTeam = true;
                    this.parentTeam = this.team.parentTeam;
                    this.selectedItemChange();
                } else if (this.clubSelected) {
                    this.selectParentTeam = true;
                    this.selectedItemChange();
                }
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
        // obtain the club teams
        this.$http({
                url: '/api/teams/',
                method: 'GET',
                params: { club: this.clubSelected }
            })
            .then((response) => {
                this.clubTeams = response.data;
                if (this.clubTeams.length) {
                    this.selectParentTeam = true;
                }
            });
    }

    create(form) {
        if (form.$valid) {
            this.team.club = this.clubSelected;
            if (this.parentTeam) {
                this.team.parentTeam = JSON.parse(this.parentTeam);
            } else {
                this.team.parentTeam = null;
            }
            this.team.categories = this.categoriesSelected;
            this.$http.put(`/api/teams/${this.team._id}`, this.team)
                .then(() => {
                    this.showToast();
                    this.state.go('teams');
                }, err => {
                    err = err.data;
                    this.errors = { err };

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, (error, field) => {
                        form[field].$setValidity('mongoose', false);
                        this.errors[field] = error.message;
                    });
                });
        }
    }

    showToast() {
        this.$translate('app.teams.edit.edited').then(value => {
            this.toast.show(
                this.toast.simple()
                .parent(angular.element(document.body))
                .textContent(value)
                .position('top right')
                .hideDelay(3000));
        });
    }
}

angular.module('agfaWebappApp')
    .controller('EditTeamController', EditTeamController);
