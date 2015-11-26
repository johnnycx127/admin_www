'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {

};

/**
 * Delete a user
 */
exports.delete = function (req, res) {

};

/**
 * List of Users
 */
exports.list = function (req, res) {

};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {

};
