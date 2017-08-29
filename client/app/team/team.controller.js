'use strict';

class TeamController {

    constructor($scope, Auth, $http, $mdDialog, $mdToast, $state, appConfig, $translate) {
        this.$scope = $scope;
        this.teams = [];
        this.$http = $http;
        this.dialog = $mdDialog;
        this.toast = $mdToast;
        this.state = $state;
        this.$translate = $translate;
        this.imagesServer = appConfig.imagesServer;
        this.Auth = Auth;
        this.filter = {
            categories: []
        };
        this.allCategories = appConfig.categories;

        this.$http.get('/api/teams')
            .then(response => {
                this.teams = response.data;
            });

        $http.get('/api/users/clubs')
            .then((response) => {
                this.clubs = response.data;
                this.clubs.map(function(club) {
                    club.value = club.name.toLowerCase();
                });
            });
    }

    $onInit() {
        this.$scope.$watch(() => {
            return this.filter;
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                if (!newValue.name) {
                    delete newValue.name;
                }

                // update teams list
                this.$http({
                    url: '/api/teams/',
                    method: 'GET',
                    params: newValue
                }).then((response) => {
                    this.teams = response.data;
                }, err => {
                    console.log(err);
                });
            }
        }, true);
    }

    clearFilters() {
        this.filter = {
            categories: []
        };
    }

    exists(item, list) {
        return list ? list.indexOf(item) > -1 : false;
    }

    toggle(item, list) {
        if (list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        }
    }

    delete(team) {
        this.$http.delete(`/api/teams/${team._id}`)
            .then(() => {
                this.teams.splice(this.teams.indexOf(team), 1);

                this.$translate('app.teams.deleted').then(value => {
                    this.showSimpleToast = () => {
                        this.toast.show(
                            this.toast.simple()
                            .parent(angular.element(document.body))
                            .textContent(value)
                            .position('top right')
                            .hideDelay(3000)
                        );
                    };

                    this.showSimpleToast();
                });

            });
    }

    createTeam(ev) {
        this.dialog.show({
            templateUrl: 'app/team/create/create-team.html',
            controller: 'CreateTeamController',
            controllerAs: '$ctrl',
            targetEvent: ev,
            openFrom: angular.element(document.body.querySelector('.new-team-button')),
            clickOutsideToClose: true,
            escapeToClose: false
        }).then(() => {
            this.$http.get('/api/teams')
                .then(response => {
                    this.teams = response.data;
                });
        });
    }


    showConfirm(ev, team) {
        let _this = this;

        const translateKeys = ['app.teams.confirmTitle', 'app.teams.confirmContent', 'app.teams.confirmAria', 'app.admin.confirmOk', 'cancel'];

        this.$translate(translateKeys).then(translations => {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = this.dialog.confirm()
                .title(translations['app.teams.confirmTitle'] + team.name + '?')
                .textContent(translations['app.teams.confirmContent'])
                .ariaLabel(translations['app.teams.confirmAria'])
                .targetEvent(ev)
                .ok(translations['app.admin.confirmOk'])
                .cancel(translations['cancel']);
            this.dialog.show(confirm).then(function() {
                _this.delete(team);
            });
        });
    }

    goToEdit(id) {
        this.state.go('editTeam', { id: id });
    }
}


angular.module('agfaWebappApp').controller('TeamController', TeamController);