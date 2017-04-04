'use strict';

const Topbar = {
    templateUrl: 'components/topbar/topbar.html',
    controller: 'TopbarController as topbarCtrl'
}

angular
    .module('agfaWebappApp')
    .component('topbar', Topbar);