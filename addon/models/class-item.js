import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo(),
  module: DS.belongsTo(),
  namespace: DS.belongsTo(),

  name: DS.attr('string'),
  description: DS.attr('string'),
  line: DS.attr('number'),

  default: DS.attr('string'),
  type: DS.attr('string'),
  since: DS.attr('string'),
  itemtype: DS.attr('string'),
  deprecated: DS.attr('boolean'),
  access: DS.attr('string'),
  tagname: DS.attr('string'),
  params: DS.attr('array'),
  return: DS.attr('object'),

  file: DS.belongsTo(),
  class: DS.belongsTo('class', { inverse: 'ownItems' }),

});
