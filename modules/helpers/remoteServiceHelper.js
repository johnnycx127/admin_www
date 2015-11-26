'use strict';

var superagent = require('superagent'),
    config = require('../../config/env/remote.services.js'),
    crypto = require('crypto');

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */

function ApiClient () {
  Object.keys(config).forEach((serviceName) => {
    this[serviceName] = {};
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
      this[serviceName][method] = (path, options) => {
        return new Promise((resolve, reject) => {
          const request = superagent[method](this.formatUrl(serviceName, path));
            if (options && options.params) {
              request.query(options.params);
            }
            if (options && options.data) {
              if (options.type === 'multipart') {
                Object.keys(options.data.fields || {}).forEach((fieldName) => {
                  request.field(fieldName, data.fields[fieldName]);
                });

                Object.keys(options.data.files || {}).forEach((fieldName) => {
                  options.data.files[fieldName].forEach((file) => {
                    var fileName = file.path.substring(file.path.lastIndexOf('/') + 1, file.path.length);
                    var sign = fileName + '--!@#123';
                    request.set('vcode', crypto.createHash('md5').update(sign).digest('hex').toUpperCase())
                           .set('Content-Type', file.headers['content-type'])
                           .set('Content-Disposition', file.headers['content-disposition']);
                    request.attach(file.fieldName, file.path);
                  });
                });
              }else {
                request.set('Accept', 'application/json');
                request.send(options.data);
              }
            }

            request.end((err, res) => {
              var result;

              if (err) {
                return reject((res && result) || err);
              }

              if (res.header["content-type"].startsWith('text')) {
                if (options && options.json) {
                  result = JSON.parse(res.text);
                } else {
                  result = res.text;
                }
              } else {
                result = res.body;
              }

              if(result[config[serviceName].codeField] && result[config[serviceName].codeField] !== 0) {
                reject(result[config[serviceName].messageField]);
              } else {
                resolve(result);
              }
          });
        });
      };
    });
  });
}

ApiClient.prototype.constructor = ApiClient;

ApiClient.prototype.formatUrl = function (serviceName, path) {
  const serviceConfig = config[serviceName];
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  // Prepend `/api` to relative URL, to proxy to API server.
  console.log(serviceConfig.protocol + '://' + serviceConfig.domain + (serviceConfig.port ? (':' + serviceConfig.port) : '') + adjustedPath);
  return serviceConfig.protocol + '://' + serviceConfig.domain + (serviceConfig.port ? (':' + serviceConfig.port) : '') + adjustedPath;
};

var apiClient = new ApiClient();

module.exports = apiClient;
