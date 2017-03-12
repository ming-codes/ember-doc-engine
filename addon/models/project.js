import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('description'),
  url: DS.attr('url'),
  version: DS.attr('version'),

  classes: DS.hasMany('class'),
  modules: DS.hasMany('module'),
  namespaces: DS.hasMany('namespace'),
  files: DS.hasMany('file')
});
