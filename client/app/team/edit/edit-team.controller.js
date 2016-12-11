'use strict';

class EditTeamController {

  constructor ($scope, User, $http, Team, $state, $mdToast, $stateParams, appConfig) {

    this.clubs = [];
    this.team = {};
    this.$http = $http;
    this.state = $state;
    this.stateParams = $stateParams;
    this.toast = $mdToast;
    this.clubTeams = [];
    this.parentTeam = null;
    this.searchText = '';
    this.submitted =  false;
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
        this.clubSelected = this.team.club;
        this.categoriesSelected = this.team.categories;

        if (this.team.parentTeam) {
          this.selectParentTeam = true;
          this.parentTeam = this.team.parentTeam;
        }

      });

    $http.get('/api/users/clubs')
      .then((response) => {
        this.clubs = response.data;
        this.clubs.map(function (club) {
          club.value = club.name.toLowerCase();
        });
      });
  }

   querySearch(query) {
      var results = query ? this.clubs.filter(this.createFilterFor(query)) : this.clubs;
      return results;

    }

    createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };
    }

    selectedItemChange(item) {
      // obtain the club teams
      this.$http({
        url: '/api/teams/',
        method: 'GET',
        params: {club: item._id}
      })
      .then((response) => {
        this.clubTeams = response.data;
        if (this.clubTeams.length) {
          this.selectParentTeam = true;
        }
      })
      .catch(err => {
        console.log(err);
      });
    }

    create(form) {
      if (form.$valid) {
        this.team.club = this.clubSelected;
        this.team.parentTeam = JSON.parse(this.parentTeam);
        this.team.categories = this.categoriesSelected;
        this.$http.put(`/api/teams/${this.team._id}`, this.team)
        .then(() => {
          this.showToast();
          this.state.go('teams');
        })
        .catch(err => {
          console.log(err);
          err = err.data;
    	    this.errors = {err};

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
          .parent(angular.element('.main-container'))
          .textContent('Equipo editado correctamente')
          .position('top right')
          .hideDelay(3000));
    }
}

angular.module('agfaWebappApp')
  .controller('EditTeamCtrl', EditTeamController);
