import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  projects: Ember.computed(function() {
    return this.get('store').peekAll('project');
  }).readOnly(),

  modules: Ember.computed(function() {
    return this.get('store').peekAll('module');
  }).readOnly(),

  classes: Ember.computed(function() {
    return this.get('store').peekAll('class');
  }).readOnly(),

  namespaces: Ember.computed(function() {
    return this.get('store').peekAll('namespace');
  }).readOnly()
});
