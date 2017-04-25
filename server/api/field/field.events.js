/**
 * Field model events
 */

'use strict';

import { EventEmitter } from 'events';
var FieldEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FieldEvents.setMaxListeners(0);

// Model events
var events = {
    save: 'save',
    remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Field) {
    for (var e in events) {
        let event = events[e];
        Field.post(e, emitEvent(event));
    }
}

function emitEvent(event) {
    return function(doc) {
        FieldEvents.emit(event + ':' + doc._id, doc);
        FieldEvents.emit(event, doc);
    };
}

export { registerEvents };
export default FieldEvents;