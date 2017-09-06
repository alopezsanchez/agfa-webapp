'use strict';

class WeekController {
    constructor($mdEditDialog, $mdToast, $http, $scope, $rootScope, $translate, $mdDialog, Upload, Auth) {
        this.$mdEditDialog = $mdEditDialog;
        this.$mdToast = $mdToast;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$translate = $translate;
        this.$mdDialog = $mdDialog;
        this.upload = Upload;
        this.Auth = Auth;

        this.fields = [];
        this.week = [];
        this.files = {};

        this.unregisterEv = this.$rootScope.$on('updateCompetition', (ev, id) => {
            // upload records
            console.log(this.files);
            this.week.matches.map((match) => {
                if (match.file) {
                    this.upload.upload({
                        url: '/api/upload-images/record',
                        data: {
                            file: match.file,
                            matchId: match._id,
                            weekId: this.week._id
                        }
                    }).then((res) => {
                        // update week
                        this.week.competitionId = id;

                        // add record to the match
                        const recordMatch = res.data.matches.find((m) => m._id === match._id);
                        let record;
                        if (recordMatch) {
                            record = recordMatch.record;
                            if (record) {
                                match.record = record;
                            }
                        }
                        this.$rootScope.$emit('weekUpdated', this.week);
                        delete match.file;
                        return match;
                    }).catch((resp) => {
                        this.$translate('app.account.settings.uploadError').then(value => {
                            this.errors.other = value;
                        });
                        console.log('Error status: ' + resp);
                    });
                } else {
                    this.$rootScope.$emit('weekUpdated', this.week);
                }
            });
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
        if (this.Auth.isAdmin()) {
            this.$mdEditDialog.small({
                messages: {
                    'md-maxlength': 'Valor demasiado largo'
                },
                modelValue: match.date,
                placeholder: 'Fecha',
                save: function (input) {
                    match.date = input.$modelValue;
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 10,
                    'aria-label': 'Fecha'
                }
            });
        }
    }

    editTime(event, match) {
        if (this.Auth.isAdmin()) {
            this.$mdEditDialog.small({
                messages: {
                    'md-maxlength': 'Valor demasiado largo'
                },
                modelValue: match.time,
                placeholder: 'Hora',
                save: function (input) {
                    match.time = input.$modelValue;
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 5,
                    'aria-label': 'Hora'
                }
            });
        }
    }

    editResult(event, match) {
        if (this.Auth.isAdmin()) {
            this.$mdEditDialog.small({
                modelValue: match.result,
                placeholder: 'Resultado',
                save: function (input) {
                    match.result = input.$modelValue;
                },
                targetEvent: event,
                validators: {
                    'aria-label': 'Resultado'
                }
            });
        }
    }

    uploadPdf(event, match, index) {
        const input = document.body.querySelector(`.record-input-${index}`);
        input.click();
    }

}

angular.module('agfaWebappApp')
    .controller('WeekController', WeekController);
