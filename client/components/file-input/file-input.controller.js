'use strict';

class FileInputController {
    constructor(appConfig) {
        this.imagesServer = appConfig.imagesServer;
        this.file = null;

        this.avatarName = this.avatar ? this.avatar : 'user_silhouette.png';
    }
}

angular
    .module('agfaWebappApp')
    .controller('FileInputController', FileInputController);