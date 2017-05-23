'use strict';

class ClassificationController {
    constructor($http, $q, $rootScope) {
        this.$http = $http;
        this.$rootScope = $rootScope;
    }

    $onInit() {
        this.order = '-ratio';
        this.$rootScope.$on('refreshClassification', () => {
            this.$http.get(`/api/competitions/${this.competition._id}`).then((res) => {
                this.competition = res.data;
            });
        });
    }

    /*$onChanges(changes) {
        console.log(changes);
    }*/
}

angular.module('agfaWebappApp')
    .controller('ClassificationController', ClassificationController);