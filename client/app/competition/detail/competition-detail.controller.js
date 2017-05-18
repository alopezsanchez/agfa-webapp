'use strict';

class CompetitionDetailController {
    constructor($state, $http, $stateParams, $rootScope) {
        this.$state = $state;
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
    }

    $onInit() {
        this.competition = this.competition.data;
        this.title = this.competition.name;

        console.log(this.competition);
    }

    updateCompetition() {
        console.log(this.competition.weeks);
        /*this.competition.weeks = this.competition.weeks.map((week) => {
            delete week._id;
            return week;
        });*/

        this.$rootScope.$emit('updateCompetition', 'hola');

        /*angular.forEach(this.competition.weeks, (week) => {
            this.$http.put(`/api/competitions/${this.competition._id}/week`, week)
                .then((res) => {
                    console.log(res);
                }, err => console.log(err));
        });*/
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionDetailController', CompetitionDetailController);