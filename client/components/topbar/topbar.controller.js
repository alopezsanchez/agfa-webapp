'use strict';

class TopbarController {

    openMenu($mdMenu, event) {
        $mdMenu.open(event);
    }

    openSidenav() {
        this.$mdSidenav('sidenav').toggle();
    }

    constructor($scope, Auth, appConfig, $mdSidenav) {
        this.Auth = Auth;
        this.isLoggedIn = this.Auth.isLoggedIn;
        this.isAdmin = this.Auth.isAdmin();
        this.$mdSidenav = $mdSidenav;
        this.imagesServer = appConfig.imagesServer;
        this.userSettings = [];

        Auth.getCurrentUser((user) => {
            this.user = user;
        });

        this.userSettings = [{
                title: 'Mi perfil',
                state: 'settings',
                icon: 'settings'
            },
            {
                title: 'Salir',
                state: 'logout',
                icon: 'exit_to_app'
            }
        ];
    }
}

angular
    .module('agfaWebappApp')
    .controller('TopbarController', TopbarController);