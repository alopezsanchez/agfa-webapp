'use strict';

class MapZoomController {
    constructor() {
        this.map = { center: { latitude: this.field.lat, longitude: this.field.lng }, zoom: 16 };

        this.marker = {
            id: 0,
            coords: {
                latitude: this.field.lat,
                longitude: this.field.lng
            }
        };
    }
}

angular.module('agfaWebappApp')
    .controller('MapZoomController', MapZoomController);