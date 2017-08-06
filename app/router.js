import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('scan', function() {
    this.route('new');
    this.route('results');
  });
});

export default Router;
