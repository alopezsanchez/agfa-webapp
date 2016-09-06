(function(angular, undefined) {
'use strict';

angular.module('agfaWebappApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','club','admin'],imagesServer:'http://localhost:3002'})

;
})(angular);