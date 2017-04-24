/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
    // Insert routes below
    app.use('/api/weeks', require('./api/week'));
    app.use('/api/matches', require('./api/match'));
    app.use('/api/teams', require('./api/team'));
    app.use('/api/upload-images', require('./api/upload-image'));
    app.use('/api/competitions', require('./api/competition'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
}