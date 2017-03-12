import DS from 'ember-data';

export default DS.Serializer.extend({
  pushPayload(store, { modules, project }) {
    return store.push({
      data: Object.keys(modules).map(moduleName => {
        let object = modules[moduleName];

        return {
          id: moduleName,
          type: 'module',

          attributes: {
            name: object.name,
            tag: object.tag,
            description: object.description
          },

          relationships: {
            project: {
              data: {
                id: project.name,
                type: 'project'
              }
            },

            ownClasses: {
              data: Object.keys(object.classes).map(className => {
                return {
                  id: className,
                  type: 'class'
                };
              })
            },

            namespaces: {
              data: Object.keys(object.namespaces).map(namespace => {
                return {
                  id: namespace,
                  type: 'namespace'
                };
              })
            },

            submodules: {
              data: Object.keys(object.submodules).map(submodule => {
                return {
                  id: submodule,
                  type: 'module'
                };
              })
            }
          }
        };
      })
    });
  }
});
