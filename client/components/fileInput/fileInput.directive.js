'use strict';

function fileInputLink(scope, element) {
  var input = $(element[0].querySelector('#fileInput'));
  var button = $(element[0].querySelector('#uploadButton'));
  var textInput = $(element[0].querySelector('#textInput'));

  if (input.length && button.length && textInput.length) {
    button.click(function() {
      input.click();
    });
    textInput.click(function() {
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
  });

}

angular.module('agfaWebappApp')
	.directive('fileInput', function() {
		return {
			templateUrl: 'components/fileInput/fileInput.html',
			restrict: 'E',
			scope: {
				file: '='
			},
			controller: function() {
				this.file = null;
			},
			link: fileInputLink
		};
	});
