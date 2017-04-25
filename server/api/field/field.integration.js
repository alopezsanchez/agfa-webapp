'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newField;

describe('Field API:', function() {
  describe('GET /api/fields', function() {
    var fields;

    beforeEach(function(done) {
      request(app)
        .get('/api/fields')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          fields = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(fields).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/fields', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fields')
        .send({
          name: 'New Field',
          info: 'This is the brand new field!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newField = res.body;
          done();
        });
    });

    it('should respond with the newly created field', function() {
      expect(newField.name).to.equal('New Field');
      expect(newField.info).to.equal('This is the brand new field!!!');
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
          if(err) {
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
          if(err) {
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
          if(err) {
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
          if(err) {
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
          if(err) {
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
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
