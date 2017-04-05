'use strict';

const Topbar = {
    bindings: {
        pageTitle: '=pageTitle'
    },
    templateUrl: 'components/topbar/topbar.html',
    controller: 'TopbarController as $ctrl'
}

angular
    .module('agfaWebappApp')
    .component('topbar', Topbar);