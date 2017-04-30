'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import { Schema } from 'mongoose';
import { registerEvents } from './field.events';
import Team from '../team/team.model';
var TeamModel = mongoose.model('Team').schema;

const REQUIRED_MESSAGE = 'field cannot be blank';

var FieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name ' + REQUIRED_MESSAGE]
    },
    address: {
        type: String,
        required: [true, 'Address ' + REQUIRED_MESSAGE]
    },
    teams: {
        type: [Schema.Types.ObjectId],
        ref: 'Team',
        required: [true, 'Teams ' + REQUIRED_MESSAGE]
    },
    lat: {
        type: String,
        required: [true, 'Lat ' + REQUIRED_MESSAGE]
    },
    lng: {
        type: String,
        required: [true, 'Lng ' + REQUIRED_MESSAGE]
    },
});

registerEvents(FieldSchema);
export default mongoose.model('Field', FieldSchema);