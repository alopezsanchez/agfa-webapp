'use strict';

class CompetitionController {
    constructor($scope, $http, $state, $mdDialog, $mdToast, appConfig) {
        this.title = 'Competiciones';
        this.$scope = $scope;
        this.$http = $http;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
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

    detail(id) {
        this.$state.go('competitionDetail', { id: id });
    }

    delete(competition) {
        this.$http.delete(`/api/competitions/${competition._id}`)
            .then(() => {
                this.competitions.splice(this.competitions.indexOf(competition), 1);
                this.showSimpleToast = () => {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                        .parent(angular.element(document.body))
                        .textContent('Competición eliminada correctamente')
                        .position('top right')
                        .hideDelay(3000)
                    );
                };

                this.showSimpleToast();
            });
    }

    showConfirm(ev, competition) {
        let _this = this;
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this.$mdDialog.confirm()
            .title('¿Está seguro de eliminar la competición ' + competition.name + '?')
            .textContent('Este cambio es irreversible')
            .ariaLabel('Eliminar competición')
            .targetEvent(ev)
            .ok('Eliminar')
            .cancel('Cancelar');
        this.$mdDialog.show(confirm).then(function() {
            _this.delete(competition);
        });
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionController', CompetitionController);