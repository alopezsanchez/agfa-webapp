'use strict';

const EditTeam = {
    templateUrl: 'app/team/edit/edit-team.html',
    controller: 'EditTeamController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('editTeam', EditTeam);