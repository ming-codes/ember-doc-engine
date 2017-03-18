import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo(),

  extends: DS.belongsTo('class', { inverse: 'extendedBy' }),
  uses: DS.hasMany('class', { inverse: 'usedBy' }),

  extendedBy: DS.hasMany('class', { inverse: 'extends' }),
  usedBy: DS.hasMany('class', { inverse: 'uses' }),

  name: DS.attr('string'),
  access: DS.attr('string'),
  description: DS.attr('string'),
  deprecated: DS.attr('boolean'),

  namespace: DS.belongsTo('namespace', { inverse: 'classes' }),
  module: DS.belongsTo(),

  line: DS.attr('number'),
  file: DS.belongsTo(),

  ownItems: DS.hasMany('class-item'),

  inheritedItems: Ember.computed('extends', 'uses.[]', function() {
    let ext = this.get('extends');
    let classes = this.get('uses').toArray();

    if (ext.get('id')) {
      classes = classes.concat(ext);
    }

    return Ember.A(classes.reduce((accum, cls) => {
      return accum.concat(cls.get('allItems'));
    }, [])).sort();
  }).readOnly(),

  allItems: Ember.computed('ownItems.[]', 'inheritedItems.[]', function() {
    return Ember.A([].concat(this.get('ownItems').toArray(), this.get('inheritedItems').toArray())).sort();
  }).readOnly(),

  methods: Ember.computed.filterBy('allItems', 'itemtype', 'method').readOnly(),

  properties: Ember.computed.filterBy('allItems', 'itemtype', 'property').readOnly(),

  events: Ember.computed.filterBy('allItems', 'itemtype', 'event').readOnly()
});
