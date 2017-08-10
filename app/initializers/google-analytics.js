import ENV from 'celebscan/config/environment';
import Ember from 'ember';

export function initialize(application) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', ENV.APP.trackingKey, 'auto');

  const GoogleAnalytics = Ember.Object.extend({
      trackPageView(url) {
        ga('send', { 
          'hitType': 'pageview',
          'page': url
        });
      }
  });

  application.register('tracking:google', GoogleAnalytics);

  application.inject('route', 'ga', 'tracking:google');
  application.inject('controller', 'ga', 'tracking:google');
  application.inject('component', 'ga', 'tracking:google');
  application.inject('service', 'ga', 'tracking:google');

  Ember.Router.reopen({
    didTransition() {
      this._super();

      let url = this.get('url');
      
      ga('send', { 
          'hitType': 'pageview',
          'page': url
      });
    }
  });
}

export default {
  name: 'google-analytics',
  initialize
};
