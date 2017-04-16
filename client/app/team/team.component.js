'use strict';

const Team = {
    templateUrl: 'app/team/team.html',
    controller: 'TeamController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('team', Team);