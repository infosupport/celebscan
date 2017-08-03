import Ember from 'ember';

export default Ember.Service.extend({
    findPerson(name) {
        let url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&exintro&exsentences=1&exlimit=max&gsrlimit=20&gsrsearch=hastemplate:Birth_date_and_age+${name}&pithumbsize=100&pilimit=max&prop=pageimages%7Cextracts&origin=*`;

        return fetch(url).then(function(response) {
            return response.json();

            
        }, function(err) {
            Ember.Logger.error(err);
        }).then(function(responseData) {
            if(responseData.query && responseData.query.pages) {
                let pages = responseData.query.pages;

                for(let page in pages) {
                    if(pages.hasOwnProperty(page)) {
                        if(pages[page].title.toLowerCase() === name.toLowerCase()) {
                            return pages[page];
                        }
                    }
                }
            }

            return null;
        });
    },
    findImage(source) {
        let imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=Image:${source}&prop=imageinfo&iiprop=url&origin=*&format=json`;
        
        return fetch(imageUrl).then(function(response) {
            return response.json();
        }).then(function(responseData) {
            if(responseData.query && responseData.query.pages) {
                return responseData.query.pages[-1].imageinfo[0].url;
            }

            throw Error('Failed to retrieve picture');
        });
    }
});
