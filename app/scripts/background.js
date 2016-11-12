'use strict';

chrome.runtime.onInstalled.addListener(details => {
	console.log('previousVersion', details.previousVersion);
});

// chrome.browserAction.setBadgeText({text: 'Nau'});

var appURL = chrome.extension.getURL('index.html');
// Open new tab with our index.html when click on the extension button
chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({
		url: appURL
	});
});

