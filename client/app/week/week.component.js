'use strict';

const Week = {
    bindings: {
        info: '<'
    },
    templateUrl: 'app/week/week.html',
    controller: 'WeekController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('week', Week);