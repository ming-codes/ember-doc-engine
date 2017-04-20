import DS from 'ember-data';

export default DS.Serializer.extend({
  pushPayload(store, { classitems, project }) {
    return store.push({
      data: classitems.map((item, id) => {
        return {
          id,
          type: 'class-item',

          attributes: {
            name: item.name,
            description: item.description,
            line: item.line,

            since: item.since,
            default: item.default,
            type: item.type,
            itemtype: item.itemtype,
            deprecated: item.deprecated,
            access: item.access,
            tagname: item.tagname,
            params: item.params,
            return: item.return
          },

          relationships: {
            project: {
              data: {
                id: project.slug,
                type: 'project'
              }
            },

            class: {
              data: {
                id: item.class,
                type: 'class'
              }
            },

            file: {
              data: {
                id: item.file,
                type: 'file'
              }
            },

            module: {
              data: {
                id: item.module,
                type: 'module'
              }
            },

            namespace: {
              data: {
                id: item.namespace,
                type: 'namespace'
              }
            }
          }
        };
      })
    });
  }
});
