'use strict';

import mongoose from 'mongoose';
import { registerEvents } from './week.events';
import MatchSchema from '../match/match.model';
const Match = mongoose.model('Match').schema;

const REQUIRED_MESSAGE = 'field cannot be blank';

var WeekSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, 'Start Date ' + REQUIRED_MESSAGE]
    },
    endDate: {
        type: Date,
        required: [true, 'End Date ' + REQUIRED_MESSAGE]
    },
    matches: {
        type: [Match],
        required: [true, 'Matches ' + REQUIRED_MESSAGE]
    }
});

registerEvents(WeekSchema);
export default mongoose.model('Week', WeekSchema);