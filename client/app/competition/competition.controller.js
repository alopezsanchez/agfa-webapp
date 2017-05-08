'use strict';

class CompetitionController {
    constructor($scope, $http, $state, appConfig) {
        this.title = 'Competiciones';
        this.$scope = $scope;
        this.$http = $http;
        this.$state = $state;
        this.competitions = [];
        this.allCategories = appConfig.categories;

        this.filter = {
            categorie: ''
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
                if (!newValue.categorie) {
                    delete newValue.categorie;
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
        return item === this.filter.categorie;
    }

    toggle(item) {
        if (this.filter.categorie === item) {
            this.filter.categorie = '';
        } else {
            this.filter.categorie = item;
        }
    }

    detail(id) {
        this.$state.go('competitionDetail', { id: id });
    }

    delete(ev, competition) {

    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionController', CompetitionController);