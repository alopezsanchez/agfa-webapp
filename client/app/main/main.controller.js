'use strict';

(function() {

class MainController {

  constructor($http, Auth, $state) {
	this.$state = $state;
    this.$http = $http;

	if (!Auth.isLoggedIn()) {
		//$state.transitionTo('login');
		this.$state.go('login');
	}

    /*$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });*/


  }

  /*addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }*/
}

angular.module('agfaWebappApp')
  .controller('MainController', MainController);

})();
