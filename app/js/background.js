'use strict';

// universal Web Extension
window.browser = window.msBrowser || window.browser || window.chrome;

browser.runtime.onInstalled.addListener(details => {
	console.log('previousVersion', details.previousVersion);
});

// browser.browserAction.setBadgeText({text: 'Nau'});

const appURL = browser.extension.getURL('index.html');
// Open new tab with our index.html when click on the extension button
browser.browserAction.onClicked.addListener(function() {
	browser.tabs.create({
		url: appURL,
	});
});

