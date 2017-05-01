'use strict';

var app = require('../..');
import request from 'supertest';

describe('ERRORS Component: ', function() {
    it('should render 404 template when URL not found', function(done) {
        request(app)
            .get('/api/path/not/found')
            .expect(404)
            .end(done);
    });
});