'use strict';

class WeekController {
    constructor($mdEditDialog, $http, $rootScope) {
        this.$mdEditDialog = $mdEditDialog;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.fields = [];
        this.week = [];

        this.$rootScope.$on('updateCompetition', () => {
            // update week

            this.$http.put(`/api/weeks/${this.week._id}`, this.week).then(res => {
                console.log(res.data);
            }, err => console.log(err));
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
}

angular.module('agfaWebappApp')
    .controller('WeekController', WeekController);