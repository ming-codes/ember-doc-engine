import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),

  model({ className }) {
    return this.get('store').peekRecord('class', className);
  }
});
