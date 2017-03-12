import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),

  model({ moduleName }) {
    return this.get('store').peekRecord('module', moduleName);
  }
});
