'use strict';

import mongoose from 'mongoose';

var TeamSchema = new mongoose.Schema({
  name: String,
  club: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  parentTeam: {
    type: String,
    ref: 'Team'
  }
});

export default mongoose.model('Team', TeamSchema);
