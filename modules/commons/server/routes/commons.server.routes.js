'use strict';

/**
 * Module dependencies.
 */

var commons = require('../controllers/commons.server.controller');

module.exports = function (app) {
  app.route('/api/commons/cities').get(commons.loadCities);
  app.route('/api/commons/categories').get(commons.loadCategories);
  app.route('/api/commons/imgupload').post(commons.uploadImage);
};
