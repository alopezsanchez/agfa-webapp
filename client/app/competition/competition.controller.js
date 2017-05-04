'use strict';

class CompetitionController {
    constructor() {
        this.title = 'Competiciones';
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionController', CompetitionController);