var serialize = require('serialize-javascript');

exports.stringify = exports.serialize = serialize;

exports.parse = exports.deserialize = function(payload) {
  return Function('return (' + payload + ');')();
};
