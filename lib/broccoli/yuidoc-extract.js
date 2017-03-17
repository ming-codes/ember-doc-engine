
var DocParser = require('yuidocjs').DocParser;
var Filter = require('broccoli-persistent-filter');

var Remarkable = require('remarkable');
var hljs = require('highlight.js') // https://highlightjs.org/

var serializer = require('../serializer');

Extract.prototype = Object.create(Filter.prototype);
Extract.prototype.constructor = Extract;
function Extract(inputNode, options) {
  if (!(this instanceof Extract)) { return new Extract(inputNode, options); }

  this.options = options || {};

  this.parser = new DocParser();
  this.parser.set('syntaxtype', 'js');

  this.templateCompiler = this.options.templateCompiler;

  this.remarkable = new Remarkable({
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ''; // use external default escaping
    }
  });

  Filter.call(this, inputNode, {
    annotation: this.options.annotation
  });
}

Extract.prototype.extensions = ['js'];
Extract.prototype.targetExtension = 'doc';

Extract.prototype.getPathContentHash = function(content, relativePath) {
  var options = {};

  options[relativePath] = content;

  return options;
};

Extract.prototype.transformMarkdown = function(content) {
  return this.remarkable.render(content);
};

Extract.prototype.transformHTMLBars = function(content) {
  var compiler = this.templateCompiler;

  if (compiler) {
    return serializer.parse(compiler.precompile(content));
  }

  return content;
};

// Pipe
//
// description => markdown => highlighter => htmlbars
Extract.prototype.processString = function(content, relativePath) {
  var options = this.getPathContentHash(content, relativePath);
  var extracted = this.parser.extract(options);

  var self = this;

  Object.keys(extracted).forEach(function(file) {
    extracted[file].forEach(function(array) {
      array
        .filter(function(token) {
          return token.tag === 'description';
        })
        .forEach(function(token) {
          token.value = self.transformMarkdown(token.value);
          token.value = self.transformHTMLBars(token.value);
        });
    });
  });

  return serializer.stringify(extracted);
};

module.exports = Extract;
