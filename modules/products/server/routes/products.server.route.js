'use strict';

/**
 * Module dependencies.
 */

var products = require('../controllers/products.server.controller');

module.exports = function (app) {
  app.route('/api/products/withPageInfo').get(products.loadProducts);
  app.route('/api/products').post(products.createProduct);
  app.route('/api/products/:productId')
    .get(products.getProduct)
    .put(products.updateProduct)
    .delete(products.delProduct);
};
