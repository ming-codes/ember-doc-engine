import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo(),

  name: DS.attr('string'),
  description: DS.attr('string'),
  tag: DS.attr('string'),

  line: DS.attr('number'),
  file: DS.belongsTo(),

  namespaces: DS.hasMany('namespace'),
  ownClasses: DS.hasMany('class'),

  supermodule: DS.belongsTo('module'),
  submodules: DS.hasMany('module', { inverse: 'supermodule' }),

  allClasses: Ember.computed('ownClasses.[]', 'submodules.@each.allClasses', function() {
    let own = this.get('ownClasses').toArray();
    let sub = this.get('submodules').toArray().reduce((accum, module) => {
      return accum.concat(module.get('allClasses'));
    }, []);

    return [].concat(own, sub);
  }).readOnly()

  //classes : Object
  //elements : Object
  //fors : Object
  //line : 17
  //name : "ember"
  //namespaces : Object
  //submodules : Object
  //tag : "module"
});
