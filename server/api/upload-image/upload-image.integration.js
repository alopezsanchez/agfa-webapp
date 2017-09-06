'use strict';

var app = require('../..');
import User from '../user/user.model';
import request from 'supertest';

describe('Upload-image API: ', function() {

    var user;
    var token;

    // Clear users before testing
    before(function(done) {
        User.removeAsync().then(function() {
            user = new User({
                name: 'Fake User',
                email: 'test@example.com',
                password: 'password',
                role: 'admin',
                confirmed: true,
                avatar: 'default.jpg',
                address: 'address'
            });
            return user.saveAsync().then(() => done());
        });
    });

    // Clear users after testing
    after(function() {
        return User.removeAsync();
    });

    describe('POST /api/upload-images', function() {

        before(function(done) {
            request(app)
                .post('/auth/local')
                .send({
                    email: 'test@example.com',
                    password: 'password'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    token = res.body.token;
                    done();
                });
        });
    })
});
