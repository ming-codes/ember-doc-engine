import DS from 'ember-data';

export default DS.Serializer.extend({
  pushPayload(store, payload) {
    store.serializerFor('project').pushPayload(store, payload);
    store.serializerFor('class').pushPayload(store, payload);
    store.serializerFor('class-item').pushPayload(store, payload);
    store.serializerFor('file').pushPayload(store, payload);
    store.serializerFor('module').pushPayload(store, payload);
  },
});
