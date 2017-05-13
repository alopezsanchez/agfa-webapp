'use strict';

class CompetitionDetailController {
    constructor($state, $http, $stateParams) {
        this.$state = $state;
        this.$http = $http;
        this.$stateParams = $stateParams;
    }

    $onInit() {
        this.competition = this.competition.data;
        this.title = this.competition.name;
    }

    updateCompetition() {
        console.log(this.competition);
        /*this.competition.weeks = this.competition.weeks.map((week) => {
            delete week._id;
            return week;
        });*/

        angular.forEach(this.competition.weeks, (week) => {
            this.$http.put(`/api/competitions/${this.competition._id}/week`, week)
                .then((res) => {
                    console.log(res);
                }, err => console.log(err));
        });
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionDetailController', CompetitionDetailController);