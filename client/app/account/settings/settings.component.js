'use strict';

const Settings = {
    templateUrl: 'app/account/settings/settings.html',
    controller: 'SettingsController as $ctrl'
};

angular
    .module('agfaWebappApp')
    .component('settings', Settings);