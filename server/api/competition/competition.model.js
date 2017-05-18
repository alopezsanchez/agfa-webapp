'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var deepPopulate = require('mongoose-deep-populate')(mongoose);
import { Schema } from 'mongoose';
import TeamSchema from '../team/team.model';
var Team = mongoose.model('Team').schema;
import WeekSchema from '../week/week.model';
var Week = mongoose.model('Week').schema;


const REQUIRED_MESSAGE = 'field cannot be blank';

var CompetitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Number ' + REQUIRED_MESSAGE]
    },
    info: String,
    active: {
        type: String,
        required: [true, 'Active ' + REQUIRED_MESSAGE]
    },
    year: String,
    category: {
        type: String,
        required: [true, 'Categorie ' + REQUIRED_MESSAGE]
    },
    weeks: {
        type: [Schema.Types.ObjectId],
        ref: 'Week',
        required: [true, 'Weeks ' + REQUIRED_MESSAGE]
    },
    teams: {
        type: [Schema.Types.ObjectId],
        ref: 'Team',
        required: [true, 'Teams ' + REQUIRED_MESSAGE]
    }
});

CompetitionSchema.plugin(deepPopulate, {
    whitelist: [
        'weeks',
        'teams',
        'weeks.matches.field',
        'weeks.matches.localTeam',
        'weeks.matches.visitingTeam'
    ]
});

export default mongoose.model('Competition', CompetitionSchema);