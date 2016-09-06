'use strict';

var app = require('../..');
import request from 'supertest';

var newUploadImage;

describe('UploadImage API:', function() {

  describe('GET /api/upload-images', function() {
    var uploadImages;

    beforeEach(function(done) {
      request(app)
        .get('/api/upload-images')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          uploadImages = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(uploadImages).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/upload-images', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/upload-images')
        .send({
          name: 'New UploadImage',
          info: 'This is the brand new uploadImage!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUploadImage = res.body;
          done();
        });
    });

    it('should respond with the newly created uploadImage', function() {
      expect(newUploadImage.name).to.equal('New UploadImage');
      expect(newUploadImage.info).to.equal('This is the brand new uploadImage!!!');
    });

  });

  describe('GET /api/upload-images/:id', function() {
    var uploadImage;

    beforeEach(function(done) {
      request(app)
        .get('/api/upload-images/' + newUploadImage._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          uploadImage = res.body;
          done();
        });
    });

    afterEach(function() {
      uploadImage = {};
    });

    it('should respond with the requested uploadImage', function() {
      expect(uploadImage.name).to.equal('New UploadImage');
      expect(uploadImage.info).to.equal('This is the brand new uploadImage!!!');
    });

  });

  describe('PUT /api/upload-images/:id', function() {
    var updatedUploadImage;

    beforeEach(function(done) {
      request(app)
        .put('/api/upload-images/' + newUploadImage._id)
        .send({
          name: 'Updated UploadImage',
          info: 'This is the updated uploadImage!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUploadImage = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUploadImage = {};
    });

    it('should respond with the updated uploadImage', function() {
      expect(updatedUploadImage.name).to.equal('Updated UploadImage');
      expect(updatedUploadImage.info).to.equal('This is the updated uploadImage!!!');
    });

  });

  describe('DELETE /api/upload-images/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/upload-images/' + newUploadImage._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when uploadImage does not exist', function(done) {
      request(app)
        .delete('/api/upload-images/' + newUploadImage._id)
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
