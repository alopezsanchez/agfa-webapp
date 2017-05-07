'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import TeamSchema from '../team/team.model';
var Team = mongoose.model('Team').schema;
import WeekSchema from '../week/week.model';
var Week = mongoose.model('Week').schema;


const REQUIRED_MESSAGE = 'field cannot be blank';

var CompetitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Number' + REQUIRED_MESSAGE]
    },
    info: String,
    active: {
        type: String,
        required: [true, 'Active' + REQUIRED_MESSAGE]
    },
    year: String,
    categorie: {
        type: String,
        required: [true, 'Categorie' + REQUIRED_MESSAGE]
    },
    weeks: {
        type: [Week],
        required: [true, 'Weeks' + REQUIRED_MESSAGE]
    }
});

export default mongoose.model('Competition', CompetitionSchema);