'use strict';

const Login = {
    templateUrl: 'app/account/login/login.html',
    controller: 'LoginController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('login', Login);