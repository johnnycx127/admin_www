'use strict';

angular.module('commons').factory('Commons', ['$resource',
  function ($resource) {
    return {
      Cities: $resource('api/commons/cities/:cityId', {
        articleId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      Categories: $resource('api/commons/categories/:categoryId', {
        articleId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      })
    };
  }
]);
