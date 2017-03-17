/* jshint node: true */
'use strict';

var EngineAddon = require('ember-engines/lib/engine-addon');
var stew = require('broccoli-stew');
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');

var yuidoc = {
  extract: require('./lib/broccoli/yuidoc-extract'),
  transform: require('./lib/broccoli/yuidoc-transform')
};

// TODO
// Scan parent addons for linkable projects
module.exports = EngineAddon.extend({
  name: 'ember-doc-engine',

  lazyLoading: false,

  treeForPublic: function(tree) {
    var funneled = funnel(this.parent.root, {
      include: [ 'addon/**', 'app/**' ]
    });
    var extracted = yuidoc.extract(funneled, {
      templateCompiler: require(this.templateCompilerPath())
    });
    var transformed = yuidoc.transform(extracted, {
      outputFile: this.parent.name(),
      projectMeta: {
        name: this.parent.pkg.name || '',
        description: this.parent.pkg.description || '',
        url: this.parent.pkg.url || '',
        version: this.parent.pkg.version || ''
      }
    });

    return transformed;
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrW
  projectConfig: function () {
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
});
