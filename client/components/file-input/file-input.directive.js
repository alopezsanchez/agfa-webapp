'use strict';

function fileInputLink(scope, element) {
    var div = angular.element(element[0].querySelector('.file-container'));
    var input = angular.element(element[0].querySelector('.file-input'));

    if (input.length) {
        div.on('click', function() {
            input[0].click();
        });
    }

    input.on('change', function(e) {
        var files = e.target.files;
        if (files[0]) {
            scope.fileName = files[0].name;
        } else {
            scope.fileName = null;
        }
        scope.$apply();
    });

}

angular.module('agfaWebappApp')
    .directive('fileInput', function() {
        return {
            bindToController: true,
            templateUrl: 'components/file-input/file-input.html',
            restrict: 'E',
            scope: {
                file: '=',
                avatar: '=?'
            },
            controller: 'FileInputController',
            controllerAs: '$ctrl',
            link: fileInputLink
        };
    });