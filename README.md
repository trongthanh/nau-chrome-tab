# NAU Tab
[![](https://api.travis-ci.org/trongthanh/nau-chrome-tab.svg?branch=master)](https://travis-ci.org/trongthanh/nau-chrome-tab/)

> Not Another Useless Tab

## Getting Started

Follow these steps to run NAU Tab in Google Chrome as a developer.

- Open the url chrome://extensions/ in Google Chrome.
- Click to enable _Developer mode_ so that you see developer options.
- Click the "Load unpackaged extensions..."
- Browse to the location where iChrome repo is installed, and select the sub-directory `app` as the extension source.
- When you make change to the code for the tab page, just reload the tab.

## svelte app

This app used project template for [Svelte 3](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
yarn
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn start
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

### Minimum supported browser:

- Chrome 60 (install from [here](https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en))
- Opera 47 (install from [here](https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en))
- Firefox 57 (install [from here](https://addons.mozilla.org/en-US/firefox/addon/nau-tab).)
- Edge (to be supported with new Chromium core)
- Chromium-based browser: supported from Chromium 60

### Build and Package

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn start
```

### Compiles and minifies for production

Update `public/manifest.json` version and then run:

```
yarn build
```

Command will generate a build to `public/`, remove source map files and it's ready to be deployed. `app/` folder is a snapshot build for current version.

### Lints and fixes files

```
yarn eslint
```

## License

Copyright 2019 Thanh Tran - Int3ractive.com. Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
