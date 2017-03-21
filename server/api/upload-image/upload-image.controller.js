/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/upload-images              ->  create
 */

'use strict';

import _ from 'lodash';
import express from 'express';
import mime from 'mime';
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


// Creates a new UploadImage in the DB
export function create(req, res) {
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
