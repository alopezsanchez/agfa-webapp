/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/competitions              ->  index
 * POST    /api/competitions              ->  create
 * GET     /api/competitions/:id          ->  show
 * PUT     /api/competitions/:id          ->  update
 * DELETE  /api/competitions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Competition from './competition.model';
import Team from '../team/team.model';
import Field from '../field/field.model';

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
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.removeAsync()
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

// Gets a list of Competitions
export function index(req, res) {
    Competition.find(req.query)
        .populate('weeks.matches.field')
        .exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Competition from the DB
export function show(req, res) {
    Competition.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Competition in the DB
export function create(req, res) {
    Competition.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Competition in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Competition.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Competition from the DB
export function destroy(req, res) {
    Competition.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}