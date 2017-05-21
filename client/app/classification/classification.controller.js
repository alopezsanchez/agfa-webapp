'use strict';

class ClassificationController {
    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;

        this.teams = [];
        this.matches = [];
        this.dataAvailable = false;
    }

    $onInit() {
        // get all matches
        let promises = [];
        angular.forEach(this.competition.weeks, (id) => {
            promises.push(this.$http.get(`/api/weeks/${id}`));
            /*.then(res => {
                            angular.forEach(res.data.matches, match => {
                                this.matches.push(match);
                            });
                        }, err => console.log(err));*/
        });

        this.$q.all(promises).then(responses => {
            angular.forEach(responses, (res) => {
                angular.forEach(res.matches, match => {
                    this.matches.push(match);
                });
            });

            const teamPromises = [];

            angular.forEach(this.competition.teams, (id) => {
                teamPromises.push(this.$http.get(`/api/teams/${id}`));
                /*.then(res => {
                    let team = res.data;
                    team.gamesPlayed = 0;
                    angular.forEach(this.matches, (match) => {
                        if (match.localTeam._id === id || match.visitingTeam._id === id) {
                            team.gamesPlayed++;
                        }
                    });


                    this.teams.push(team);
                }, err => {
                    console.log(err);
                });*/

                this.$q.all(teamPromises).then(responses => {
                    angular.forEach(responses, res => {
                        let team = res.data;

                        team.gamesPlayed = 0;
                        angular.forEach(this.matches, (match, key) => {
                            if (match.localTeam._id === id || match.visitingTeam._id === id) {
                                team.gamesPlayed++;
                            }

                            if (key === this.matches.length - 1) {
                                this.dataAvailable = true;
                            }
                        });


                        this.teams.push(team);
                    });
                });
            });
        });

    }
}

angular.module('agfaWebappApp')
    .controller('ClassificationController', ClassificationController);