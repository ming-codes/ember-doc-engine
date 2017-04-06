import Ember from 'ember';

/* globals Remarkable:true */
/* globals hljs:true */

export default Ember.Service.extend({
  remarkable: Ember.computed(function() {
    return new Remarkable({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {} // eslint-disable-line no-empty
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {} // eslint-disable-line no-empty

        return ''; // use external default escaping
      }
    });
  }).readOnly(),

  render(string) {
    return this.get('remarkable').render(string);
  }
});
