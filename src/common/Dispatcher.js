/* © 2019 int3ractive.com
 * @author Thanh
 *
 * We'll make use of DOM event API to implement this Dispatcher simply
 * loosly follow Flux Dispatcher: https://facebook.github.io/flux/docs/dispatcher.html#content
 */

/**
 * Register events handlers to get called with updates
 */
function register(handler) {
	document.addEventListener('statechange', handler);
}

/**
 * Remove events handlers from getting called with updates
 */
function unregister(handler) {
	document.removeEventListener('statechange', handler);
}
/**
 * Dispatch actions use DOM event
 * @param {object} action there must be a `type` and optionally other properties
 * @return {void}
 */
function dispatch(action) {
	const event = document.createEvent('HTMLEvents');

	event.initEvent('statechange', true, true);
	event.action = action;

	// Return the result of dispatching the event, so we
	// can know if `e.preventDefault` was called inside it
	return document.dispatchEvent(event);
}

export { register, unregister, dispatch };
