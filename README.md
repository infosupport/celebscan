# Celebscan 3000

[![Build Status](https://travis-ci.org/infosupport/celebscan.svg?branch=master)](https://travis-ci.org/infosupport/celebscan)

This is a sample application to demonstrate how fun AI can be.
Run this application and take a picture with your webcam. 
You'll be matched against celebrities and get back who you look like.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Essential configuration
### Clarifai
If you're planning on running the application locally. Please make sure that you have a [Clarifai](https://clarifai.com) API Key. You need to run the following on your terminal to set the right environment variable:

```
export API_KEY="<your-key>"
```

For production builds, please add a file `config/secrets.js` to the project. In this file you should add
the following content:

```
module.exports = {
  apiKey: "<your-key>"
};
```

Notice that secrets file is not committed in Git. You need to add it on every machine where you want to produce
a production build.

### Application Insights
If you want application insights to work for your installation, make sure that you have an instance of application insights configured.
For development set the `INSTRUMENTATION_KEY` environment variable on your machine. As for production usage, include
a `instrumentationKey` property in the secrets file alongside the API key for Clarifai.

## Installation

* `git clone <repository-url>` this repository
* `cd celebscan`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
