/**
 * UploadImage model events
 */

'use strict';

import {EventEmitter} from 'events';
import UploadImage from './upload-image.model';
var UploadImageEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UploadImageEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UploadImage.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UploadImageEvents.emit(event + ':' + doc._id, doc);
    UploadImageEvents.emit(event, doc);
  }
}

export default UploadImageEvents;
