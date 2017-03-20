import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),

  model({ projectName }) {
    return this.get('store').peekRecord('project', projectName);
  }
});
