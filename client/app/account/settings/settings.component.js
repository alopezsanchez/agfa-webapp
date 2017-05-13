'use strict';

const Settings = {
    bindings: {
        user: '<'
    },
    templateUrl: 'app/account/settings/settings.html',
    controller: 'SettingsController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('settings', Settings);