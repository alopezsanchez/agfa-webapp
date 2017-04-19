'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import { Schema } from 'mongoose';
import User from '../user/user.model';
var Club = mongoose.model('User').schema;

const REQUIRED_MESSAGE = 'field cannot be blank';

var TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name ' + REQUIRED_MESSAGE]
    },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Club ' + REQUIRED_MESSAGE]
    },
    parentTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
    categories: {
        type: [String],
        required: [true, 'Categories ' + REQUIRED_MESSAGE]
    },
    description: {
        type: String,
        required: [true, 'Description ' + REQUIRED_MESSAGE]
    }
});

// Validate empty name
TeamSchema
    .path('name')
    .validate(function(name) {
        return !!name || name.length;
    }, 'Name cannot be blank');

// Validate empty club
TeamSchema
    .path('club')
    .validate(function(club) {
        return club.length;
    }, 'Club cannot be blank');

// Validate empty description
TeamSchema
    .path('description')
    .validate(function(description) {
        return description.length;
    }, 'Description cannot be blank');

// Validate name is not taken
TeamSchema
    .path('name')
    .validate(function(value, respond) {
        var self = this;
        return this.constructor.findOneAsync({ name: value })
            .then(function(team) {
                if (team) {
                    if (self.id === team.id) {
                        return respond(true);
                    }
                    return respond(false);
                }
                return respond(true);
            })
            .catch(function(err) {
                throw err;
            });
    }, 'El nombre especificado ya está en uso');

export default mongoose.model('Team', TeamSchema);