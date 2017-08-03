import Ember from 'ember';
import Clarifai from 'npm:clarifai';
import ENV from 'celebscan/config/environment';

export default Ember.Controller.extend({
    celebrityName: '',
    score: 0.0,
    operationCompleted: false,
    inProgress: false,
    people: [],
    actions: {
        determineCelebrity(picture) {
            let apiKey = ENV.APP.apiKey;
            let modelIdentifier = 'e466caa0619f444ab97497640cefc4dc';

            let app = new Clarifai.App({
                apiKey: apiKey
            });

            this.set('operationCompleted', false);
            this.set('inProgress', true);

            Ember.Logger.info("Scanning for celebrity");

            return app.models.predict(modelIdentifier, {base64: picture}).then(function(response) {
                let data = response.outputs[0].data;
                let face = data && data.regions && data.regions[0].data && data.regions[0].data.face;
                
                // Ah, we have a familiar face, let's grab the concepts
                if(face) {
                    Ember.Logger.info("Face detected on the camera");

                    let possibleMatches = face.identity && face.identity.concepts;
                    let people = [];

                    for(let i = 0; i < Math.min(possibleMatches.length, 10); i++) {
                        let person = possibleMatches[i];

                        people.pushObject({ 
                            name: person.name,
                            score: person.value
                        });
                    }

                    this.set('celebrityName', possibleMatches[0].name);
                    this.set('score', possibleMatches[0].value);
                    this.set('people', people);

                    this.set('inProgress', false);
                    this.set('operationCompleted', true);
                }

                Ember.Logger.info(face);
            }.bind(this), function(err) {
                Ember.Logger.error(err);
            });
        }
    }
});
