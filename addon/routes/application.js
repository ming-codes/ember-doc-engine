import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),

  model() {
    let store = this.get('store');

    return this.get('ajax')
      .request('doc.json')
      .then(results => {
        store.pushPayload(results);

        return {
          modules: store.peekAll('module'),
          classes: store.peekAll('class')
        };
      });
  }
});
