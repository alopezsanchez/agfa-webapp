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
    }

    updateCompetition() {
        this.$rootScope.$emit('updateCompetition');
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionDetailController', CompetitionDetailController);