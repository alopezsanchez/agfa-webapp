'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var deepPopulate = require('mongoose-deep-populate')(mongoose);
import { Schema } from 'mongoose';
import TeamSchema from '../team/team.model';
var Team = mongoose.model('Team').schema;
import WeekSchema from '../week/week.model';
var Week = mongoose.model('Week').schema;


const REQUIRED_MESSAGE = 'field cannot be blank';

const CompetitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Number ' + REQUIRED_MESSAGE]
    },
    info: String,
    active: {
        type: Boolean,
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
    },
    classification: [{
        team: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
        },
        gamesPlayed: Number,
        ratio: Number,
        wins: Number,
        loses: Number,
        ties: Number,
        pointsInFavor: Number,
        pointsAgainst: Number
    }]
});

CompetitionSchema.plugin(deepPopulate, {
    whitelist: [
        'weeks',
        'teams',
        'weeks.matches.field',
        'weeks.matches.localTeam',
        'weeks.matches.visitingTeam',
        'classification.team'
    ]
});

export default mongoose.model('Competition', CompetitionSchema);