'use strict';

const Week = {
    bindings: {
        competition: '='
    },
    templateUrl: 'app/week/week.html',
    controller: 'WeekController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('week', Week);