/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/fields              ->  index
 * POST    /api/fields              ->  create
 * GET     /api/fields/:id          ->  show
 * PUT     /api/fields/:id          ->  upsert
 * DELETE  /api/fields/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Field from './field.model';
import Team from '../team/team.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
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

// Gets a list of Fields
export function index(req, res) {
    // build mongo query for array
    if (req.query.teams) {
        const values = req.query.teams;
        req.query.teams = { '$all': Array.isArray(values) ? values : [values] };
    }
    return Field.find(req.query).populate({
            path: 'teams',
            model: Team
        }).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Field from the DB
export function show(req, res) {
    return Field.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Field in the DB
export function create(req, res) {
    return Field.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Field in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Field.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Field from the DB
export function destroy(req, res) {
    return Field.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}