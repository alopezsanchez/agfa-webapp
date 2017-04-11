'use strict';

const Signup = {
    templateUrl: 'app/account/signup/signup.html',
    controller: 'SignupController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('signup', Signup);