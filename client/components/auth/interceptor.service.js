'use strict';

(function() {

function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
  var state;
  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    responseError(response) {
      // Intercept 401s and redirect you to login
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        $cookies.remove('token');
      }
      // Intercept 400s and redirect you to login
      if (response.status === 400) {
        (state || (state = $injector.get('$state'))).go('400');
      }
      return $q.reject(response);
    }
  };
}

angular.module('agfaWebappApp.auth')
  .factory('authInterceptor', authInterceptor);

})();
