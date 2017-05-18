angular.module('agfaWebappApp').directive('ngTranslateLanguageSelect', function(LocaleService) {
    'use strict';

    return {
        restrict: 'A',
        replace: true,
        template: `
        <div class="language-select" ng-if="visible">
            <md-select ng-model="currentLocaleDisplayName" ng-change="changeLanguage(currentLocaleDisplayName)">
                    <md-option ng-value="localesDisplayName" ng-selected="currentLocaleDisplayName === localesDisplayName" ng-repeat="localesDisplayName in localesDisplayNames">{{localesDisplayName}}</md-option>
            </md-select>
        </div>`,
        controller: ($scope) => {
            $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
            $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
            $scope.visible = $scope.localesDisplayNames &&
                $scope.localesDisplayNames.length > 1;

            $scope.changeLanguage = (locale) => {
                LocaleService.setLocaleByDisplayName(locale);
                $scope.currentLocaleDisplayName = locale;
                window.location.reload();
            };
        }
    };
});