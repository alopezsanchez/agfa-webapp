'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import User from '../user/user.model';
import Team from '../team/team.model';
import Field from './field.model';
import request from 'supertest';

var newField;

describe('Field API:', function() {
    var user;
    var userId;
    var teamId;
    var fieldId;
    var club, team, field;
    // generate club, team and field
    function generateModels() {
        club = new User({
            name: 'Fake User 2',
            email: 'test2@example.com',
            password: 'password',
            confirmed: true,
            avatar: 'default.jpg',
            role: 'club'
        }).saveAsync().then((club) => {
            var id = club[0]._id;
            team = new Team({
                name: 'Team 1',
                club: id,
                categories: ['Flag'],
                description: 'description'
            });
            team.saveAsync().then((team) => {
                teamId = [team[0]._id];
                field = new Field({
                    name: 'field 1',
                    address: 'address',
                    teams: teamId,
                    lat: '234234',
                    lng: '34234'
                });
                field.saveAsync().then((field) => {
                    fieldId = field._id;
                });
            })
        });
    }

    // Clear users before testing
    before(function() {
        Field.removeAsync();
        Team.removeAsync();
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
        Field.removeAsync();
        Team.removeAsync();
        return User.removeAsync();
    });


    describe('GET /api/fields', function() {
        var fields;
        var token;

        before(function(done) {
            generateModels();
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

        afterEach(function() {
            Field.removeAsync();
            Team.removeAsync();
            return User.find({ role: 'club' }).removeAsync();
        });

        it('should respond with JSON array', function(done) {
            request(app)
                .get('/api/fields')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    fields = res.body;
                    expect(fields).to.be.instanceOf(Array);
                    expect(fields.length).to.be.equal(1);
                    done();
                });
        });
    });

    describe('POST /api/fields', function() {
        var fields;
        var token;

        before(function(done) {
            generateModels();
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

        afterEach(function() {
            Field.removeAsync();
            Team.removeAsync();
            return User.find({ role: 'club' }).removeAsync();
        });

        it('should respond with the newly created field', function(done) {
            request(app)
                .post('/api/fields')
                .set('authorization', 'Bearer ' + token)
                .send({
                    name: 'field 1',
                    address: 'address',
                    teams: teamId,
                    lat: '234234',
                    lng: '34234'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newField = res.body;

                    expect(newField.name).to.equal('field 1');
                    expect(newField.address).to.equal('address');
                    done();
                });
        });
    });

    describe('GET /api/fields/:id', function() {
        var token;

        before(function(done) {
            generateModels();
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

        afterEach(function() {
            Field.removeAsync();
            Team.removeAsync();
            return User.find({ role: 'club' }).removeAsync();
        });

        it('should respond with the requested field', function(done) {
            var id;
            request(app)
                .post('/api/fields')
                .set('authorization', 'Bearer ' + token)
                .send({
                    name: 'field 1',
                    address: 'address',
                    teams: teamId,
                    lat: '234234',
                    lng: '34234'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newField = res.body;

                    expect(newField.name).to.equal('field 1');
                    expect(newField.address).to.equal('address');

                    request(app)
                        .get(`/api/fields/${res.body._id}`)
                        .set('authorization', 'Bearer ' + token)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }

                            expect(res.body.name).to.equal('field 1');
                            expect(res.body.address).to.equal('address');
                            done();
                        });
                });
        });
    });

    describe('PUT /api/fields/:id', function() {
        var token;
        var id;
        var newField;

        before(function(done) {
            generateModels();
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
            Field.removeAsync();
            Team.removeAsync();
            return User.find({ role: 'club' }).removeAsync();
        });

        it('should respond with the updated field', function(done) {
            request(app)
                .post('/api/fields')
                .set('authorization', 'Bearer ' + token)
                .send({
                    name: 'field 1',
                    address: 'address',
                    teams: teamId,
                    lat: '234234',
                    lng: '34234'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newField = res.body;
                    id = res.body._id;
                    expect(newField.name).to.equal('field 1');
                    expect(newField.address).to.equal('address');

                    // update field
                    res.body.name = 'field updated';

                    request(app)
                        .put(`/api/fields/${res.body._id}`)
                        .set('authorization', 'Bearer ' + token)
                        .send(res.body)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }

                            expect(res.body.name).to.equal('field updated');
                            expect(res.body.address).to.equal('address');
                            done();
                        });
                });
        });

        it('should respond with the updated field on a subsequent GET', function(done) {
            request(app)
                .get(`/api/fields/${id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    let field = res.body;

                    expect(field.name).to.equal('field updated');
                    expect(field.address).to.equal('address');

                    done();
                });
        });
    });

    describe('DELETE /api/fields/:id', function() {
        var token;

        before(function(done) {
            generateModels();
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
            Field.removeAsync();
            Team.removeAsync();
            return User.find({ role: 'club' }).removeAsync();
        });

        it('should respond with 204 on successful removal', function(done) {

            request(app)
                .post('/api/fields')
                .set('authorization', 'Bearer ' + token)
                .send({
                    name: 'field 1',
                    address: 'address',
                    teams: teamId,
                    lat: '234234',
                    lng: '34234'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newField = res.body;
                    expect(newField.name).to.equal('field 1');
                    expect(newField.address).to.equal('address');

                    request(app)
                        .delete(`/api/fields/${newField._id}`)
                        .set('authorization', 'Bearer ' + token)
                        .expect(204)
                        .end(err => {
                            if (err) {
                                return done(err);
                            }
                            done();
                        });
                });
        });

        it('should respond with 404 when field does not exist', function(done) {
            request(app)
                .delete(`/api/fields/${newField._id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(404)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });
});