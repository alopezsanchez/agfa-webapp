'use strict';

class MapZoomController {
    constructor($mdDialog) {
        this.map = { center: { latitude: this.field.lat, longitude: this.field.lng }, zoom: 16 };
        this.marker = {
            id: 0,
            coords: {
                latitude: this.field.lat,
                longitude: this.field.lng
            }
        };
        this.$mdDialog = $mdDialog;
    }

    close() {
        this.$mdDialog.hide();
    }
}

angular.module('agfaWebappApp')
    .controller('MapZoomController', MapZoomController);
