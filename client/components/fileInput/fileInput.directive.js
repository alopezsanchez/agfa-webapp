'use strict';

function fileInputLink(scope) {
  var $input = $('#fileInput');
  var $button = $('#uploadButton');
  var $textInput = $('#textInput');

  if ($input.length && $button.length && $textInput.length) {
    $button.click(function() {
      $input.click();
    });
    $textInput.click(function() {
      $input.click();
    });
  }

  $input.on('change', function(e) {
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
    .directive('fileInput', function () {
        return {
            templateUrl: 'components/fileInput/fileInput.html',
            restrict: 'E',
            controller: 'SignupController',
            controllerAs: 'vm',
            link: fileInputLink
        };
    });
