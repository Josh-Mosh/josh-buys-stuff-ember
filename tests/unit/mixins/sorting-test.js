import EmberObject from '@ember/object';
import SortingMixin from 'josh-buys-stuff-ember/mixins/sorting';
import { module, test } from 'qunit';

module('Unit | Mixin | sorting', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SortingObject = EmberObject.extend(SortingMixin);
    let subject = SortingObject.create();
    assert.ok(subject);
  });
});
