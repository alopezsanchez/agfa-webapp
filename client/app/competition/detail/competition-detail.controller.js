'use strict';

class CompetitionDetailController {
    constructor($scope, $state, $http, $stateParams, $rootScope, $translate, $mdToast, Auth) {
        this.$scope = $scope;
        this.$state = $state;
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.$translate = $translate;
        this.$mdToast = $mdToast;
        this.Auth = Auth;

        this.numberOfWeeks = 0;
        this.promises = [];
        this.weeksUpdated = 0;

        this.unregisterWeekUpdated = this.$rootScope.$on('weekUpdated', (ev, week) => {
            this.weeksToUpdate[this.competition._id].push(week);

            this.weeksToUpdate[this.competition._id].filter((week) => {
                return week.competitionId === this.competition._id;
            });

            if (this.weeksToUpdate[this.competition._id].length === this.numberOfWeeks) {
                // update all weeks
                angular.forEach(this.weeksToUpdate[this.competition._id], (week) => {
                    this.$http.put(`/api/weeks/${week._id}`, week).then(() => {
                        this.weeksUpdated++;
                    });
                });
            }
        });

        this.$scope.$watch(() => {
            return this.weeksUpdated;
        }, (newValue, oldValue) => {
            if (newValue !== oldValue && newValue === this.numberOfWeeks) {
                // all weeks updated
                const matchesMatrix = this.weeksToUpdate[this.competition._id].map((week) => {
                    return week.matches;
                });
                let matches = [];
                for (var i = 0; i < matchesMatrix.length; i++) {
                    matches = matches.concat(matchesMatrix[i]);
                }

                // update competition
                this.$http.put(`/api/competitions/${this.competition._id}/updateClassification`, {
                    matches: matches
                }).then(() => {
                    this.weeksUpdated = 0;
                    this.weeksToUpdate[this.competition._id] = [];
                    this.showToast();

                    this.$rootScope.$emit('refreshClassification');
                });
            }
        });

        this.$scope.$on('$destroy', () => {
            this.unregisterWeekUpdated();
        });
    }

    $onInit() {
        this.competition = this.competition.data;
        this.numberOfWeeks = this.competition.weeks.length;
        this.title = this.competition.name;

        this.weeksToUpdate = {};
        this.weeksToUpdate[this.competition._id] = [];
    }

    updateCompetition() {
        this.$rootScope.$emit('updateCompetition', this.competition._id);
    }

    showToast() {
        this.$translate('app.competitions.saved').then(value => {
            this.showSimpleToast = function () {
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
    }
}

angular.module('agfaWebappApp')
    .controller('CompetitionDetailController', CompetitionDetailController);
