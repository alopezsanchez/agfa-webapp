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
                return field.saveAsync();
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
            return Team.removeAsync();
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
            return Team.removeAsync();
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
        var field;

        beforeEach(function(done) {
            request(app)
                .get(`/api/fields/${newField._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    field = res.body;
                    done();
                });
        });

        afterEach(function() {
            field = {};
        });

        it('should respond with the requested field', function() {
            expect(field.name).to.equal('New Field');
            expect(field.info).to.equal('This is the brand new field!!!');
        });
    });

    describe('PUT /api/fields/:id', function() {
        var updatedField;

        beforeEach(function(done) {
            request(app)
                .put(`/api/fields/${newField._id}`)
                .send({
                    name: 'Updated Field',
                    info: 'This is the updated field!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedField = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedField = {};
        });

        it('should respond with the updated field', function() {
            expect(updatedField.name).to.equal('Updated Field');
            expect(updatedField.info).to.equal('This is the updated field!!!');
        });

        it('should respond with the updated field on a subsequent GET', function(done) {
            request(app)
                .get(`/api/fields/${newField._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    let field = res.body;

                    expect(field.name).to.equal('Updated Field');
                    expect(field.info).to.equal('This is the updated field!!!');

                    done();
                });
        });
    });

    describe('PATCH /api/fields/:id', function() {
        var patchedField;

        beforeEach(function(done) {
            request(app)
                .patch(`/api/fields/${newField._id}`)
                .send([
                    { op: 'replace', path: '/name', value: 'Patched Field' },
                    { op: 'replace', path: '/info', value: 'This is the patched field!!!' }
                ])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    patchedField = res.body;
                    done();
                });
        });

        afterEach(function() {
            patchedField = {};
        });

        it('should respond with the patched field', function() {
            expect(patchedField.name).to.equal('Patched Field');
            expect(patchedField.info).to.equal('This is the patched field!!!');
        });
    });

    describe('DELETE /api/fields/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete(`/api/fields/${newField._id}`)
                .expect(204)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when field does not exist', function(done) {
            request(app)
                .delete(`/api/fields/${newField._id}`)
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