'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/clubs', auth.hasRole('admin'), controller.getClubs);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:token/signUpToken', controller.getUserBySignupToken);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', controller.changePassword);
router.put('/:id/update', controller.updateProfile);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'),controller.create);

export default router;
