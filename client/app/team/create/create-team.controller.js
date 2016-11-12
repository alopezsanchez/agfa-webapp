'use strict';

class CreateTeamController {


  constructor ($scope, User, $http) {

    this.clubs = [];
    this.team = {};
    this.clubTeams = [];
    this.searchText = '';

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
      
    }
}

angular.module('agfaWebappApp')
  .controller('CreateTeamCtrl', CreateTeamController);
