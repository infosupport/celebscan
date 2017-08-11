import Ember from 'ember';
import Clarifai from 'npm:clarifai';
import ENV from 'celebscan/config/environment';

export default Ember.Service.extend({
    wikipedia: Ember.inject.service('wikipedia'),
    clarifai: new Clarifai.App({
        apiKey: ENV.APP.apiKey || 'DUMMY'
    }),
    scanForCelebrity(data) {
        let wikipedia = this.get('wikipedia');
        let clarifai = this.get('clarifai');

        let modelIdentifier = 'e466caa0619f444ab97497640cefc4dc';
        let pictureData = data.replace(/^data:image\/(png|jpg);base64,/, '');

        return clarifai.models.predict(modelIdentifier, { base64: pictureData }).then(function (response) {
            let data = response.outputs[0].data;
            let face = data && data.regions && data.regions[0].data && data.regions[0].data.face;

            function percentage(number) {
                return (number * 100).toFixed(2);
            }

            if (face) {
                Ember.Logger.info("Face detected on the camera");

                let possibleMatches = face.identity && face.identity.concepts;
                let people = [];

                for (let i = 0; i < Math.min(possibleMatches.length, 10); i++) {
                    let person = possibleMatches[i];

                    people.pushObject({
                        name: person.name,
                        score: percentage(person.value)
                    });
                }

                this.appInsights.trackEvent('scanner.scanForCelebrity()', { 'photo': data, 'matches': people });

                if (possibleMatches.length > 0) {
                    return wikipedia.findPerson(possibleMatches[0].name).then(function (result) {
                        if (result) {
                            Ember.Logger.info("Found person that matches the celebrity.");

                            return wikipedia.findImage(result.pageimage).then(function (imageData) {
                                Ember.Logger.info("Found image with celebrity.");

                                return {
                                    celebrity: {
                                        pageId: result.pageid,
                                        name: result.title,
                                        description: result.extract,
                                        score: percentage(possibleMatches[0].value),
                                        picture: imageData,
                                    },
                                    others: people
                                };
                            }.bind(this)).then(function(celebrityResult) {
                              return wikipedia.findPage(result.pageid).then(function(pageUrl) {
                                celebrityResult.celebrity.url = pageUrl;
                                return celebrityResult;
                              });
                            }.bind(this));
                        } else {
                            return {
                                celebrity: {
                                    name: possibleMatches[0].name,
                                    score: percentage(possibleMatches[0].value),
                                    description: '',
                                    picture: ''
                                },
                                others: people
                            };
                        }
                    }.bind(this));
                } else {
                    return {
                        celebrity: null,
                        others: []
                    };
                }
            }
        }.bind(this));
    }
});
