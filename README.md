# NAU Tab
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-brightgreen.svg?logo=Google%20Chrome)](https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-orange.svg?logo=Mozilla%20Firefox)](https://addons.mozilla.org/en-US/firefox/addon/nau-tab/)
[![Travis build status](https://api.travis-ci.org/trongthanh/nau-chrome-tab.svg?branch=master)](https://travis-ci.org/trongthanh/nau-chrome-tab/)
![Version](https://img.shields.io/github/package-json/v/trongthanh/nau-chrome-tab.svg)
![Apache License](https://img.shields.io/github/license/trongthanh/nau-chrome-tab.svg)

> Not Another Useless Tab

Before landing at [Svelte 3.0](https://svelte.dev), I have developed this browser extension using two other solutions (with features of **2.6**):

- [Vanilla JavaScript bundled with webpack](https://github.com/trongthanh/nau-chrome-tab/tree/vanilla-webpack)
- [Vue 2.6](https://github.com/trongthanh/nau-chrome-tab/tree/vue-app-migration)

### Getting started

Install the dependencies...

```bash
cd nau-chrome-tab
yarn
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn start
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and the page should auto-reload to update with changes.

## Preview as real Chrome Extension

Follow these steps to run NAU Tab in Google Chrome as a developer.

- Open the url chrome://extensions/ in Google Chrome.
- Click to enable _Developer mode_ so that you see developer options.
- Click the "Load unpackaged extensions..."
- Browse to the location where iChrome repo is installed, and select the sub-directory `public` as the extension source.
- When you make change to the code for the tab page, just reload the tab.

## Minimum supported browser:

- Chrome 60 (install from [here](https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en))
- Opera 47 (install from [here](https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en))
- Firefox 57 (install [from here](https://addons.mozilla.org/en-US/firefox/addon/nau-tab).)
- Edge (to be supported with new Chromium core)
- Chromium-based browser: supported from Chromium 60

## Build and Package

### Compiles and minifies for production

Update `public/manifest.json` version and then run:

```
yarn build
```

Command will generate a build to `public/`, remove source map files and it's ready to be deployed. `app/` folder is a snapshot build for current version.

### Lint and fix files

```
yarn eslint
```

### Unit test with Jest

```js
yarn test
```

## License

Copyright 2019 Thanh Tran - Int3ractive.com. Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
