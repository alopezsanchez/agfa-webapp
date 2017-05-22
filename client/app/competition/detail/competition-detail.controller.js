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
        this.$rootScope.$emit('updateCompetition', this.competition._id);
        this.$rootScope.$emit('refreshClassification');
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionDetailController', CompetitionDetailController);