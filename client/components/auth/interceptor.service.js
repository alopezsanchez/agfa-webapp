'use strict';

(function () {

    function authInterceptor($translate, $rootScope, $q, $cookies, $injector, Util) {
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
                var $mdToast = $injector.get('$mdToast');

                // Intercept 401s and redirect you to login
                if (response.status === 401) {

                    // remove any stale tokens
                    //$cookies.remove('token');
                    if (angular.isArray(response.data) && response.data.indexOf('jwt expired') !== -1) {
                        var $mdDialog = $injector.get('$mdDialog');
                        $translate(['attention', 'app.errors.sessionExpired', 'understood']).then(values => {
                            var alert = $mdDialog.alert({
                                title: values['attention'],
                                textContent: values['app.errors.sessionExpired'],
                                ok: values['understood']
                            });

                            $injector.get('Auth').logout();
                            (state || (state = $injector.get('$state'))).go('login');

                            $mdDialog.show(alert);
                        });
                    } else {
                        (state || (state = $injector.get('$state'))).go('login');
                    }
                }

                // Intercept 400s and redirect you to login
                if (response.status === 400) {
                    (state || (state = $injector.get('$state'))).go('400');
                }

                // Intercept 403s and show error toast
                if (response.status === 403) {

                    var show403Toast = () => {
                        $translate('app.errors.403.label').then(value => {
                            $mdToast.show(
                                $mdToast.simple()
                                    .parent(angular.element(document.body))
                                    .textContent(value)
                                    .position('top right')
                                    .hideDelay(3000)
                                    .toastClass('toast-error')
                            );
                        });

                    };

                    show403Toast();
                }

                // Intercept 500s and show error toast
                if (response.status === 500) {
                    var showSimpleToast = () => {
                        $translate('app.errors.500.label').then(value => {
                            $mdToast.show(
                                $mdToast.simple()
                                    .parent(angular.element(document.body))
                                    .textContent('Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde.')
                                    .position('top right')
                                    .hideDelay(3000)
                                    .toastClass('toast-error')
                            );
                        });
                    };

                    showSimpleToast();
                }
                return $q.reject(response);
            }
        };
    }

    angular.module('agfaWebappApp.auth')
        .factory('authInterceptor', authInterceptor);

})();
