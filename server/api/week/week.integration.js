'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newWeek;

describe('Week API:', function() {
  describe('GET /api/weeks', function() {
    var weeks;

    beforeEach(function(done) {
      request(app)
        .get('/api/weeks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          weeks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(weeks).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/weeks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/weeks')
        .send({
          name: 'New Week',
          info: 'This is the brand new week!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newWeek = res.body;
          done();
        });
    });

    it('should respond with the newly created week', function() {
      expect(newWeek.name).to.equal('New Week');
      expect(newWeek.info).to.equal('This is the brand new week!!!');
    });
  });

  describe('GET /api/weeks/:id', function() {
    var week;

    beforeEach(function(done) {
      request(app)
        .get(`/api/weeks/${newWeek._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          week = res.body;
          done();
        });
    });

    afterEach(function() {
      week = {};
    });

    it('should respond with the requested week', function() {
      expect(week.name).to.equal('New Week');
      expect(week.info).to.equal('This is the brand new week!!!');
    });
  });

  describe('PUT /api/weeks/:id', function() {
    var updatedWeek;

    beforeEach(function(done) {
      request(app)
        .put(`/api/weeks/${newWeek._id}`)
        .send({
          name: 'Updated Week',
          info: 'This is the updated week!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedWeek = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWeek = {};
    });

    it('should respond with the updated week', function() {
      expect(updatedWeek.name).to.equal('Updated Week');
      expect(updatedWeek.info).to.equal('This is the updated week!!!');
    });

    it('should respond with the updated week on a subsequent GET', function(done) {
      request(app)
        .get(`/api/weeks/${newWeek._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let week = res.body;

          expect(week.name).to.equal('Updated Week');
          expect(week.info).to.equal('This is the updated week!!!');

          done();
        });
    });
  });

  describe('PATCH /api/weeks/:id', function() {
    var patchedWeek;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/weeks/${newWeek._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Week' },
          { op: 'replace', path: '/info', value: 'This is the patched week!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedWeek = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedWeek = {};
    });

    it('should respond with the patched week', function() {
      expect(patchedWeek.name).to.equal('Patched Week');
      expect(patchedWeek.info).to.equal('This is the patched week!!!');
    });
  });

  describe('DELETE /api/weeks/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/weeks/${newWeek._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when week does not exist', function(done) {
      request(app)
        .delete(`/api/weeks/${newWeek._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
