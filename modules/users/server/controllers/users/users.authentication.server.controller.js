'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  passport = require('passport');

// URLs for which user can't be redirected on signin
var noReturnUrls = [
  '/authentication/signin',
  '/authentication/signup'
];

/**
 * Signup
 */
exports.signup = function (req, res) {
  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  // Init Variables
  //var user = new User(req.body);
  //var message = null;
  //
  //// Add missing user fields
  //user.provider = 'local';
  //user.displayName = user.firstName + ' ' + user.lastName;
  //
  //// Then save the user
  //user.save(function (err) {
  //  if (err) {
  //    return res.status(400).send({
  //      message: errorHandler.getErrorMessage(err)
  //    });
  //  } else {
  //    // Remove sensitive data before login
  //    user.password = undefined;
  //    user.salt = undefined;
  //
  //    req.login(user, function (err) {
  //      if (err) {
  //        res.status(400).send(err);
  //      } else {
  //        res.json(user);
  //      }
  //    });
  //  }
  //});
};

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next) {
  //passport.authenticate('local', function (err, user, info) {
  //  if (err || !user) {
  //    res.status(400).send(info);
  //  } else {
  //    // Remove sensitive data before login
  //    user.password = undefined;
  //    user.salt = undefined;
  //
  //    req.login(user, function (err) {
  //      if (err) {
  //        res.status(400).send(err);
  //      } else {
  //        res.json(user);
  //      }
  //    });
  //  }
  //})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};