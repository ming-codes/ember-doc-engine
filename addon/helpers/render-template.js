import Ember from 'ember';

const EmberUtils = Ember.__loader.require('ember-utils');

export default Ember.Helper.extend({
  outletView: Ember.computed('div', function() {
    return Ember.getOwner(this)._lookupFactory('view:-outlet').create();
  }).readOnly(),

  div: Ember.computed('outletView', function() {
    let outlet = this.get('outletView');
    let div = document.createElement('div');

    outlet.appendTo(div);

    return div;
  }).readOnly(),

  compute([ template, model ], hash) {
    let outlet = this.get('outletView');
    let owner = Ember.getOwner(this);
    let env = owner.lookup('service:-glimmer-environment');

    outlet.setOutletState({
      render: {
        owner,
        into: undefined,
        outlet: 'main',
        name: 'index',
        controller: model || hash,
        ViewClass: undefined,
        template: template.create({
          env,
          [ EmberUtils.OWNER ]: owner
        }),
        outlets: { }
      }
    });

    return this.get('div');
  }
});
