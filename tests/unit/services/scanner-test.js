import { moduleFor, test } from 'ember-qunit';

moduleFor('service:scanner', 'Unit | Service | scanner', {
  needs: ['service:wikipedia']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
