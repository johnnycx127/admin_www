'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {

};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function (req, res) {

};

/**
 * Delete an article
 */
exports.delete = function (req, res) {

};

/**
 * List of Articles
 */
exports.list = function (req, res) {

};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

};
