'use strict';

(function() {

function TeamResource($resource) {
  return $resource('/api/teams/:id/:controller', {
    id: '@_id'
  });
}

angular.module('agfaWebappApp')
  .factory('Team', TeamResource);

})();
