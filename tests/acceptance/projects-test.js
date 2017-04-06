import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | projects');

test('visiting /docs/projects/ember', async function(assert) {
  await visit('/docs/projects/ember');

  assert.equal(currentURL(), '/docs/projects/ember');
});
