'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';
import User from '../user/user.model';
var Club = mongoose.model('User').schema;

var TeamSchema = new mongoose.Schema({
  name: String,
  club: {type: Schema.Types.ObjectId, ref: 'User'},
  parentTeam: {type: Schema.Types.ObjectId, ref: 'Team'},
  categories: [String]
});

// Validate name is not taken
TeamSchema
  .path('name')
  .validate(function(value, respond) {
    var self = this;
      return this.constructor.findOneAsync({ name: value })
        .then(function(team) {
          if (team) {
            if (self.id === team.id) {
              return respond(true);
            }
            return respond(false);
          }
          return respond(true);
        })
        .catch(function(err) {
          throw err;
        });
  }, 'El nombre especificado ya está en uso');

export default mongoose.model('Team', TeamSchema);
