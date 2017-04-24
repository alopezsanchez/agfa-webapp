'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { registerEvents } from './match.events';
import TeamSchema from '../team/team.model';
var Team = mongoose.model('Team').schema;

const REQUIRED_MESSAGE = 'field cannot be blank';

var MatchSchema = new mongoose.Schema({
    localTeam: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: [true, 'Local team ' + REQUIRED_MESSAGE]
    },
    date: {
        type: String,
        required: [true, 'Date ' + REQUIRED_MESSAGE]
    },
    result: String
});

registerEvents(MatchSchema);
export default mongoose.model('Match', MatchSchema);