/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/upload-images              ->  index
 * POST    /api/upload-images              ->  create
 * GET     /api/upload-images/:id          ->  show
 * PUT     /api/upload-images/:id          ->  update
 * DELETE  /api/upload-images/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import express from 'express';
import mime from 'mime';
import UploadImage from './upload-image.model';
import User from '../user/user.model';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of UploadImages
export function index(req, res) {
  return UploadImage.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single UploadImage from the DB
export function show(req, res) {
  return UploadImage.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new UploadImage in the DB
/*export function create(req, res) {
  return UploadImage.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}*/

export function create(req, res) {
  console.log(req.file);
  console.log(req.file.filename);
  //respondWithResult(res);
  if (req.body._id) {
    delete req.body._id;
  }
  User.findOne({email: req.body.email}, '-salt -password').exec()
    .then(
      req.file ? saveUpdates({avatar: req.file.filename}) : saveUpdates({avatar: 'default.jpg'})
    )
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing UploadImage in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return UploadImage.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a UploadImage from the DB
export function destroy(req, res) {
  return UploadImage.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
