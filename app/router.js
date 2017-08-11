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

  // Catch all route in case the user loads something silly.
  this.route('errors.not-found', { path: "*" });
});

export default Router;
