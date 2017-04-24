/**
 * Match model events
 */

'use strict';

import {EventEmitter} from 'events';
var MatchEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MatchEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Match) {
  for(var e in events) {
    let event = events[e];
    Match.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MatchEvents.emit(event + ':' + doc._id, doc);
    MatchEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MatchEvents;
