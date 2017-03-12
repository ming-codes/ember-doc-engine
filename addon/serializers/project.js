import DS from 'ember-data';

export default DS.Serializer.extend({
  pushPayload(store, { project }) {
    store.push({
      data: {
        id: project.name,
        type: 'project',

        attributes: {
          name: project.name,
          description: project.description,
          url: project.url,
          version: project.version
        }
      }
    });
  }
});
