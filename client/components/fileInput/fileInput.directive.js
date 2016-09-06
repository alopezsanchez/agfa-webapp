'use strict';

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

function fileInputLink(scope, element, attrs) {
  var input = $('#fileInput');
  var button = $('#uploadButton');
  var textInput = $('#textInput');

  if (input.length && button.length && textInput.length) {
    button.click(function(e) {
      input.click();
    });
    textInput.click(function(e) {
      input.click();
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
     readURL(this);
  });

  function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

}
