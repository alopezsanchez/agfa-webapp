'use strict';

(function() {

    class AdminController {
        constructor(User, $scope, $mdDialog, $mdToast, appConfig) {
            // Use the User $resource to fetch all users
            this.title = 'Usuarios';
            this.dialog = $mdDialog;
            this.toast = $mdToast;
            this.scope = $scope;
            this.imagesServer = appConfig.imagesServer;
            this.User = User;
        }

        $onInit() {
            this.notConfirmedUsers = this.User.query({ confirmed: false });
            this.confirmedUsers = this.User.query({ confirmed: true });
        }

        delete(user) {
            user.$remove();
            if (user.confirmed) {
                this.confirmedUsers.splice(this.confirmedUsers.indexOf(user), 1);
            } else {
                this.notConfirmedUsers.splice(this.notConfirmedUsers.indexOf(user), 1);
            }

            this.showSimpleToast = () => {
                this.toast.show(
                    this.toast.simple()
                    .parent(angular.element(document.body))
                    .textContent('Usuario eliminado')
                    .position('top right')
                    .hideDelay(3000)
                );
            };

            this.showSimpleToast();
        }

        signup(ev) {
            const signup = this.dialog.show({
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupController',
                controllerAs: '$ctrl',
                targetEvent: ev,
                openFrom: angular.element(document.body.querySelector('.signup-button')),
                clickOutsideToClose: true,
                escapeToClose: false
            }).then(() => {
                this.notConfirmedUsers = this.User.query({ confirmed: false });
            });
        }

        showConfirm(ev, user) {
            let _this = this;
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = this.dialog.confirm()
                .title('¿Está seguro de eliminar el usuario ' + user.name + '?')
                .textContent('Este cambio es irreversible.')
                .ariaLabel('Eliminar usuario')
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');
            this.dialog.show(confirm).then(function() {
                _this.delete(user);
            }, function() {
                _this.scope.status = 'You decided to keep your debt.';
            });
        }
    }

    angular.module('agfaWebappApp.admin')
        .controller('AdminController', AdminController);

})();