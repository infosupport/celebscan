import Ember from 'ember';
import Clarifai from 'npm:clarifai';
import ENV from 'celebscan/config/environment';

export default Ember.Controller.extend({
    celebrityName: '',
    celebrityPicture: '',
    celebrityExtract: '',
    score: 0.0,
    operationCompleted: false,
    inProgress: false,
    people: [],
    wikipedia: Ember.inject.service('wikipedia'),
    actions: {
        determineCelebrity(picture) {
            let apiKey = ENV.APP.apiKey;
            let modelIdentifier = 'e466caa0619f444ab97497640cefc4dc';
            let wikipedia = this.get('wikipedia');

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

                    wikipedia.findPerson(possibleMatches[0].name).then(function(result) {
                        wikipedia.findImage(result.pageimage).then(function(imageData) {
                            Ember.Logger.info(imageData);
                            this.set('celebrityPicture', imageData);
                        }.bind(this));

                        this.set('celebrityName', result.title);
                        this.set('celebrityExtract', result.extract);
                    }.bind(this));
                }

                Ember.Logger.info(face);
            }.bind(this), function(err) {
                Ember.Logger.error(err);
            });
        }
    }
});
