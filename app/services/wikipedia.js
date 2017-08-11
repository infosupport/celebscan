import Ember from 'ember';

export default Ember.Service.extend({
    findPerson(name) {
        let url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&exintro&exsentences=1&exlimit=max&gsrlimit=20&gsrsearch=hastemplate:Birth_date_and_age+${name}&pithumbsize=100&pilimit=max&prop=pageimages%7Cextracts&origin=*`;

        this.appInsights.trackEvent('wikipedia.findPerson()', { 'name': name });

        return fetch(url).then(function(response) {
            return response.json();
        }, function(err) {
            Ember.Logger.error(err);
        }).then(function(responseData) {
            if(responseData.query && responseData.query.pages) {
                let pages = responseData.query.pages;

                for(let page in pages) {
                    if(pages.hasOwnProperty(page)) {
                        // Try to find the full name or a page that starts with the name of the person.
                        // We included the start-with clause since some pages look like this: <name> (actor)
                        if(pages[page].title.toLowerCase() === name.toLowerCase() || pages[page].title.toLowerCase().indexOf(name.toLowerCase()) === 0) {
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

        this.appInsights.trackEvent('wikipedia.findImage()', { 'source': source });

        return fetch(imageUrl).then(function(response) {
            return response.json();
        }).then(function(responseData) {
            if(responseData.query && responseData.query.pages) {
                return responseData.query.pages[-1].imageinfo[0].url;
            }

            throw Error('Failed to retrieve picture');
        });
    },
    findPage(pageId) {
      let url = `https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${pageId}&inprop=url&origin=*&format=json`;

      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(pageData) {
        return pageData.query.pages[pageId].fullurl;
      });
    }
});
