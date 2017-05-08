'use strict';

class CompetitionDetailController {
    constructor($state, $http, $stateParams) {
        this.$state = $state;
        this.$http = $http;
        this.$stateParams = $stateParams;

        this.title = 'Detalle competición';

        this.competition = {};

        this.$http.get(`/api/competitions/${this.$stateParams.id}`)
            .then((res) => {
                this.competition = res.data;
                console.log(this.competition);
            }, (err) => {
                console.log(err);
            });
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionDetailController', CompetitionDetailController);