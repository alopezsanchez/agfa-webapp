'use strict';

class CompetitionController {
    constructor($scope, $http, $state, $mdDialog, $mdToast, $translate, appConfig) {
        this.$scope = $scope;
        this.$http = $http;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$translate = $translate;
        this.competitions = [];
        this.allCategories = appConfig.categories;

        this.filter = {
            category: ''
        };

        this.$http.get('/api/competitions')
            .then((res) => {
                this.competitions = res.data;
            }, (err) => {
                console.log(err);
            });
    }

    $onInit() {
        this.$scope.$watch(() => {
            return this.filter;
        }, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                // update competitions list
                if (!newValue.category) {
                    delete newValue.category;
                }
                if (!newValue.name) {
                    delete newValue.name;
                }

                this.$http({
                    url: '/api/competitions/',
                    method: 'GET',
                    params: newValue
                }).then((response) => {
                    this.competitions = response.data;
                }, err => {
                    console.log(err);
                });
            }
        }, true);
    }

    exists(item) {
        return item === this.filter.category;
    }

    toggle(item) {
        if (this.filter.category === item) {
            this.filter.category = '';
        } else {
            this.filter.category = item;
        }
    }

    clearFilters() {
        this.filter = {
            category: null
        };
    }

    detail(id) {
        this.$state.go('competitionDetail', { id: id });
    }

    delete(competition) {
        this.$http.delete(`/api/competitions/${competition._id}`)
            .then(() => {
                this.competitions.splice(this.competitions.indexOf(competition), 1);

                this.$translate('app.competitions.deleted').then(value => {
                    this.showSimpleToast = () => {
                        this.$mdToast.show(
                            this.$mdToast.simple()
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

    showConfirm(ev, competition) {
        let _this = this;

        this.$translate(['app.competitions.confirmTitle', 'app.competitions.confirmContent', 'app.competitions.confirmAria', 'app.admin.confirmOk', 'cancel']).then(values => {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = this.$mdDialog.confirm()
                .title(values['app.competitions.confirmTitle'] + competition.name + '?')
                .textContent(values['app.competitions.confirmContent'])
                .ariaLabel(values['app.competitions.confirmAria'])
                .targetEvent(ev)
                .ok(values['app.admin.confirmOk'])
                .cancel(values['cancel']);
            this.$mdDialog.show(confirm).then(function() {
                _this.delete(competition);
            });
        });
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionController', CompetitionController);