import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import ENV from 'celebscan/config/environment';

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

/*eslint no-empty: "off"*/

// This small piece of junk ensures that we have application insights available everywhere.
// It isn't the prettiest thing in the world, but the NPM module keeps failing on me.
var appInsights = window.appInsights || function (config) {
  function i(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = "AuthenticatedUserContext", h = "start", c = "stop", l = "Track", a = l + "Event", v = l + "Page", y = u.createElement(o), r, f; y.src = config.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js"; u.getElementsByTagName(o)[0].parentNode.appendChild(y); try { t.cookie = u.cookie } catch (p) { } for (t.queue = [], t.version = "1.0", r = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; r.length;)i("track" + r.pop()); return i("set" + s), i("clear" + s), i(h + a), i(c + a), i(h + v), i(c + v), i("flush"), config.disableExceptionTracking || (r = "onerror", i("_" + r), f = e[r], e[r] = function (config, i, u, e, o) { var s = f && f(config, i, u, e, o); return s !== !0 && t["_" + r](config, i, u, e, o), s }), t
}({
  instrumentationKey: ENV.APP.instrumentationKey
});

window.appInsights = appInsights;

Ember.Logger.info = function info(message,params) {
    window.appInsights.trackTrace(message, params, 1);
    window.console.info(...arguments);
};

Ember.Logger.debug = function debug(message,params) {
    window.appInsights.trackTrace(message, params, 0);
    window.console.debug(...arguments);
};

Ember.Logger.warn = function warn(message,params) {
    window.appInsights.trackTrace(message,params, 2);
    window.console.warn(...arguments);
};

Ember.Logger.error = function error(message,params) {
    window.appInsights.trackTrace(message, params, 3);
    window.console.error(...arguments);
};

Ember.Logger.log = function error(message,params) {
    window.appInsights.trackTrace(message, params, 0);
    window.console.log(...arguments);
};

// On every transition in ember, collect the page view with AI
Ember.Router.reopen({
  didTransition() {
    let url = this.get('url');
    let appInsights = window.appInsights

    appInsights.trackPageView(url, url);
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
