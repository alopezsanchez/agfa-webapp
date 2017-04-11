'use strict';

const Admin = {
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('admin', Admin);