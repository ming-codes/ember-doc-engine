/* eslint-env node */
module.exports = {
  description: ''

  afterInstall: function(options) {
    return this.addAddonToProject('ember-engines');
  }
};
