'use strict';

(function () {

    class AdminController {
        constructor(User, $scope, $mdDialog, $mdToast, appConfig, $translate, $mdMedia, Auth) {
            // Use the User $resource to fetch all users
            this.title = 'Usuarios';
            this.dialog = $mdDialog;
            this.toast = $mdToast;
            this.scope = $scope;
            this.imagesServer = appConfig.imagesServer;
            this.User = User;
            this.$translate = $translate;
            this.$mdMedia = $mdMedia;
            this.Auth = Auth;
        }

        $onInit() {
            this.notConfirmedUsers = this.User.query({ confirmed: false });
            this.confirmedUsers = this.User.query({ confirmed: true });

            this.isAdmin = this.Auth.hasRole('admin');
        }

        delete(user) {
            user.$remove().then(() => {
                if (user.confirmed) {
                    this.confirmedUsers.splice(this.confirmedUsers.indexOf(user), 1);
                } else {
                    this.notConfirmedUsers.splice(this.notConfirmedUsers.indexOf(user), 1);
                }

                this.$translate('app.admin.deleted').then(translation => {
                    this.showSimpleToast = () => {
                        this.toast.show(
                            this.toast.simple()
                                .parent(angular.element(document.body))
                                .textContent(translation)
                                .position('top right')
                                .hideDelay(3000)
                        );
                    };

                    this.showSimpleToast();
                });
            });
        }

        signup(ev) {
            this.dialog.show({
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

            const translateKeys = ['app.admin.confirmTitle', 'app.admin.confirmContent', 'app.admin.confirmAria', 'app.admin.confirmOk', 'cancel'];

            let translations = {};
            this.$translate(translateKeys).then(values => {
                translations = values;

                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = this.dialog.confirm()
                    .title(translations['app.admin.confirmTitle'] + user.name + '?')
                    .textContent(translations['app.admin.confirmContent'])
                    .ariaLabel(translations['app.admin.confirmAria'])
                    .targetEvent(ev)
                    .ok(translations['app.admin.confirmOk'])
                    .cancel(translations['cancel']);
                this.dialog.show(confirm).then(function () {
                    _this.delete(user);
                });
            });
        }
    }

    angular.module('agfaWebappApp.admin')
        .controller('AdminController', AdminController);

})();