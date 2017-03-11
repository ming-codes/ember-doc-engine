/* jshint node: true */
'use strict';

var EngineAddon    = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
  name: 'ember-doc-engine',
  lazyLoading: false
});
