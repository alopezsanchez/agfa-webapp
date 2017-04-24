'use strict';

class CreateCompetitionController {
    constructor($http, appConfig) {
        this.$http = $http;
        this.categories = appConfig.categories.map(function(item) {
            return {
                name: item,
                value: item.toLowerCase()
            };
        });
    }

    $onInit() {
        this.title = 'Nueva Competición';
    }
}

angular.module('agfaWebappApp')
    .controller('CreateCompetitionController', CreateCompetitionController);