'use strict';

class CompetitionController {
    constructor($http) {
        this.title = 'Competiciones';
        this.$http = $http;
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionController', CompetitionController);