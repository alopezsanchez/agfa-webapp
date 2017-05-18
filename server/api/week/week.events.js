/**
 * Week model events
 */

'use strict';

import {EventEmitter} from 'events';
var WeekEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WeekEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Week) {
  for(var e in events) {
    let event = events[e];
    Week.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    WeekEvents.emit(event + ':' + doc._id, doc);
    WeekEvents.emit(event, doc);
  };
}

export {registerEvents};
export default WeekEvents;
