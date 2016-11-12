'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import randomstring from 'randomstring';
import mail from '../../components/sendmail/mail.js';
import url from 'url';

var client = redis.createClient(6379, 'localhost', { 'return_buffers': true });

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 * restriction: 'admin'
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  // create a random signUpToken
  newUser.signUpToken = randomstring.generate();
  var hostname = req.headers.host;
  var pathname = `/confirm/${newUser.signUpToken}`;
  var confirmLink = `${req.protocol}://${hostname}${pathname}`;
  mail.sendConfirm(newUser.name, newUser.email, confirmLink);
  newUser.confirmed = false;
  newUser.saveAsync()
    .spread(function (user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token, _id: user._id });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user.
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function () {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Update users information
 */
export function updateProfile(req, res, next) {
  var userUpdated = req.body;
  var userId = req.body._id;

  User.findByIdAsync(userId)
    .then(user => {
      Object.keys(userUpdated).forEach(function (key) {
        user[key] = userUpdated[key];
      });
      user.signUpToken = '';
      user.confirmed = true;
      return user.saveAsync()
        .then(() => {
          mail.sendMailUserConfirmed(user.name);
          return res.status(200).end();
        })
        .catch(validationError(res));
    });
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}


/**
 * Get user by his signup token
 */
export function getUserBySignupToken(req, res, next) {
  var signupToken = req.params.token;

  User.findOneAsync({ signUpToken: signupToken }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(400).send();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Get all users with role: 'club'
 * restriction: 'admin'
 */
export function getClubs (req, res, next) {
  User.findAsync({role: 'club', confirmed: true}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
