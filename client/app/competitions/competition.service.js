'use strict';

(function() {

function CompetitionResource($resource) {
  return $resource('/api/competitions/:id/:controller', {
    id: '@_id'
  });
}

angular.module('agfaWebappApp')
  .factory('Competition', CompetitionResource);
  
})();
