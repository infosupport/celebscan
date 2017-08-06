import Ember from 'ember';

export default Ember.Service.extend({
    store(data) {
        this.picture = data;
    },
    retrieve() {
        return this.picture;
    }
});
