# ember-doc-engine

[![npm version](https://badge.fury.io/js/ember-doc-engine.svg)](http://badge.fury.io/js/ember-doc-engine)
[![Build Status](https://travis-ci.org/ming-codes/ember-doc-engine.svg?branch=master)](https://travis-ci.org/ming-codes/ember-doc-engine)
[![Greenkeeper badge](https://badges.greenkeeper.io/ming-codes/ember-doc-engine.svg)](https://greenkeeper.io/)

`ember-doc-engine` is a documentation tool targeted at Ember add-on developers.

It uses YUIDoc to generate documentation JSON files and consumes it as an Ember engine.
As such, `ember-doc-engine` is able to consume YUIDoc JSON files from other projects,
and let you cross link between multiple projects.

## Installation

`ember install ember-doc-engine`

## Configuration

Add a `DOCS` property to your add-on's config.

```
// config/environment.js
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
```

Add an entry to the `DOCS` property for each project that you like to
link to your documentation. They key is the slug you'll be using
for the project and the value is the url to the YUIDoc json file.

Don't forget to add your own project!

Lastly, you'll need to mount the docs engine in your app.

```
Router.map(function() {
  this.mount('ember-doc-engine', { resetNamespace: true, path: '/docs' });
});
```
