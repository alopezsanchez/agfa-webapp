'use strict';

class TopbarController {

    openMenu($mdMenu, event) {
        $mdMenu.open(event);
    }

    openSidenav() {
        this.$mdSidenav('sidenav').toggle();
    }

    constructor($scope, Auth, appConfig, $mdSidenav, $translate) {
        this.Auth = Auth;
        this.isLoggedIn = this.Auth.isLoggedIn;
        this.isAdmin = this.Auth.isAdmin();
        this.$mdSidenav = $mdSidenav;
        this.$translate = $translate;
        this.imagesServer = appConfig.imagesServer;
        this.userSettings = [];

        Auth.getCurrentUser((user) => {
            this.user = user;
        });

        this.$translate(['app.components.topbar.settings.profile', 'app.components.topbar.settings.logout']).then(values => {
            this.userSettings = [{
                    title: values['app.components.topbar.settings.profile'],
                    state: 'settings',
                    icon: 'settings'
                },
                {
                    title: values['app.components.topbar.settings.logout'],
                    state: 'logout',
                    icon: 'exit_to_app'
                }
            ];
        });
    }
}

angular
    .module('agfaWebappApp')
    .controller('TopbarController', TopbarController);