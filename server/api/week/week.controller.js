/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/weeks              ->  index
 * POST    /api/weeks              ->  create
 * GET     /api/weeks/:id          ->  show
 * PUT     /api/weeks/:id          ->  upsert
 * PATCH   /api/weeks/:id          ->  patch
 * DELETE  /api/weeks/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Week from './week.model';
import Competition from '../competition/competition.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            // eslint-disable-next-line prefer-reflect
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
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

// Gets a list of Weeks
export function index(req, res) {
    return Week.find(req.query).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Week from the DB
export function show(req, res) {
    return Week.findById(req.params.id).deepPopulate([
            'matches.field',
            'matches.localTeam',
            'matches.visitingTeam'
        ]).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Week in the DB
export function create(req, res) {
    return Week.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Week in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    let competitionId = '';
    if (req.body.competitionId) {
        competitionId = req.body.competitionId;
        Reflect.deleteProperty(req.body, 'competitionId');
    }

    return Week.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Week in the DB
export function patch(req, res) {
    if (req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Week.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Week from the DB
export function destroy(req, res) {
    return Week.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}