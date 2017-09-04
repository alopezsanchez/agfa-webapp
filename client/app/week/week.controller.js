'use strict';

class WeekController {
    constructor($mdEditDialog, $mdToast, $http, $scope, $rootScope, $translate, $mdDialog, Upload, $q) {
        this.$mdEditDialog = $mdEditDialog;
        this.$mdToast = $mdToast;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$translate = $translate;
        this.$mdDialog = $mdDialog;
        this.upload = Upload;
        this.$q = $q;
        this.fields = [];
        this.week = [];

        this.unregisterEv = this.$rootScope.$on('updateCompetition', (ev, id) => {
            // upload records
            let promisesArray = [];
            angular.forEach(this.week.matches, (match) => {
                if (match.file) {
                    this.upload.upload({
                        url: '/api/upload-images/record',
                        data: {
                            file: match.file,
                            matchId: match._id,
                            weekId: this.week._id
                        }
                    }).then((weekUpdated) => {
                        // update week
                        this.week.competitionId = id;

                        // add record to the match
                        this.week.matches[match._id].record = weekUpdated.matches[match._id].record;
                        console.log(this.week.matches);
                        this.$rootScope.$emit('weekUpdated', this.week);
                    }, (resp) => {
                        this.$translate('app.account.settings.uploadError').then(value => {
                            this.errors.other = value;
                        });
                        console.log('Error status: ' + resp.status);
                    });
                }
            });

            /* if (!promisesArray.length) {
                // update week
                this.week.competitionId = id;
                this.$rootScope.$emit('weekUpdated', this.week);
            } */

        });

        this.$scope.$on('$destroy', () => {
            this.unregisterEv();
        });
    }

    $onInit() {
        this.$http.get(`/api/weeks/${this.info}`).then(res => {
            this.week = res.data;
            this.week.matches.map((match) => {
                this.$http({
                    url: '/api/fields/',
                    method: 'GET',
                    params: {
                        teams: match.localTeam._id
                    }
                }).then((res) => {
                    match.fields = res.data;
                    return match;
                }, err => console.log(err));
            });
        });
    }

    editDate(event, match) {
        this.$mdEditDialog.small({
            messages: {
                'md-maxlength': 'Valor demasiado largo'
            },
            modelValue: match.date,
            placeholder: 'Fecha',
            save: function(input) {
                match.date = input.$modelValue;
            },
            targetEvent: event,
            validators: {
                'md-maxlength': 10,
                'aria-label': 'Fecha'
            }
        });
    }

    editTime(event, match) {
        this.$mdEditDialog.small({
            messages: {
                'md-maxlength': 'Valor demasiado largo'
            },
            modelValue: match.time,
            placeholder: 'Hora',
            save: function(input) {
                match.time = input.$modelValue;
            },
            targetEvent: event,
            validators: {
                'md-maxlength': 5,
                'aria-label': 'Hora'
            }
        });
    }

    editResult(event, match) {
        this.$mdEditDialog.small({
            modelValue: match.result,
            placeholder: 'Resultado',
            save: function(input) {
                match.result = input.$modelValue;
            },
            targetEvent: event,
            validators: {
                'aria-label': 'Resultado'
            }
        });
    }

    uploadPdf(event, match, index) {
        const input = document.body.querySelector(`.record-input-${index}`);
        input.click();
    }

}

angular.module('agfaWebappApp')
    .controller('WeekController', WeekController);
