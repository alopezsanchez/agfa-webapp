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
import Match from '../match/match.model';
import Field from '../field/field.model';
import Week from '../week/week.model';

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
        console.log('entity', entity);
        console.log('updates: ', updates);
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
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Competition from the DB
export function show(req, res) {
    Competition.findById(req.params.id)
        .deepPopulate(['weeks', 'classification.team'])
        .exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Competition in the DB
export function create(req, res) {

    // create classification structure
    let classification = [];
    req.body.teams.forEach((team) => {
        classification.push({
            team: team,
            ratio: 0,
            wins: 0,
            loses: 0,
            ties: 0,
            pointsInFavor: 0,
            pointsAgainst: 0,
            gamesPlayed: 0
        });
    });

    console.log(classification);
    req.body.classification = classification;

    Competition.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Competition in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    if (req.body.weeks) {
        delete req.body.weeks;
    }

    Competition.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function updateWeek(req, res) {
    let id;
    if (req.body._id) {
        id = req.body._id;
        delete req.body._id;
    }

    console.log('body', req.body);
    console.log(id);

    Week.findByIdAsync(id)
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