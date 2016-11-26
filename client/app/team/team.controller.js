'use strict';

class TeamController {

  constructor($http) {
    this.teams = [];
    this.$http = $http;

    this.$http.get('/api/teams')
    .then(response => {
      this.teams = response.data;
    })
    .catch(err => {
      console.log(err);
    });
  }
}


angular.module('agfaWebappApp').controller('TeamCtrl', TeamController);
