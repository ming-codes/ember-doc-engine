import Ember from 'ember';

import docs from 'ember-doc-engine/config/docs';

function flatten(docs) {
  return docs
    .map(doc => {
      if (typeof doc === 'string') {
        return {
          [ doc ]: `${doc}.json`
        };
      }
      else if (Array.isArray(doc)) {
        return flatten(doc);
      }
      else {
        return doc;
      }
    })
    .reduce((accum, doc) => {
      return Object.assign(accum, doc);
    }, {});
}

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),

  model() {
    let store = this.get('store');
    let ajax = this.get('ajax');
    let normalized = flatten([ docs ]);

    return Ember.RSVP.all(Object.keys(normalized).map(slug => {
      let path = normalized[slug];

      return ajax.request(path).then(payload => {
        payload.project.slug = slug;

        store.pushPayload(payload);

        return store.peekRecord('project', slug);
      });
    }));
  }
});
