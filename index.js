/* jshint node: true */
'use strict';

var EngineAddon = require('ember-engines/lib/engine-addon');
var stew = require('broccoli-stew');
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');
var path = require('path');

var file = require('broccoli-file-creator');

var yuidoc = {
  extract: require('./lib/broccoli/yuidoc-extract'),
  transform: require('./lib/broccoli/yuidoc-transform')
};

var DocEngine = EngineAddon.extend({
  name: 'ember-doc-engine',

  lazyLoading: false
});

module.exports = {
  name: 'ember-doc-engine',

  lazyLoading: false,

  init: DocEngine.init,

  included: function(parent) {
    this._super.apply(this, arguments);

    this.import('vendor/ember-doc-engine/ember-template-compiler.js');
    this.import('vendor/ember-doc-engine/remarkable.js');
    this.import('vendor/ember-doc-engine/highlight.pack.js');
    this.import('vendor/ember-doc-engine/styles/monokai.css');
  },

  getEngineConfigContents: DocEngine.getEngineConfigContents,

  cacheKeyForTree: DocEngine.cacheKeyForTree,

  config: DocEngine.config,

  engineConfig: DocEngine.engineConfig,

  getAddonsConfig: DocEngine.getAddonsConfig,

  contentFor: DocEngine.contentFor,

  parentConfig: function() {
    return require(path.join(this.parent.root, 'config/environment'))(process.env.EMBER_ENV);
  },

  treeFor: function(name) {
    if (name === 'addon') {
      var docs = [ this.parentConfig().DOCS || {} ];
      var config = `define('ember-doc-engine/config/docs', ['exports'], function(exports) {
        exports['default'] = ${JSON.stringify(docs)};
      });`

      return merge([
        DocEngine.treeFor.apply(this, arguments),
        file('modules/ember-doc-engine/config/docs.js', config)
      ]);
    }

    if (name === 'vendor') {
      var merged = merge([
        this.treeForCompiler(),
        this.treeForRemarkable(),
        this.treeForHighlight()
      ]);

      return merge([
        DocEngine.treeFor.apply(this, arguments),
        funnel(merged, {
          destDir: 'ember-doc-engine'
        })
      ]);
    }

    if (name === 'public') {
      var funneled = funnel(this.parent.root, {
        include: [ 'addon/**', 'app/**' ]
      });
      var extracted = yuidoc.extract(funneled);
      var transformed = yuidoc.transform(extracted, {
        outputFile: this.parent.name(),
        projectMeta: {
          name: this.parent.pkg.name || '',
          description: this.parent.pkg.description || '',
          url: this.parent.pkg.url || '',
          version: this.parent.pkg.version || ''
        }
      });

      return merge([
        DocEngine.treeFor.apply(this, arguments),
        transformed
      ]);
    }

    return DocEngine.treeFor.apply(this, arguments);
  },

  treeForCompiler: function() {
    return funnel(path.dirname(this.templateCompilerPath()), {
      files: [ 'ember-template-compiler.js' ]
    });
  },

  treeForRemarkable: function() {
    return funnel(path.dirname(require.resolve('remarkable')), {
      srcDir: 'dist'
    });
  },

  treeForHighlight: function() {
    return funnel(path.dirname(require.resolve('highlightjs')), {
      include: [
        'highlight.pack.*',
        'styles/**'
      ]
    });
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrW
  projectConfig: function() {
    return this.project.config(process.env.EMBER_ENV);
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrw
  templateCompilerPath: function() {
    var config = this.projectConfig();
    var templateCompilerPath = config['ember-cli-htmlbars'] && config['ember-cli-htmlbars'].templateCompilerPath;

    var ember = this.project.findAddonByName('ember-source');
    if (ember) {
      return ember.absolutePaths.templateCompiler;
    } else if (!templateCompilerPath) {
      templateCompilerPath = this.project.bowerDirectory + '/ember/ember-template-compiler';
    }

    return path.resolve(this.project.root, templateCompilerPath);
  }
};
