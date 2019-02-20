// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Store from './common/Store';
import { register } from './common/Dispatcher';

Vue.config.productionTip = false;

// universal Web Extension API
window.browser = window.msBrowser || window.browser || window.chrome;

Store.init(register)
	.rehydrate()
	.then(() => {
		// new Vue({
		// 	el: '#app',
		// 	components: { App },
		// 	template: '<App/>',
		// });

		new Vue({
			render: h => h(App),
		}).$mount('#app');
	});
