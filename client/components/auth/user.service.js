'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    updateUser: {
      method: 'PUT',
      params: {
        controller: 'update'
      }
    },
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    getBySignupToken: {
      method: 'GET',
      params: {
        controller: 'signUpToken'
      }
    },
    getClubs: {
      method: 'GET',
      params: {
        id: 'clubs'
      }
    }
  });
}

angular.module('agfaWebappApp.auth')
  .factory('User', UserResource);

})();
