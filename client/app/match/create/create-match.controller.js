'use strict';

class CreateMatchController {

    constructor($http) {
        this.$http = $http;
        this.hasFields = false;
    }


    onChangeLocalTeam() {
        this.$http.get('api/fields', {
            params: {
                teams: this.match.localTeam
            }
        }).then((res) => {
            this.fields = res.data;
            this.hasFields = true;
            this.match.field = '';
        });

    }

}

angular.module('agfaWebappApp')
    .controller('CreateMatchController', CreateMatchController);
