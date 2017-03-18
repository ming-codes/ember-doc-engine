import Ember from 'ember';

export default Ember.Helper.extend({
  remarkable: Ember.inject.service(),

  compute([ string ]) {
    return Ember.String.htmlSafe(this.get('remarkable').render(string));
  }
});
