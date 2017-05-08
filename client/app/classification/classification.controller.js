'use strict';

class ClassificationController {
    constructor($http) {
        this.$http = $http;
    }
}

angular.module('agfaWebappApp')
    .controller('ClassificationController', ClassificationController);