'use strict';

const Confirm = {
    templateUrl: 'app/account/confirm/confirm.html',
    controller: 'ConfirmController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('confirm', Confirm);