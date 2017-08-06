import Ember from 'ember';

export default Ember.Route.extend({
    imageData: Ember.inject.service('imageData'),
    scanner: Ember.inject.service('scanner'),
    model() {
        let imageData = this.get('imageData');
        let scanner = this.get('scanner');

        if(!imageData.retrieve()) {
            this.transitionTo("scan.new");
            return;
        }

        return scanner.scanForCelebrity(imageData.retrieve()).then(function(outcome) {
            return {
                originalImage: imageData.retrieve(),
                celebrity: outcome.celebrity,
                others: outcome.others
            };
        });        
    }
});
