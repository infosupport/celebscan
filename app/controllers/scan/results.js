import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        newScan() {
            this.appInsights.trackEvent('action', { 'name': 'processImage' });
            
            this.transitionToRoute("scan.new");
        }
    }
});
