import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),

  model({ className }) {
    return this.get('store').peekRecord('class', className);
  },

  setupController(controller, model, transition) {
    this._super(...arguments);

    this.updateAnchor(transition);
  },

  updateAnchor(transition) {
    let { targetName, params } = transition;

    let anchor = targetName.match(/\.anchor$/) ? (params[targetName].anchorName || null) : null;

    this.set('controller.anchor', anchor);
  },

  actions: {
    willTransition(transition) {
      this.updateAnchor(transition);
    },

    didTransition() {
      let anchor = this.get('controller.anchor');

      if (anchor) {
        Ember.run.schedule('afterRender', function() {
          let selector = `#ember-doc-engine [data-anchor="${anchor}"]`;

          Ember.$(selector).get(0).scrollIntoView();
        });
      }
    }
  }
});
