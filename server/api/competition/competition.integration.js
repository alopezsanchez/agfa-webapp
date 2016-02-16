'use strict';

var app = require('../..');
import request from 'supertest';

var newCompetition;

describe('Competition API:', function() {

  describe('GET /api/competitions', function() {
    var competitions;

    beforeEach(function(done) {
      request(app)
        .get('/api/competitions')
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

    it('should respond with JSON array', function() {
      expect(competitions).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/competitions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/competitions')
        .send({
          name: 'New Competition',
          info: 'This is the brand new competition!!!'
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

    it('should respond with the newly created competition', function() {
      expect(newCompetition.name).to.equal('New Competition');
      expect(newCompetition.info).to.equal('This is the brand new competition!!!');
    });

  });

  describe('GET /api/competitions/:id', function() {
    var competition;

    beforeEach(function(done) {
      request(app)
        .get('/api/competitions/' + newCompetition._id)
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

    afterEach(function() {
      competition = {};
    });

    it('should respond with the requested competition', function() {
      expect(competition.name).to.equal('New Competition');
      expect(competition.info).to.equal('This is the brand new competition!!!');
    });

  });

  describe('PUT /api/competitions/:id', function() {
    var updatedCompetition;

    beforeEach(function(done) {
      request(app)
        .put('/api/competitions/' + newCompetition._id)
        .send({
          name: 'Updated Competition',
          info: 'This is the updated competition!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompetition = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompetition = {};
    });

    it('should respond with the updated competition', function() {
      expect(updatedCompetition.name).to.equal('Updated Competition');
      expect(updatedCompetition.info).to.equal('This is the updated competition!!!');
    });

  });

  describe('DELETE /api/competitions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/competitions/' + newCompetition._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when competition does not exist', function(done) {
      request(app)
        .delete('/api/competitions/' + newCompetition._id)
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
