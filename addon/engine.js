import Engine from 'ember-engines/engine';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

/**
 * [Markdown](link)
 *
 * ```js
 * let hello = function world() {
 *   return '';
 * };
 * ```
 *
 * {{name}}
 *
 * @class Index
 */
const { modulePrefix } = config;
const Eng = Engine.extend({
  modulePrefix,
  Resolver
});

loadInitializers(Eng, modulePrefix);

export default Eng;
