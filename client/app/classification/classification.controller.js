'use strict';

class ClassificationController {
    constructor($http) {
        this.$http = $http;

        this.teams = [];
    }

    $onInit() {
        angular.forEach(this.competition.teams, (id) => {
            this.$http.get(`/api/teams/${id}`)
                .then(res => {
                    this.teams.push(res.data);
                }, err => {
                    console.log(err);
                });
        });
    }
}

angular.module('agfaWebappApp')
    .controller('ClassificationController', ClassificationController);