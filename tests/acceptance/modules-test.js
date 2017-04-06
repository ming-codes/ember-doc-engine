import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | modules');

test('visiting /docs/projects/ember/modules/ember-debug', async function(assert) {
  await visit('/docs/projects/ember/modules/ember-debug');

  assert.equal(currentURL(), '/docs/projects/ember/modules/ember-debug');
});
