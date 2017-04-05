'use strict';

class TopbarController {
    isCollapsed = true;
    Auth = null;
    userSettings = [];

    openMenu($mdMenu, event) {
        $mdMenu.open(event);
    }

    constructor($scope, Auth, appConfig) {
        this.Auth = Auth;
        this.isLoggedIn = this.Auth.isLoggedIn;
        this.isAdmin = this.Auth.isAdmin();
        this.imagesServer = appConfig.imagesServer;

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