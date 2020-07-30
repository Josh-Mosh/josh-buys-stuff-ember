import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | disclosure', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:disclosure');
    assert.ok(route);
  });
});
