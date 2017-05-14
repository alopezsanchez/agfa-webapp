(function(angular, undefined) {
    'use strict';

    angular.module('agfaWebappApp')
        .constant('LOCALES', {
            'locales': {
                'es_ES': 'Español',
                'gl': 'Galego'
            },
            'preferredLocale': 'es_ES'
        });
})(angular);