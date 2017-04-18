/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/teams              ->  index
 * POST    /api/teams              ->  create
 * GET     /api/teams/:id          ->  show
 * PUT     /api/teams/:id          ->  update
 * DELETE  /api/teams/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import jsonpatch from 'fast-json-patch';
import Team from './team.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        res.status(statusCode).json(err);
    }
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

// Gets a list of Teams
export function index(req, res) {
    // build mongo query for array
    if (req.query.categories) {
        const values = req.query.categories;
        req.query.categories = { '$all': Array.isArray(values) ? values : [values] };
    }
    return Team.find(req.query).populate('club').populate('parentTeam').exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Team from the DB
export function show(req, res) {
    return Team.findById(req.params.id).populate('club').populate('parentTeam').exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Team in the DB
export function create(req, res) {
    return Team.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(validationError(res));
}

export function update(req, res) {
    Team.findByIdAsync(req.params.id)
        .then((team) => {
            team.name = req.body.name;
            team.club = req.body.club;
            team.parentTeam = req.body.parentTeam;
            team.categories = req.body.categories;

            return team.saveAsync()
                .then(respondWithResult(res, 200))
                .catch(validationError(res));
        })
        .catch(err => {
            handleError(res);
        })
}

// Deletes a Team from the DB
export function destroy(req, res) {
    return Team.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}