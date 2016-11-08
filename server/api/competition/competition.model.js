'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CompetitionSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  year: String,
  modality: String
});

export default mongoose.model('Competition', CompetitionSchema);
