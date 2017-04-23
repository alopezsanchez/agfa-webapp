'use strict';

const Competitions = {
    templateUrl: 'app/competition/competition.html',
    controller: 'CompetitionController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('competitions', Competitions);