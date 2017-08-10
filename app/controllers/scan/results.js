import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        newScan() {
            let appInsights = window.appInsights;
            appInsights.trackEvent('action', { 'name': 'processImage' });
            
            this.transitionToRoute("scan.new");
        }
    }
});
