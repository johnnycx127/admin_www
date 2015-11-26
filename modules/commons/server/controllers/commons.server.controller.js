'use strict';

var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/env/' + (process.env.NODE_ENV === 'production' ? 'producttion.js' : 'default.js'))),
  apiClient = require(path.resolve('./modules/helpers/remoteServiceHelper')),
  multiparty = require('multiparty');

exports.loadCities = function (req, res) {
  apiClient.BaseService.get('/api.product/blm/open/AllCity')
    .then((result) => {
      res.json(result.city);
    }, (error) => {
      res.status(400).json({
        message: error
      });
    });
};

exports.loadCategories = function (req, res) {
  apiClient.BaseService.get('/api.product/blm/open/AllCategory')
    .then((result) => {
      res.json(result.category);
    }, (error) => {
      res.status(400).json({
        message: error
      });
    });
};

exports.uploadImage = function (req, res) {
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    apiClient.TestService.post('/base/open/file/single_file_upload', {
      data: {
        files: files
      },
      type: 'multipart'
    }).then((result) => {
      var filePaths = result.data.map((fileName) => {
        return config.imgUriPrefix + fileName;
      });
      res.json(filePaths);
    }, (error) => {
      res.status(400).json({
        message: error
      });
    });
  });
};
