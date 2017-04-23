'use strict';

var FileInputController = function(appConfig) {
    this.imagesServer = appConfig.imagesServer;
    this.file = null;
};

angular
    .module('agfaWebappApp')
    .controller('FileInputController', FileInputController);