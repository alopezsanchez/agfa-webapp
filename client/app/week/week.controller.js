'use strict';

class WeekController {
    constructor($mdEditDialog, $http) {
        this.$mdEditDialog = $mdEditDialog;
        this.$http = $http;
        this.fields = [];
    }

    $onInit() {
        this.info.matches.map((match) => {
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