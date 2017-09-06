'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import User from '../user/user.model';
import Team from '../team/team.model';
import Field from '../field/field.model';
import Match from './match.model';
import request from 'supertest';

var newMatch;
var newClub;
var team1;
var team2;
var field;

describe('Match API:', function () {

    var user;
    var token;

    // Clear users before testing
    before(function (done) {
        User.removeAsync().then(function () {
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

    before(function () {
        newClub = new User({
            name: 'Fake Club',
            email: 'test2@example.com',
            password: 'password',
            role: 'club',
            confirmed: true,
            avatar: 'default.jpg',
            address: 'address'
        });

        return newClub.saveAsync();
    });

    before(function () {
        team1 = new Team({
            name: 'Team 1',
            club: newClub._id,
            categories: ['Tackle masculino', 'Flag'],
            parentTeam: null,
            description: 'description'
        })

        return team1.saveAsync();
    });

    before(function () {
        team2 = new Team({
            name: 'Team 2',
            club: newClub._id,
            categories: ['Tackle masculino', 'Flag'],
            parentTeam: null,
            description: 'description'
        })

        return team2.saveAsync();
    });

    before(function () {
        field = new Field({
            name: 'field 1',
            address: 'address',
            teams: team2._id,
            lat: '234234',
            lng: '34234'
        });

        return field.saveAsync();
    });


    before(function (done) {
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

    // Clear users after testing
    after(function () {
        Team.removeAsync();
        Field.removeAsync();
        Match.removeAsync();
        return User.removeAsync();
    });

    describe('GET /api/matches', function () {
        var matches;

        beforeEach(function (done) {
            request(app)
                .get('/api/matches')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    matches = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function () {
            expect(matches).to.be.instanceOf(Array);
        });
    });

    describe('POST /api/matches', function () {
        beforeEach(function (done) {
            request(app)
                .post('/api/matches')
                .set('authorization', 'Bearer ' + token)
                .send({
                    'visitingTeam': team1,
                    'field': field,
                    'localTeam': team2,
                    'time': '20:00',
                    'date': '2017-09-19T22:00:00.000Z',
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newMatch = res.body;
                    done();
                });
        });

        it('should respond with the newly created match', function () {
            expect(newMatch.time).to.equal('20:00');
            expect(newMatch.date).to.equal('2017-09-19T22:00:00.000Z');
        });
    });

    describe('GET /api/matches/:id', function () {
        var match;

        beforeEach(function (done) {
            request(app)
                .get(`/api/matches/${newMatch._id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    match = res.body;
                    done();
                });
        });

        afterEach(function () {
            match = {};
        });

        it('should respond with the requested match', function () {
            expect(newMatch.time).to.equal('20:00');
            expect(newMatch.date).to.equal('2017-09-19T22:00:00.000Z');
        });
    });

    describe('PUT /api/matches/:id', function () {
        var updatedMatch;

        beforeEach(function (done) {
            request(app)
                .put(`/api/matches/${newMatch._id}`)
                .set('authorization', 'Bearer ' + token)
                .send({
                    'result':  '25-00',
                    'visitingTeam': team1,
                    'field': field,
                    'localTeam': team2,
                    'time': '20:00',
                    'date': '2017-09-19T22:00:00.000Z',
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedMatch = res.body;
                    done();
                });
        });

        afterEach(function () {
            updatedMatch = {};
        });

        it('should respond with the updated match', function () {
            expect(updatedMatch.time).to.equal('20:00');
            expect(updatedMatch.date).to.equal('2017-09-19T22:00:00.000Z');
            expect(updatedMatch.result).to.equal('25-00');
        });

        it('should respond with the updated match on a subsequent GET', function (done) {
            request(app)
                .get(`/api/matches/${newMatch._id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    let match = res.body;

                    expect(match.time).to.equal('20:00');
                    expect(match.date).to.equal('2017-09-19T22:00:00.000Z');
                    expect(match.result).to.equal('25-00');

                    done();
                });
        });
    });

    describe('PATCH /api/matches/:id', function () {
        var patchedMatch;

        beforeEach(function (done) {
            request(app)
                .patch(`/api/matches/${newMatch._id}`)
                .set('authorization', 'Bearer ' + token)
                .send({
                    'result':  '25-00',
                    'visitingTeam': team1,
                    'field': field,
                    'localTeam': team2,
                    'time': '20:00',
                    'date': '2017-09-19T22:00:00.000Z',
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    patchedMatch = res.body;
                    done();
                });
        });

        afterEach(function () {
            patchedMatch = {};
        });

        it('should respond with the patched match', function () {
            expect(patchedMatch.time).to.equal('20:00');
            expect(patchedMatch.date).to.equal('2017-09-19T22:00:00.000Z');
            expect(patchedMatch.result).to.equal('25-00');
        });
    });

    describe('DELETE /api/matches/:id', function () {
        it('should respond with 204 on successful removal', function (done) {
            request(app)
                .delete(`/api/matches/${newMatch._id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(204)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when match does not exist', function (done) {
            request(app)
                .delete(`/api/matches/${newMatch._id}`)
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
