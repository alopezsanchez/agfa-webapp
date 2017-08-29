'use strict';

const ConfirmOnExit = () => {
	return {
		scope: {
			confirmOnExit: '&',
			confirmMessageWindow: '@',
			confirmMessageRoute: '@',
			confirmMessage: '@'
		},
		link: ($scope) => {
			window.onbeforeunload = () => {
				if ($scope.confirmOnExit()) {
					return $scope.confirmMessageWindow || $scope.confirmMessage;
				}
			};

			var $locationChangeStartUnbind = $scope.$on('$locationChangeStart', function (event) {
				if ($scope.confirmOnExit()) {
					if (!confirm($scope.confirmMessageRoute || $scope.confirmMessage)) {
						event.preventDefault();
					}
				}
			});

			$scope.$on('$destroy', function () {
				window.onbeforeunload = null;
				$locationChangeStartUnbind();
			});
        },
        restrict: 'A'
	};
};


angular
    .module('agfaWebappApp')
    .directive('confirmOnExit', ConfirmOnExit);
