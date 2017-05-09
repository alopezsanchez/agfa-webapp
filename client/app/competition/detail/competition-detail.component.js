'use strict';

const CompetitionDetail = {
    bindings: {
        competition: '<'
    },
    templateUrl: 'app/competition/detail/competition-detail.html',
    controller: 'CompetitionDetailController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('competitionDetail', CompetitionDetail);