import Ember from 'ember';

export default Ember.Controller.extend({
    imageData: Ember.inject.service('imageData'),
    actions: {
        processImage(data) {
            this.appInsights.trackEvent('action', { 'name': 'processImage' });

            let imageData =this.get('imageData');
            imageData.store(data);

            this.transitionToRoute("scan.results");
        }
    }
});
