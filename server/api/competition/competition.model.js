'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CompetitionSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Competition', CompetitionSchema);