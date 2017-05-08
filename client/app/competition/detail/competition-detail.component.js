'use strict';

const CompetitionDetail = {
    templateUrl: 'app/competition/detail/competition-detail.html',
    controller: 'CompetitionDetailController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('competitionDetail', CompetitionDetail);