import ENV from 'celebscan/config/environment';
import Ember from 'ember';



export function initialize(application) {
  /*eslint no-empty: "off"*/

  // This small piece of junk ensures that we have application insights available everywhere.
  // It isn't the prettiest thing in the world, but the NPM module keeps failing on me.
  var appInsights = window.appInsights || function (config) {
    function i(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = "AuthenticatedUserContext", h = "start", c = "stop", l = "Track", a = l + "Event", v = l + "Page", y = u.createElement(o), r, f; y.src = config.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js"; u.getElementsByTagName(o)[0].parentNode.appendChild(y); try { t.cookie = u.cookie } catch (p) { } for (t.queue = [], t.version = "1.0", r = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; r.length;)i("track" + r.pop()); return i("set" + s), i("clear" + s), i(h + a), i(c + a), i(h + v), i(c + v), i("flush"), config.disableExceptionTracking || (r = "onerror", i("_" + r), f = e[r], e[r] = function (config, i, u, e, o) { var s = f && f(config, i, u, e, o); return s !== !0 && t["_" + r](config, i, u, e, o), s }), t
  }({
    instrumentationKey: ENV.APP.instrumentationKey
  });

  Ember.Logger.info = function info(message, params) {
    appInsights.trackTrace(message, params, 1);
    window.console.info(...arguments);
  };

  Ember.Logger.debug = function debug(message, params) {
    appInsights.trackTrace(message, params, 0);
    window.console.debug(...arguments);
  };

  Ember.Logger.warn = function warn(message, params) {
    appInsights.trackTrace(message, params, 2);
    window.console.warn(...arguments);
  };

  Ember.Logger.error = function error(message, params) {
    appInsights.trackTrace(message, params, 3);
    window.console.error(...arguments);
  };

  Ember.Logger.log = function error(message, params) {
    appInsights.trackTrace(message, params, 0);
    window.console.log(...arguments);
  };

  // Custom wrapper for application insight specific tracking logic.
  // This gets injected into the application components automatically.
  const AppInsightsWrapper = Ember.Object.extend({
    trackEvent() {
      appInsights.trackEvent(...arguments);
    },
    trackTrace() {
      appInsights.trackTrace(...arguments);
    },
    trackPageView() {
      appInsights.trackPageView(...arguments);
    },
    trackMetric() {
      appInsights.trackMetric(...arguments);
    },
    trackException() {
      appInsights.trackException(...arguments);
    },
    trackDependency() {
      appInsights.trackDependency(...arguments);
    },
    flush() {
      appInsights.flush();
    }
  });

  application.register('tracking:application-insights', AppInsightsWrapper);

  application.inject('route', 'appInsights', 'tracking:application-insights');
  application.inject('controller', 'appInsights', 'tracking:application-insights');
  application.inject('service', 'appInsights', 'tracking:application-insights');
  application.inject('component', 'appInsights', 'tracking:application-insights');

  Ember.Router.reopen({
    didTransition() {
      this._super();

      let url = this.get('url');
      appInsights.trackPageView(url, url);
    }
  });
}

export default {
  name: 'application-insights',
  initialize
};
