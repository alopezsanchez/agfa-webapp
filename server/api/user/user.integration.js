'use strict';

import app from '../..';
import User from './user.model';
import request from 'supertest';

describe('User API:', function() {
    var user;
    var userId;

    // Clear users before testing
    before(function() {
        return User.removeAsync().then(function() {
            user = new User({
                name: 'Fake User',
                email: 'test@example.com',
                password: 'password',
                confirmed: true,
                avatar: 'default.jpg',
                role: 'admin'
            });

            return user.saveAsync().then((user) => {
                userId = user._id;
            })
        });
    });

    // Clear users after testing
    after(function() {
        return User.removeAsync();
    });

    describe('GET /api/users/me', function() {
        var token;

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

        it('should respond with a user profile when authenticated', function(done) {
            request(app)
                .get('/api/users/me')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body._id.toString()).to.equal(user._id.toString());
                    done();
                });
        });

        it('should respond with a 401 when not authenticated', function(done) {
            request(app)
                .get('/api/users/me')
                .expect(401)
                .end(done);
        });
    });

    describe('POST /api/users', function() {
        var token;
        before(function(done) {
            request(app)
                .post('/auth/local')
                .send({
                    email: 'test@example.com',
                    password: 'password'
                })
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    token = res.body.token;
                    done();
                });
        });

        it('should respond with 201 when the user is created successfully', (done) => {
            var newUser = {
                name: 'Fake User 2',
                email: 'test2@example.com',
                role: 'club'
            };
            request(app)
                .post('/api/users')
                .set('authorization', 'Bearer ' + token)
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body._id).to.be.defined;
                    expect(res.body.token).to.be.defined;
                    done();
                });
        });

        it('should respond with 422 when the are validation errors', (done) => {
            var newUser = {
                email: 'test2@example.com',
                role: 'club'
            };
            request(app)
                .post('/api/users')
                .set('authorization', 'Bearer ' + token)
                .send(newUser)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(done);
        });
    });

    describe('GET /api/users/:id', function() {
        var token;
        before(function(done) {
            request(app)
                .post('/auth/local')
                .send({
                    email: 'test@example.com',
                    password: 'password'
                })
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    token = res.body.token;
                    done();
                });
        });

        it('should return 404 when user not found', function(done) {
            request(app)
                .post('/api/users/1')
                .set('authorization', 'Bearer ' + token)
                .expect(404)
                .end(done);
        });

        it('should return 200 and ther user profile', function(done) {
            var id;

            request(app)
                .get('/api/users/me')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    id = res.body._id;

                    request(app)
                        .get('/api/users/' + id)
                        .set('authorization', 'Bearer ' + token)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end((err, res) => {
                            expect(res.body.name).to.be.equal('Fake User');
                            expect(res.body.role).to.be.equal('admin');
                            done();
                        });
                });

        });
    })
});