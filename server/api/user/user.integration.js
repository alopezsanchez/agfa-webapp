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

    describe('GET /api/users', function() {
        var token;
        var user2, user3, user4;

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

        after(function() {
            return User.find({ role: 'club' }).removeAsync();
        });

        it('should return 200 and all users', function(done) {
            user2 = new User({
                name: 'Fake User 2',
                email: 'test2@example.com',
                password: 'password',
                confirmed: true,
                avatar: 'default.jpg',
                role: 'club'
            }).saveAsync().then(() => {
                user3 = new User({
                    name: 'Fake User 3',
                    email: 'test3@example.com',
                    password: 'password',
                    confirmed: true,
                    avatar: 'default.jpg',
                    role: 'club'
                }).saveAsync().then(() => {
                    user4 = new User({
                        name: 'Fake User 4',
                        email: 'test4@example.com',
                        password: 'password',
                        confirmed: true,
                        avatar: 'default.jpg',
                        role: 'club'
                    }).saveAsync().then(() => {
                        request(app)
                            .get('/api/users')
                            .set('authorization', 'Bearer ' + token)
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .end((err, res) => {
                                expect(res.body.length).to.be.equal(4);
                                done();
                            });
                    });
                });
            });
        });
    });

    describe('GET /api/users/clubs', function() {
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

        after(function() {
            return User.find({ role: 'club' }).removeAsync();
        });

        it('should return 200 and all users with role club', function(done) {
            var user2 = new User({
                name: 'Fake User 2',
                email: 'test5@example.com',
                password: 'password',
                confirmed: true,
                avatar: 'default.jpg',
                role: 'club'
            }).saveAsync().then(() => {
                var user3 = new User({
                    name: 'Fake User 3',
                    email: 'test6@example.com',
                    password: 'password',
                    confirmed: true,
                    avatar: 'default.jpg',
                    role: 'club'
                }).saveAsync().then(() => {
                    var user4 = new User({
                        name: 'Fake User 4',
                        email: 'test7@example.com',
                        password: 'password',
                        confirmed: true,
                        avatar: 'default.jpg',
                        role: 'club'
                    }).saveAsync().then(() => {
                        request(app)
                            .get('/api/users/clubs')
                            .set('authorization', 'Bearer ' + token)
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .end((err, res) => {
                                expect(res.body.length).to.be.equal(3);
                                done();
                            });
                    });
                });
            });
        });
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

        it('should return 500 when the id is not a valid ObjectId', function(done) {
            request(app)
                .get('/api/users/1')
                .set('authorization', 'Bearer ' + token)
                .expect(500)
                .end(done);
        });

        it('should return 404 when the user not found', function(done) {
            request(app)
                .get('/api/users/58f7c325a097f10a2621338f')
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
    });

    describe('DELETE /api/users/:id', function() {
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

        it('should return 204 when a user is deleted succesfully', function(done) {
            var newUser = {
                name: 'Fake User 2',
                email: 'test10@example.com',
                role: 'club'
            };
            var id;
            request(app)
                .post('/api/users')
                .set('authorization', 'Bearer ' + token)
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body._id).to.be.defined;
                    expect(res.body.token).to.be.defined;
                    id = res.body._id;

                    request(app)
                        .delete('/api/users/' + id)
                        .set('authorization', 'Bearer ' + token)
                        .expect(204)
                        .end(done);
                });
        });

        it('should return 401 when no authorization found', function(done) {
            var newUser = {
                name: 'Fake User 2',
                email: 'test10@example.com',
                role: 'club'
            };
            var id;
            request(app)
                .post('/api/users')
                .set('authorization', 'Bearer ' + token)
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body._id).to.be.defined;
                    expect(res.body.token).to.be.defined;
                    id = res.body._id;

                    request(app)
                        .delete('/api/users/' + id)
                        .expect(401)
                        .end(done);
                });
        });
    });

    describe('PUT /api/users/:id/update', function() {
        var token;
        var id;
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
                    id = res.body.id;
                    token = res.body.token;
                    done();
                });
        });

        it('should return 200 if user was updated succesfully', function(done) {
            user.name = 'Fake user updated';

            request(app)
                .put('/api/users/' + id + '/update')
                .set('authorization', 'Bearer ' + token)
                .send(user)
                .expect(200)
                .end((err, res) => {
                    done();
                });
        });
    });

    describe('GET /api/users/:token/signupToken', function() {
        var token;
        var id;
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

        it('should return the user correcly', function(done) {
            var newUser = {
                name: 'Fake User 2',
                email: 'test65@example.com',
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

                    var userSearched = User.findOneAsync({ _id: res.body._id }, '-salt -password')
                        .then((user) => {
                            var token = user.signUpToken;

                            request(app)
                                .get('/api/users/' + token + '/signUpToken')
                                .set('authorization', 'Bearer ' + token)
                                .expect(200)
                                .end((err, res) => {
                                    expect(res.body.name).to.be.equal(user.name);
                                    expect(res.body.role).to.be.equal(user.role);
                                });
                            done();
                        });
                });
        });

        it('should return 400 if no token was found', function(done) {
            request(app)
                .get('/api/users/777777/signUpToken')
                .expect(400)
                .end(done);
        });
    });

    describe('POST api/users/:id/password', function() {
        var token;
        var id;
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
                    id = res.body.id;
                    token = res.body.token;
                    done();
                });
        });

        it('should return 403 when the old password is incorrect', function(done) {
            request(app)
                .put('/api/users/' + id + '/password')
                .set('authorization', 'Bearer ' + token)
                .send({
                    oldPassword: 'passwor32d',
                    newPassword: 'password2'
                })
                .expect(403)
                .end(done);
        });

        it('should return 204 when the user changes his password correctly', function(done) {
            request(app)
                .put('/api/users/' + id + '/password')
                .set('authorization', 'Bearer ' + token)
                .send({
                    oldPassword: 'password',
                    newPassword: 'password2'
                })
                .expect(204)
                .end(done);
        });
    });
});