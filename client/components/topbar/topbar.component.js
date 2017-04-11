'use strict';

const Topbar = {
    templateUrl: 'components/topbar/topbar.html',
    controller: 'TopbarController as $ctrl',
    bindings: {
        page: '='
    }
};

angular
    .module('agfaWebappApp')
    .component('topbar', Topbar);