/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

User.find({}).removeAsync()
    .then(() => {
        User.createAsync({
                provider: 'local',
                name: 'Test User',
                email: 'test@example.com',
                password: 'test',
                avatar: 'default.jpg',
                confirmed: true,
                address: 'AGFA Street, 123'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin',
                avatar: 'default.jpg',
                confirmed: true,
                address: 'AGFA Street, 123'
            })
            .then(() => {
                console.log('finished populating users');
            });
    });