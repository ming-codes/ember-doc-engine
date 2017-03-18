
var DocParser = require('yuidocjs').DocParser;
var Writer = require('broccoli-caching-writer');

var walk = require('walk-sync');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var Y = require('yuidocjs');

Transform.prototype = Object.create(Writer.prototype);
Transform.prototype.constructor = Transform;
function Transform(inputNodes, options) {
  if (!(this instanceof Transform)) { return new Transform(inputNodes, options); }

  this.options = options || {};

  this.parser = new DocParser();
  this.parser.set('syntaxtype', 'js');

  this.writer = new Y.YUIDoc({
    writeJSON: false,
    project: this.options.projectMeta || {}
  });

  // options.inputFiles === array of globs, to consider for the cache key
  Writer.call(this, [].concat(inputNodes), {
    annotation: this.options.annotation
  });
}

Transform.prototype.transform = function() {
  var rootPath = this.inputPaths[0];
  var paths = walk(rootPath, { globs: [ '**/*.doc' ] });

  var hash = paths.reduce(function(accum, relativePath) {
    var doc = JSON.parse(fs.readFileSync(path.join(rootPath, relativePath), 'utf8'));

    return Object.assign(accum, doc);
  }, {});

  return this.parser.transform(hash);
};

Transform.prototype.writeJSON = function(json) {
  var outputFile = path.join(this.outputPath, this.options.outputFile + '.json');

  fs.writeFileSync(outputFile, JSON.stringify(this.writer.writeJSON(this.parser)));
};

Transform.prototype.build = function() {
  this.writeJSON(this.transform())
};

module.exports = Transform;
