'use strict';

angular.module('products').service('Products', ['$resource',
  function ($resource) {
    return $resource('api/products/:productId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);