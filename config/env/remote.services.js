module.exports = {
  'BaseService': {
    protocol: 'http',
    domain: '192.168.0.137',
    port: 8080,
    codeField: 'errorCode',
    messageFiled: 'errorMessage'
  },
  'TestService': {
    protocol: 'http',
    domain: '192.168.0.238',
    port: 9000,
    codeField: 'status',
    messageFiled: 'msg'
  },
  'MessageService': {
    protocol: 'http',
    domain: 'mqttproxy.test.z5buy.com'
  },
  'WechatService': {
    protocol: 'https',
    domain: 'api.weixin.qq.com'
  }
};