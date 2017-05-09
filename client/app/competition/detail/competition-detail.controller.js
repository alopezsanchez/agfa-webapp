'use strict';

class CompetitionDetailController {
    constructor($state, $http, $stateParams) {
        this.$state = $state;
        this.$http = $http;
        this.$stateParams = $stateParams;

        this.title = 'Detalle competición';


        /*this.$http.get(`/api/competitions/${this.$stateParams.id}`)
            .then((res) => {
                this.competition = res.data;
            }, (err) => {
                console.log(err);
            });*/
    }

    $onInit() {
        this.competition = this.competition.data;
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionDetailController', CompetitionDetailController);