'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import User from '../user/user.model';
import Team from '../team/team.model';
import Field from '../field/field.model';
import Match from '../match/match.model';
import Week from './week.model';
import request from 'supertest';

var newWeek;
var newClub;
var team1;
var team2;
var field;
var match1;
var match2;

describe('Week API:', function () {
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
            teams: [team2._id, team1._id],
            lat: '234234',
            lng: '34234'
        });

        return field.saveAsync();
    });

    before(function () {
        match1 = new Match({
            'visitingTeam': team1,
            'field': field,
            'localTeam': team2,
            'time': '20:00',
            'date': '2017-09-19T22:00:00.000Z',
        });

        return match1.saveAsync();
    });

    before(function () {
        match2 = new Match({
            'visitingTeam': team2,
            'field': field,
            'localTeam': team1,
            'time': '23:00',
            'date': '2017-10-19T22:00:00.000Z',
        });

        return match2.saveAsync();
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

    after(function () {
        Team.removeAsync();
        Field.removeAsync();
        Match.removeAsync();
        Week.removeAsync();
        return User.removeAsync();
    });

    describe('GET /api/weeks', function () {
        var weeks;

        beforeEach(function (done) {
            request(app)
                .get('/api/weeks')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    weeks = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function () {
            expect(weeks).to.be.instanceOf(Array);
        });
    });

    describe('POST /api/weeks', function () {
        beforeEach(function (done) {
            request(app)
                .post('/api/weeks')
                .set('authorization', 'Bearer ' + token)
                .send({
                    'number': 1,
                    'matches': [match1, match2]
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newWeek = res.body;
                    done();
                });
        });

        it('should respond with the newly created week', function () {
            expect(newWeek.number).to.equal(1);
            expect(newWeek.matches).to.be.instanceOf(Array);
        });
    });

    describe('GET /api/weeks/:id', function () {
        var week;

        beforeEach(function (done) {
            request(app)
                .get(`/api/weeks/${newWeek._id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    week = res.body;
                    done();
                });
        });

        afterEach(function () {
            week = {};
        });

        it('should respond with the requested week', function () {
            expect(newWeek.number).to.equal(1);
            expect(newWeek.matches).to.be.instanceOf(Array);
        });
    });

    describe('PUT /api/weeks/:id', function () {
        var updatedWeek;

        beforeEach(function (done) {
            request(app)
                .put(`/api/weeks/${newWeek._id}`)
                .set('authorization', 'Bearer ' + token)
                .send({
                    'number': 2,
                    'matches': [match1, match2]
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedWeek = res.body;
                    done();
                });
        });

        afterEach(function () {
            updatedWeek = {};
        });

        it('should respond with the updated week', function () {
            expect(updatedWeek.number).to.equal(2);
            expect(updatedWeek.matches).to.be.instanceOf(Array);
        });

        it('should respond with the updated week on a subsequent GET', function (done) {
            request(app)
                .get(`/api/weeks/${newWeek._id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    let week = res.body;

                    expect(updatedWeek.number).to.equal(2);
                    expect(updatedWeek.matches).to.be.instanceOf(Array);

                    done();
                });
        });
    });

    describe('PATCH /api/weeks/:id', function () {
        var patchedWeek;

        beforeEach(function (done) {
            request(app)
                .patch(`/api/weeks/${newWeek._id}`)
                .set('authorization', 'Bearer ' + token)
                .send({
                    'number': 2,
                    'matches': [match1, match2]
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    patchedWeek = res.body;
                    done();
                });
        });

        afterEach(function () {
            patchedWeek = {};
        });

        it('should respond with the patched week', function () {
            expect(patchedWeek.number).to.equal(2);
            expect(patchedWeek.matches).to.be.instanceOf(Array);
        });
    });

    describe('DELETE /api/weeks/:id', function () {
        it('should respond with 204 on successful removal', function (done) {
            request(app)
                .delete(`/api/weeks/${newWeek._id}`)
                .set('authorization', 'Bearer ' + token)
                .expect(204)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when week does not exist', function (done) {
            request(app)
                .delete(`/api/weeks/${newWeek._id}`)
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
