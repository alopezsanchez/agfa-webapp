'use strict';

import mongoose from 'mongoose';
import MatchSchema from '../match/match.model';
const Match = mongoose.model('Match').schema;

const REQUIRED_MESSAGE = 'field cannot be blank';

var WeekSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Number' + REQUIRED_MESSAGE]
    },
    matches: {
        type: [Match],
        required: [true, 'Matches ' + REQUIRED_MESSAGE]
    }
});

export default mongoose.model('Week', WeekSchema);