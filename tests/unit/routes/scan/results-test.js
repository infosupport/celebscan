import { moduleFor, test } from 'ember-qunit';

moduleFor('route:scan/results', 'Unit | Route | scan/results', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:imageData', 'service:scanner']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
