'use strict';

var app = require('../..');
import User from '../user/user.model';
import Team from '../team/team.model';
import Field from '../field/field.model';
import Match from '../match/match.model';
import Week from '../week/week.model';
import Competition from './competition.model';
import request from 'supertest';

var newCompetition;
var week;
var newClub;
var team1;
var team2;
var field;
var match1;
var match2;

describe('Competition API:', function () {

    /* Create user for testig auth */

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
            name: 'field 234',
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

    before(function () {
        week = new Week({
            'number': 1,
            'matches': [match1, match2]
        });

        return week.saveAsync();
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
        Competition.removeAsync();
        return User.removeAsync();
    });



    /* ******************************************** */

    describe('GET /api/competitions', function () {
        var competitions;

        beforeEach(function (done) {
            request(app)
                .get('/api/competitions')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    competitions = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function () {
            expect(competitions).to.be.instanceOf(Array);
        });

    });

    describe('POST /api/competitions', function () {

        beforeEach(function (done) {
            request(app)
                .post('/api/competitions')
                .set('authorization', 'Bearer ' + token)
                .send({
                    name: 'New Competition',
                    year: '2017-2018',
                    category: 'Tackle masculino',
                    active: false,
                    teams: [team1, team2],
                    weeks: [week]
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newCompetition = res.body;
                    done();
                });
        });

        it('should respond with the newly created competition', function () {
            expect(newCompetition.name).to.equal('New Competition');
            expect(newCompetition.year).to.equal('2017-2018');
            expect(newCompetition.classification).to.be.instanceOf(Array);
        });

    });

    describe('GET /api/competitions/:id', function () {
        var competition;

        beforeEach(function (done) {
            request(app)
                .get('/api/competitions/' + newCompetition._id)
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    competition = res.body;
                    done();
                });
        });

        afterEach(function () {
            competition = {};
        });

        it('should respond with the requested competition', function () {
            expect(competition.name).to.equal('New Competition');
            expect(competition.year).to.equal('2017-2018');
            expect(competition.classification).to.be.instanceOf(Array);
        });

    });

    describe('PUT /api/competitions/:id', function () {
        var updatedCompetition;

        beforeEach(function (done) {
            request(app)
                .put('/api/competitions/' + newCompetition._id)
                .set('authorization', 'Bearer ' + token)
                .send({
                    name: 'Updated Competition',
                    info: 'This is the updated competition!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedCompetition = res.body;
                    done();
                });
        });

        afterEach(function () {
            updatedCompetition = {};
        });

        it('should respond with the updated competition', function () {
            expect(updatedCompetition.name).to.equal('Updated Competition');
            expect(updatedCompetition.info).to.equal('This is the updated competition!!!');
        });

    });

    describe('DELETE /api/competitions/:id', function () {

        it('should respond with 204 on successful removal', function (done) {
            request(app)
                .delete('/api/competitions/' + newCompetition._id)
                .set('authorization', 'Bearer ' + token)
                .expect(204)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when competition does not exist', function (done) {
            request(app)
                .delete('/api/competitions/' + newCompetition._id)
                .set('authorization', 'Bearer ' + token)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

    });

});
