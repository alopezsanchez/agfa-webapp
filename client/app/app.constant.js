(function(angular, undefined) {
'use strict';

angular.module('agfaWebappApp.constants', [])

.constant('appConfig', {userRoles:['referee','club','admin'],imagesServer:'http://localhost:3002',defaultAvatar:'default.jpg',categories:['Flag','Tackle femenino','Tackle masculino']})

;
})(angular);