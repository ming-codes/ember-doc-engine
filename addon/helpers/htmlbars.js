import Ember from 'ember';

export function htmlbars([ string ]) {
  return Ember.HTMLBars.compile(String(string));
}

export default Ember.Helper.helper(htmlbars);
