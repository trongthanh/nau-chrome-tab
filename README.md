## Getting Started

Follow these steps to run NauTab in Google Chrome as a developer.

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
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

### Minimum supported browser:

- Chrome 42 (install from [here](https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en))
- Opera 29 (install from [here](https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en))
- Firefox 45 (get the installable .xpi files [here](https://github.com/trongthanh/nau-chrome-tab/releases).)
- Edge 14 (as home page, point to [here](https://naustud.io/start/))
- Safari 10.1 (as home page, point to [here](https://naustud.io/start/))

### Build and Package

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## License

Copyright 2016 Thanh Tran - Int3ractive.com. Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
