/*jshint node:true*/
'use strict';

module.exports = function(environment/* , appConfig */) {
  const ENV = {
    modulePrefix: 'ember-doc-engine',
    environment: environment
  };

  ENV.DOCS = {
    'ember': 'ember.json',
    'ember-doc-engine': 'ember-doc-engine.json'
  };

  return ENV;
};
