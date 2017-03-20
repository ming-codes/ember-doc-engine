import DS from 'ember-data';

export default DS.Serializer.extend({
  pushPayload(store, { files, project }) {
    return store.push({
      data: Object.keys(files).map(fileName => {
        let object = files[fileName];

        return {
          id: fileName,
          type: 'file',

          attributes: {
            name: object.name
          },

          relationships: {
            project: {
              data: {
                id: project.slug,
                type: 'project'
              }
            },

            classes: {
              data: Object.keys(object.classes).map(name => {
                return {
                  id: name,
                  type: 'class'
                };
              })
            },

            fors: {
              data: Object.keys(object.fors).map(name => {
                return {
                  id: name,
                  type: 'class'
                };
              })
            },

            modules: {
              data: Object.keys(object.modules).map(name => {
                return {
                  id: name,
                  type: 'module'
                };
              })
            },

            namespaces: {
              data: Object.keys(object.namespaces).map(name => {
                return {
                  id: name,
                  type: 'namespace'
                };
              })
            }
          }
        };
      })
    });
  }
});
