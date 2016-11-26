'use strict';

class CreateTeamController {

  constructor ($scope, User, $http, Team, $state, $mdToast) {

    this.clubs = [];
    this.team = {};
    this.$http = $http;
    this.state = $state;
    this.toast = $mdToast;
    this.clubTeams = [];
    this.parentTeam = null;
    this.searchText = '';
    this.submitted =  false;
    this.Team = Team;
    this.clubSelected = null;
    this.errors = {};
    this.selectParentTeam = false;

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
        this.$http.post('/api/teams', this.team)
        .then(() => {
          this.showToast();
          this.state.go('teams');
        })
        .catch(err => {
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
          .textContent('Equipo creado correctamente')
          .position('top right')
          .hideDelay(3000));
    }
}

angular.module('agfaWebappApp')
  .controller('CreateTeamCtrl', CreateTeamController);
