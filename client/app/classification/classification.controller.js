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
                console.log(res.data.classification);
                this.competition = res.data;
            });
        });
    }
}

angular.module('agfaWebappApp')
    .controller('ClassificationController', ClassificationController);