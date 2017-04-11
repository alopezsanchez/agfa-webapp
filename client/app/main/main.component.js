'use strict';

const Main = {
    templateUrl: 'app/main/main.html',
    controller: 'MainController'
};

angular
    .module('agfaWebappApp')
    .component('main', Main);