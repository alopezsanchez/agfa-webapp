'use strict';

(function() {

    class MainController {

        constructor($http, Auth, $state) {
            this.$state = $state;
            this.$http = $http;

            if (!Auth.isLoggedIn()) {
                this.$state.transitionTo('login');
                //this.$state.go('login');
            }
        }
    }

    angular.module('agfaWebappApp')
        .controller('MainController', MainController);

})();