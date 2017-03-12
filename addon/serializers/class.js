import DS from 'ember-data';

export default DS.Serializer.extend({
  pushPayload(store, { classes, project }) {
    let included = [];

    return store.push({
      data: Object.keys(classes).map(className => {
        let object = classes[className];

        if (object.file) {
          included.push({
            id: object.file,
            type: 'file',

            attributes: {
              name: object.file
            },

            relationships: {
              project: {
                data: {
                  id: project.name,
                  type: 'project'
                }
              },
            }
          });
        }

        if (object.namespace) {
          included.push({
            id: object.namespace,
            type: 'namespace',

            attributes: {
              name: object.namespace
            },

            relationships: {
              project: {
                data: {
                  id: project.name,
                  type: 'project'
                }
              },
            }
          });
        }

        return {
          id: className,
          type: 'class',

          attributes: {
            name: object.name,
            access: object.access,
            line: object.line,
            description: object.description,
            deprecated: object.deprecated || false
          },

          relationships: {
            project: {
              data: {
                id: project.name,
                type: 'project'
              }
            },

            extends: {
              data: !object.extends ? null : {
                id: object.extends,
                type: 'class'
              }
            },

            module: {
              data: !object.module ? null : {
                id: object.module,
                type: 'module'
              }
            },

            file: {
              data: {
                id: object.file,
                type: 'file'
              }
            },

            uses: {
              data: !object.uses ? null : object.uses.map(use => {
                return {
                  id: use,
                  type: 'class'
                };
              })
            },

            namespace: {
              data: !object.namespace ? null : {
                id: object.namespace,
                type: 'namespace'
              }
            }
          }
        };
      }),

      included
    });
  }
});
