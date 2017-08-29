'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { registerEvents } from './match.events';
import TeamSchema from '../team/team.model';
var Team = mongoose.model('Team').schema;
import FieldSchema from '../field/field.model';
var Field = mongoose.model('Field').schema;

const REQUIRED_MESSAGE = 'field cannot be blank';

const MatchSchema = new mongoose.Schema({
    localTeam: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: [true, 'Local team ' + REQUIRED_MESSAGE]
    },
    visitingTeam: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: [true, 'Visiting team ' + REQUIRED_MESSAGE]
    },
    date: {
        type: String,
        required: [true, 'Date ' + REQUIRED_MESSAGE]
    },
    time: {
        type: String,
        required: [true, 'Time ' + REQUIRED_MESSAGE]
    },
    field: {
        type: Schema.Types.ObjectId,
        ref: 'Field',
        required: [true, 'Field ' + REQUIRED_MESSAGE]
    },
    result: String,
    record: String
});

registerEvents(MatchSchema);
export default mongoose.model('Match', MatchSchema);