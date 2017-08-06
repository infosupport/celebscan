import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        newScan() {
            this.transitionToRoute("scan.new");
        }
    }
});
